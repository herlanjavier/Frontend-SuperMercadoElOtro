import { ImageOff, Package } from 'lucide-react';
import { getProductImage } from '../../utils/productHelpers.js';

export default function ProductImage({ product, className = '' }) {
  const image = getProductImage(product);

  return (
    <div className={`relative flex overflow-hidden items-center justify-center bg-slate-50 ${className}`}>
      {image ? (
        <img
          src={image}
          alt={product.name}
          className="block"
          style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }}
          onError={(event) => {
            event.currentTarget.style.display = 'none';
            event.currentTarget.nextElementSibling.style.display = 'grid';
          }}
        />
      ) : null}
      <div className={`${image ? 'hidden' : 'grid'} absolute inset-0 place-items-center`}>
        <div className="grid h-16 w-16 place-items-center rounded-3xl bg-white/80 text-green-700 shadow-lg">
          {image ? <ImageOff className="h-8 w-8" /> : <Package className="h-8 w-8" />}
        </div>
      </div>
    </div>
  );
}
