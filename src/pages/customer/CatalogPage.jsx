import { useEffect, useState } from 'react';
import CatalogHeader from '../../components/catalog/CatalogHeader.jsx';
import CategoryChips from '../../components/catalog/CategoryChips.jsx';
import ProductFilters from '../../components/catalog/ProductFilters.jsx';
import ProductGrid from '../../components/catalog/ProductGrid.jsx';
import ProductSearchBar from '../../components/catalog/ProductSearchBar.jsx';
import BusinessHoursBanner from '../../components/cart/BusinessHoursBanner.jsx';
import { useCategories } from '../../hooks/useCategories.js';
import { useBusinessHours } from '../../hooks/useBusinessHours.js';
import { useProducts } from '../../hooks/useProducts.js';

export default function CatalogPage() {
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { products, isLoading, error, filters, setFilters, refetch } = useProducts();
  const businessHours = useBusinessHours();
  const [searchValue, setSearchValue] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ search: searchValue });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, setFilters]);

  const clearFilters = () => {
    setSearchValue('');
    setFilters({ search: '', categoryId: '', onlyAvailable: false });
  };

  return (
    <div className="grid gap-6">
      <CatalogHeader />
      <BusinessHoursBanner {...businessHours} />
      <section className="grid gap-4">
        <ProductSearchBar value={searchValue} onChange={setSearchValue} />
        <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <CategoryChips
            categories={categories}
            selectedId={filters.categoryId}
            onSelect={(categoryId) => setFilters({ categoryId })}
            isLoading={categoriesLoading}
          />
          <ProductFilters
            onlyAvailable={filters.onlyAvailable}
            onOnlyAvailableChange={(onlyAvailable) => setFilters({ onlyAvailable })}
          />
        </div>
      </section>

      <ProductGrid
        products={products}
        isLoading={isLoading}
        error={error}
        onRetry={error ? refetch : clearFilters}
      />
    </div>
  );
}
