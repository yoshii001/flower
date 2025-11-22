import CinematicHero from './components/CinematicHero';
import FeaturedCollections from './components/FeaturedCollections';
import ProductGallery from './components/ProductGallery';
import Story from './components/Story';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import FallingPetals from './components/FallingPetals';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <FallingPetals />
      <Navbar />
      <CinematicHero />
      <FeaturedCollections />
      <ProductGallery />
      <Story />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
