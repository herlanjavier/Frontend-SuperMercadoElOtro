import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, ShoppingCart } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import ProductImage from '../../components/catalog/ProductImage.jsx';
import ProductPrice from '../../components/catalog/ProductPrice.jsx';
import ProductStockBadge from '../../components/catalog/ProductStockBadge.jsx';
import QuantitySelector from '../../components/cart/QuantitySelector.jsx';
import { productService } from '../../services/product.service.js';
import { formatDate, safeText } from '../../utils/formatters.js';
import { isProductAvailable } from '../../utils/productHelpers.js';
import { useCart } from '../../hooks/useCart.js';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();

  const fetchProduct = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.getProductById(id);
      setProduct(data);
      setQuantity(1);
    } catch (err) {
      setError(err.userMessage || err.response?.data?.message || 'No se pudo cargar el producto.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="grid gap-5">
        <div className="h-10 w-40 animate-pulse rounded-2xl bg-slate-100" />
        <div className="soft-card grid gap-6 rounded-[2rem] p-5 lg:grid-cols-[0.9fr_1fr]">
          <div className="aspect-square animate-pulse rounded-3xl bg-slate-100" />
          <div className="grid content-start gap-4">
            <div className="h-8 w-3/4 animate-pulse rounded-full bg-slate-100" />
            <div className="h-24 animate-pulse rounded-3xl bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <EmptyState
        title="Producto no encontrado"
        description={error || 'El producto no está disponible.'}
        actionLabel="Volver al catálogo"
        onAction={() => window.history.back()}
      />
    );
  }

  const available = isProductAvailable(product);

  const addSelectedQuantity = () => {
    addItem(product, quantity);
  };

  return (
    <div className="grid gap-5">
      <Link to="/customer/catalog" className="inline-flex items-center gap-2 text-sm font-black text-green-700">
        <ArrowLeft className="h-4 w-4" />
        Volver al catálogo
      </Link>

      <section className="soft-card grid gap-6 overflow-hidden rounded-[2rem] p-5 lg:grid-cols-[0.9fr_1fr] lg:p-7">
        <ProductImage product={product} className="aspect-square rounded-3xl" />
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700">
              {product.category?.name || 'Sin categoría'}
            </span>
            <ProductStockBadge status={product.stockStatus} stock={product.stock} />
          </div>
          <h1 className="mt-5 text-3xl font-black text-green-950 sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">{safeText(product.description, 'Sin descripción.')}</p>
          <ProductPrice value={product.price} className="mt-6 text-3xl" />
          <div className="mt-5 grid gap-3 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600 sm:grid-cols-2">
            <p>
              <span className="font-black text-green-950">Stock:</span> {product.stock}
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-green-700" />
              {formatDate(product.expirationDate)}
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <QuantitySelector value={quantity} max={product.stock} onChange={setQuantity} disabled={!available} />
            <Button icon={ShoppingCart} disabled={!available} className="w-full sm:w-auto" onClick={addSelectedQuantity}>
              {available ? 'Agregar al carrito' : 'Sin stock'}
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto" onClick={openCart}>
              Ver carrito
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
