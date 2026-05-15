import ProductAdminCard from './ProductAdminCard.jsx';

export default function ProductAdminTable({ products, onDeactivate, onRestore, onDeleteImage }) {
  return (
    <section className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <ProductAdminCard
          key={product.id}
          product={product}
          onDeactivate={onDeactivate}
          onRestore={onRestore}
          onDeleteImage={onDeleteImage}
        />
      ))}
    </section>
  );
}
