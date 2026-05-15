import HeroSection from '../../components/home/HeroSection.jsx';
import FeatureSection from '../../components/home/FeatureSection.jsx';
import CategoriesPreview from '../../components/home/CategoriesPreview.jsx';
import ProductPreview from '../../components/home/ProductPreview.jsx';
import CTASection from '../../components/home/CTASection.jsx';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <CategoriesPreview />
      <ProductPreview />
      <CTASection />
    </>
  );
}
