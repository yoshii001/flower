import { useState, useRef, useCallback, useEffect } from 'react';
import { X, Plus, Minus, RotateCcw, Trash2, Download, ShoppingCart, Sparkles, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { PlacedFlower, FlowerType } from '../types';
import { flowerTypes } from '../data/flowerTypes';
import { formatLKR } from '../utils/currency';
import { useCart } from '../context/CartContext';

interface BouquetBuilderProps {
  onClose: () => void;
}

export const BouquetBuilder = ({ onClose }: BouquetBuilderProps) => {
  const [placedFlowers, setPlacedFlowers] = useState<PlacedFlower[]>([]);
  const [selectedFlower, setSelectedFlower] = useState<PlacedFlower | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [nextZIndex, setNextZIndex] = useState(1);
  const [draggingFlowerId, setDraggingFlowerId] = useState<string | null>(null);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStartPos, setTouchStartPos] = useState<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const categories = ['all', ...new Set(flowerTypes.map(f => f.category))];

  const filteredFlowers = selectedCategory === 'all'
    ? flowerTypes
    : flowerTypes.filter(f => f.category === selectedCategory);

  const totalPrice = placedFlowers.reduce((sum, flower) => {
    const flowerType = flowerTypes.find(f => f.id === flower.flowerId);
    return sum + (flowerType?.priceLKR || 0);
  }, 0);

  useEffect(() => {
    if (isDragging || draggingFlowerId) {
      setIsLeftPanelOpen(false);
      setIsRightPanelOpen(false);
    }
  }, [isDragging, draggingFlowerId]);

  const handleDragStart = (e: React.DragEvent, flower: FlowerType) => {
    e.dataTransfer.setData('flowerId', flower.id);
    e.dataTransfer.setData('flowerName', flower.name);
    e.dataTransfer.setData('imageUrl', flower.imageUrl);
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const placedFlowerId = e.dataTransfer.getData('placedFlowerId');

    if (placedFlowerId) {
      setPlacedFlowers(prev =>
        prev.map(f =>
          f.id === placedFlowerId
            ? { ...f, x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) }
            : f
        )
      );
      setDraggingFlowerId(null);
    } else {
      const flowerId = e.dataTransfer.getData('flowerId');
      const flowerName = e.dataTransfer.getData('flowerName');
      const imageUrl = e.dataTransfer.getData('imageUrl');

      const newFlower: PlacedFlower = {
        id: `${flowerId}-${Date.now()}`,
        flowerId,
        flowerName,
        imageUrl,
        x: Math.max(5, Math.min(95, x)),
        y: Math.max(5, Math.min(95, y)),
        scale: 1,
        rotation: 0,
        zIndex: nextZIndex,
      };

      setPlacedFlowers(prev => [...prev, newFlower]);
      setNextZIndex(prev => prev + 1);
      setSelectedFlower(newFlower);
    }

    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFlowerClick = (flower: PlacedFlower) => {
    setSelectedFlower(flower);
    setIsRightPanelOpen(true);
  };

  const handlePlacedFlowerDragStart = (e: React.DragEvent, flower: PlacedFlower) => {
    e.stopPropagation();
    e.dataTransfer.setData('placedFlowerId', flower.id);
    setDraggingFlowerId(flower.id);
    setIsDragging(true);
  };

  const handlePlacedFlowerDragEnd = () => {
    setDraggingFlowerId(null);
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent, flower: FlowerType) => {
    const touch = e.touches[0];
    setTouchStartPos({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);

    const tempFlower: PlacedFlower = {
      id: `temp-${Date.now()}`,
      flowerId: flower.id,
      flowerName: flower.name,
      imageUrl: flower.imageUrl,
      x: 50,
      y: 50,
      scale: 1,
      rotation: 0,
      zIndex: nextZIndex,
    };

    setPlacedFlowers(prev => [...prev, tempFlower]);
    setSelectedFlower(tempFlower);
    setNextZIndex(prev => prev + 1);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPos || !canvasRef.current || !selectedFlower) return;

    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;

    setPlacedFlowers(prev =>
      prev.map(f =>
        f.id === selectedFlower.id
          ? { ...f, x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) }
          : f
      )
    );
  };

  const handleTouchEnd = () => {
    setTouchStartPos(null);
    setIsDragging(false);
  };

  const handlePlacedFlowerTouchStart = (e: React.TouchEvent, flower: PlacedFlower) => {
    e.stopPropagation();
    setSelectedFlower(flower);
    const touch = e.touches[0];
    setTouchStartPos({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
  };

  const updateSelectedFlower = (updates: Partial<PlacedFlower>) => {
    if (!selectedFlower) return;

    setPlacedFlowers(prev =>
      prev.map(f => (f.id === selectedFlower.id ? { ...f, ...updates } : f))
    );
    setSelectedFlower(prev => (prev ? { ...prev, ...updates } : null));
  };

  const deleteFlower = (flowerId: string) => {
    setPlacedFlowers(prev => prev.filter(f => f.id !== flowerId));
    if (selectedFlower?.id === flowerId) {
      setSelectedFlower(null);
    }
  };

  const clearAll = () => {
    setPlacedFlowers([]);
    setSelectedFlower(null);
    setNextZIndex(1);
  };

  const handleSaveToCart = () => {
    if (placedFlowers.length === 0) return;

    addToCart({
      id: `custom-bouquet-${Date.now()}`,
      title: 'Custom Bouquet',
      priceLKR: totalPrice,
      image: 'https://i.ibb.co/HfF1kg8C/leaves.jpg',
    });

    onClose();
  };

  const downloadBouquet = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;

    const bgImg = new Image();
    bgImg.crossOrigin = 'anonymous';
    bgImg.src = 'https://i.ibb.co/HfF1kg8C/leaves.jpg';

    bgImg.onload = () => {
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      const sortedFlowers = [...placedFlowers].sort((a, b) => a.zIndex - b.zIndex);
      let loadedCount = 0;

      if (sortedFlowers.length === 0) {
        const link = document.createElement('a');
        link.download = 'my-bouquet.png';
        link.href = canvas.toDataURL();
        link.click();
        return;
      }

      sortedFlowers.forEach(flower => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = flower.imageUrl;

        img.onload = () => {
          loadedCount++;

          ctx.save();
          const x = (flower.x / 100) * canvas.width;
          const y = (flower.y / 100) * canvas.height;
          const size = 100 * flower.scale;

          ctx.translate(x, y);
          ctx.rotate((flower.rotation * Math.PI) / 180);
          ctx.drawImage(img, -size / 2, -size / 2, size, size);
          ctx.restore();

          if (loadedCount === sortedFlowers.length) {
            const link = document.createElement('a');
            link.download = 'my-bouquet.png';
            link.href = canvas.toDataURL();
            link.click();
          }
        };
      });
    };
  }, [placedFlowers]);

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex flex-col">
      <div className="sticky top-0 bg-gradient-to-r from-rose-500 to-pink-500 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-50 shadow-lg">
        <div className="flex items-center gap-2 sm:gap-3">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          <h2 className="text-base sm:text-xl md:text-2xl font-bold text-white">Create Bouquet</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-full transition-all"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 lg:grid lg:grid-cols-[320px,1fr,300px] lg:gap-4 lg:p-4">
          <div className={`
            fixed lg:relative inset-y-0 left-0 z-40
            w-80 max-w-[85vw]
            bg-white/95 backdrop-blur-xl
            lg:bg-white lg:backdrop-blur-none
            rounded-r-3xl lg:rounded-2xl
            shadow-2xl lg:shadow-none
            transition-transform duration-300 ease-out
            ${isLeftPanelOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <div className="h-full overflow-y-auto p-4 space-y-4">
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h3 className="font-bold text-gray-900 text-lg">Flower Gallery</h3>
                <button
                  onClick={() => setIsLeftPanelOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="glass-card p-4 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 hidden lg:flex">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  Flower Gallery
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        selectedCategory === cat
                          ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 max-h-[60vh] lg:max-h-96 overflow-y-auto">
                  {filteredFlowers.map(flower => (
                    <div
                      key={flower.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, flower)}
                      onTouchStart={(e) => handleTouchStart(e, flower)}
                      className="relative group cursor-move active:scale-95"
                    >
                      <div className="aspect-square bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-2 hover:shadow-lg transition-all hover:scale-105 active:scale-95">
                        <img
                          src={flower.imageUrl}
                          alt={flower.name}
                          className="w-full h-full object-contain pointer-events-none"
                        />
                      </div>
                      <div className="text-center mt-1">
                        <p className="text-xs font-semibold text-gray-700 truncate">{flower.name}</p>
                        <p className="text-xs text-rose-500 font-bold">{formatLKR(flower.priceLKR)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-2">Total Price</h3>
                <p className="text-3xl font-bold text-gradient">{formatLKR(totalPrice)}</p>
                <p className="text-xs text-gray-600 mt-1">{placedFlowers.length} flowers added</p>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 lg:relative flex flex-col p-4">
            <div
              ref={canvasRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="flex-1 relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl overflow-hidden shadow-xl"
              style={{
                backgroundImage: 'url(https://i.ibb.co/HfF1kg8C/leaves.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {placedFlowers.length === 0 && (
                  <div className="text-center p-4 sm:p-6 glass-card rounded-2xl">
                    <p className="text-gray-700 font-semibold mb-2 text-sm sm:text-base">Drag flowers here</p>
                    <p className="text-xs sm:text-sm text-gray-600">Create your perfect bouquet</p>
                  </div>
                )}
              </div>

              {placedFlowers.map(flower => (
                <div
                  key={flower.id}
                  draggable
                  onDragStart={(e) => handlePlacedFlowerDragStart(e, flower)}
                  onDragEnd={handlePlacedFlowerDragEnd}
                  onTouchStart={(e) => handlePlacedFlowerTouchStart(e, flower)}
                  onClick={() => handleFlowerClick(flower)}
                  className={`absolute cursor-move transition-all ${
                    selectedFlower?.id === flower.id ? 'ring-4 ring-rose-500 ring-offset-2' : ''
                  } ${draggingFlowerId === flower.id ? 'opacity-50' : ''}`}
                  style={{
                    left: `${flower.x}%`,
                    top: `${flower.y}%`,
                    transform: `translate(-50%, -50%) scale(${flower.scale}) rotate(${flower.rotation}deg)`,
                    zIndex: flower.zIndex,
                  }}
                >
                  <img
                    src={flower.imageUrl}
                    alt={flower.flowerName}
                    className="w-16 h-16 sm:w-24 sm:h-24 object-contain pointer-events-none"
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={clearAll}
                className="flex-1 py-2.5 sm:py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                Clear
              </button>
              <button
                onClick={downloadBouquet}
                className="flex-1 py-2.5 sm:py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                Download
              </button>
              <button
                onClick={handleSaveToCart}
                disabled={placedFlowers.length === 0}
                className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                Add to Cart
              </button>
            </div>
          </div>

          <div className={`
            fixed lg:relative inset-y-0 right-0 z-40
            w-80 max-w-[85vw]
            bg-white/95 backdrop-blur-xl
            lg:bg-white lg:backdrop-blur-none
            rounded-l-3xl lg:rounded-2xl
            shadow-2xl lg:shadow-none
            transition-transform duration-300 ease-out
            ${isRightPanelOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          `}>
            <div className="h-full overflow-y-auto p-4 space-y-4">
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h3 className="font-bold text-gray-900 text-lg">Edit Flower</h3>
                <button
                  onClick={() => setIsRightPanelOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedFlower ? (
                <div className="glass-card p-4 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 hidden lg:block">Edit Flower</h3>
                    <button
                      onClick={() => deleteFlower(selectedFlower.id)}
                      className="p-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-600 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Size
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateSelectedFlower({ scale: Math.max(0.5, selectedFlower.scale - 0.1) })}
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="range"
                          min="0.5"
                          max="2"
                          step="0.1"
                          value={selectedFlower.scale}
                          onChange={(e) => updateSelectedFlower({ scale: parseFloat(e.target.value) })}
                          className="flex-1"
                        />
                        <button
                          onClick={() => updateSelectedFlower({ scale: Math.min(2, selectedFlower.scale + 0.1) })}
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 text-center">{Math.round(selectedFlower.scale * 100)}%</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Rotation
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={selectedFlower.rotation}
                        onChange={(e) => updateSelectedFlower({ rotation: parseInt(e.target.value) })}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-600 mt-1 text-center">{selectedFlower.rotation}°</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Layer Order
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const newZIndex = Math.max(1, selectedFlower.zIndex - 1);
                            updateSelectedFlower({ zIndex: newZIndex });
                          }}
                          className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-all"
                        >
                          Send Back
                        </button>
                        <button
                          onClick={() => {
                            const newZIndex = selectedFlower.zIndex + 1;
                            updateSelectedFlower({ zIndex: newZIndex });
                            setNextZIndex(Math.max(nextZIndex, newZIndex + 1));
                          }}
                          className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-all"
                        >
                          Bring Front
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-card p-4 rounded-2xl">
                  <p className="text-sm text-gray-600 text-center">
                    Click on a flower to edit its properties
                  </p>
                </div>
              )}

              <div className="glass-card p-4 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-3">Your Flowers</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {placedFlowers.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">No flowers added yet</p>
                  ) : (
                    placedFlowers.map(flower => {
                      const flowerType = flowerTypes.find(f => f.id === flower.flowerId);
                      return (
                        <div
                          key={flower.id}
                          onClick={() => handleFlowerClick(flower)}
                          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                            selectedFlower?.id === flower.id
                              ? 'bg-rose-100 ring-2 ring-rose-500'
                              : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <img src={flower.imageUrl} alt={flower.flowerName} className="w-8 h-8 object-contain" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-900 truncate">{flower.flowerName}</p>
                            <p className="text-xs text-rose-500">{formatLKR(flowerType?.priceLKR || 0)}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteFlower(flower.id);
                            }}
                            className="p-1 hover:bg-red-100 rounded"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
          className={`
            fixed left-0 top-1/2 -translate-y-1/2 z-30
            lg:hidden
            p-3 bg-white/90 backdrop-blur-sm
            rounded-r-xl shadow-xl
            transition-all duration-300
            ${isLeftPanelOpen ? 'translate-x-80' : 'translate-x-0'}
            ${isDragging ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
        >
          {isLeftPanelOpen ? (
            <ChevronLeft className="w-6 h-6 text-rose-500" />
          ) : (
            <ChevronRight className="w-6 h-6 text-rose-500" />
          )}
        </button>

        <button
          onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
          className={`
            fixed right-0 top-1/2 -translate-y-1/2 z-30
            lg:hidden
            p-3 bg-white/90 backdrop-blur-sm
            rounded-l-xl shadow-xl
            transition-all duration-300
            ${isRightPanelOpen ? '-translate-x-80' : 'translate-x-0'}
            ${isDragging ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
        >
          {isRightPanelOpen ? (
            <ChevronRight className="w-6 h-6 text-rose-500" />
          ) : (
            <ChevronLeft className="w-6 h-6 text-rose-500" />
          )}
        </button>

        {(isLeftPanelOpen || isRightPanelOpen) && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => {
              setIsLeftPanelOpen(false);
              setIsRightPanelOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};
