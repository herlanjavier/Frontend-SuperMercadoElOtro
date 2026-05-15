import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../common/Button.jsx';
import ProductImage from './ProductImage.jsx';
import ProductPrice from './ProductPrice.jsx';
import ProductStockBadge from './ProductStockBadge.jsx';
import { isProductAvailable } from '../../utils/productHelpers.js';
import { useCart } from '../../hooks/useCart.js';

export default function ProductCard({ product }) {
  const available = isProductAvailable(product);
  const { addItem } = useCart();

  const handleAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!available) {
      toast.error('Producto sin stock disponible.');
      return;
    }
    addItem(product);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="group soft-card overflow-hidden rounded-3xl hover:-translate-y-1"
    >
      <Link to={`/customer/products/${product.id}`} className="block">
        <ProductImage product={product} className="h-40" />
        <div className="p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="truncate rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700">
              {product.category?.name || 'Sin categoría'}
            </span>
            <ProductStockBadge status={product.stockStatus} stock={product.stock} compact />
          </div>
          <h3 className="line-clamp-2 min-h-12 text-base font-black text-green-950">{product.name}</h3>
          <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
            {product.description || 'Producto disponible en tienda.'}
          </p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <ProductPrice value={product.price} />
            <Button
              icon={available ? Plus : Eye}
              variant={available ? 'primary' : 'secondary'}
              disabled={!available}
              onClick={handleAdd}
              className="min-h-10 px-4"
            >
              {available ? 'Agregar' : 'Sin stock'}
            </Button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
