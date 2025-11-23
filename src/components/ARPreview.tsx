import { useState, useRef, useEffect } from 'react';
import { X, Camera, RotateCcw, Download, Maximize2, Move } from 'lucide-react';
import { Product } from '../types';

interface ARPreviewProps {
  product: Product;
  onClose: () => void;
}

export const ARPreview = ({ product, onClose }: ARPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLImageElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 60 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [error, setError] = useState<string | null>(null);
  const [overlayLoaded, setOverlayLoaded] = useState(false);

  useEffect(() => {
    let currentStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: 1280, height: 720 },
          audio: false,
        });
        currentStream = mediaStream;
        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = async () => {
            try {
              await videoRef.current?.play();
              setIsReady(true);
            } catch (playError) {
              console.error('Video play error:', playError);
              setError('Unable to start video playback. Please try again.');
            }
          };
        }
      } catch (err) {
        console.error('Camera access error:', err);
        setError('Unable to access camera. Please ensure camera permissions are granted.');
      }
    };

    startCamera();

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!isReady || !overlayLoaded || !videoRef.current || !canvasRef.current || !overlayRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const overlay = overlayRef.current;

    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      if (!video.videoWidth || !video.videoHeight) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (overlay.naturalWidth && overlay.naturalHeight) {
        const overlayWidth = canvas.width * 0.3 * scale;
        const overlayHeight = (overlayWidth / overlay.naturalWidth) * overlay.naturalHeight;
        const x = (canvas.width * position.x) / 100 - overlayWidth / 2;
        const y = (canvas.height * position.y) / 100 - overlayHeight / 2;

        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 10;

        ctx.drawImage(overlay, x, y, overlayWidth, overlayHeight);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReady, overlayLoaded, position, scale]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const deltaX = ((e.clientX - dragStart.x) / rect.width) * 100;
    const deltaY = ((e.clientY - dragStart.y) / rect.height) * 100;

    setPosition((prev) => ({
      x: Math.max(10, Math.min(90, prev.x + deltaX)),
      y: Math.max(10, Math.min(90, prev.y + deltaY)),
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !canvasRef.current || e.touches.length !== 1) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const deltaX = ((e.touches[0].clientX - dragStart.x) / rect.width) * 100;
    const deltaY = ((e.touches[0].clientY - dragStart.y) / rect.height) * 100;

    setPosition((prev) => ({
      x: Math.max(10, Math.min(90, prev.x + deltaX)),
      y: Math.max(10, Math.min(90, prev.y + deltaY)),
    }));
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleCapture = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `${product.title}-ar-preview.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const handleReset = () => {
    setPosition({ x: 50, y: 60 });
    setScale(1);
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black flex flex-col">
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold mb-1">AR Preview</h2>
            <p className="text-white/70 text-sm">See how {product.title} looks in your space</p>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all backdrop-blur-sm"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {error ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="glass-card p-8 rounded-2xl max-w-md text-center">
            <Camera className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Camera Access Required</h3>
            <p className="text-white/70 mb-6">{error}</p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 relative flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
              style={{ display: isReady ? 'none' : 'block' }}
            />

            {!isReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-white/50 mx-auto mb-4 animate-pulse" />
                  <p className="text-white/70">Starting camera...</p>
                </div>
              </div>
            )}

            <canvas
              ref={canvasRef}
              className={`max-w-full max-h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ display: isReady ? 'block' : 'none', touchAction: 'none' }}
            />

            <img
              ref={overlayRef}
              src={product.images[0]}
              alt={product.title}
              className="hidden"
              crossOrigin="anonymous"
              onLoad={() => setOverlayLoaded(true)}
            />

            {isReady && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="glass-card px-4 py-2 rounded-full">
                  <p className="text-white text-sm font-semibold flex items-center gap-2">
                    <Move className="w-4 h-4" />
                    Drag to reposition
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="glass-card px-4 py-2 rounded-lg">
                    <label className="block text-white/70 text-xs mb-1">Size</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={scale}
                      onChange={(e) => setScale(parseFloat(e.target.value))}
                      className="w-32"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleReset}
                    className="p-3 glass-card rounded-full text-white hover:bg-white/20 transition-all"
                    title="Reset position"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleCapture}
                    className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-white font-semibold hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Capture
                  </button>
                </div>
              </div>

              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-4">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-bold">{product.title}</h3>
                    <p className="text-white/70 text-sm">{product.category}</p>
                  </div>
                  <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-semibold transition-all flex items-center gap-2">
                    <Maximize2 className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
