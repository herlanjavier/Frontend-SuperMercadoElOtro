import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, Package, RefreshCw, ShoppingBag } from 'lucide-react';
import Button from '../common/Button.jsx';
import SectionTitle from '../common/SectionTitle.jsx';
import { productService } from '../../services/product.service.js';
import { useAuth } from '../../hooks/useAuth.js';
import { formatCurrency } from '../../utils/formatters.js';

const getProductPath = (role, productId) => {
  if (role === 'customer') return `/customer/products/${productId}`;
  if (role === 'admin') return `/admin/products/${productId}/edit`;
  if (role === 'sales_manager') return '/sales';
  return '/login';
};

const getActionLabel = (role) => {
  if (role === 'customer') return 'Ver producto';
  if (role === 'admin') return 'Editar';
  if (role === 'sales_manager') return 'Ir al panel';
  return 'Ingresar';
};

export default function ProductPreview() {
  const { isAuthenticated, role } = useAuth();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const visibleProducts = useMemo(() => products.slice(0, 4), [products]);

  const fetchProducts = async () => {
    if (!isAuthenticated) return;
    try {
      setIsLoading(true);
      setError('');
      const data = await productService.getProducts({ onlyAvailable: true });
      setProducts(Array.isArray(data) ? data.slice(0, 4) : []);
    } catch (err) {
      setError(err?.message || 'No se pudieron cargar los productos disponibles.');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <section id="destacados" className="container-app py-16">
        <SectionTitle
          eyebrow="Catalogo real"
          title="Productos listos para una compra rapida"
          description="Inicia sesion para ver productos disponibles, precios actualizados y stock real del supermercado."
        />
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-green-100 bg-white p-6 shadow-sm shadow-green-950/5 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-3xl bg-green-50 text-green-700">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-black text-green-950">Explora productos con datos reales</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                  El catalogo usa la informacion del backend. Accede a tu cuenta para comprar con stock y precios actualizados.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/login">
                <Button icon={LogIn} className="w-full sm:w-auto">
                  Ingresar
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary" className="w-full sm:w-auto">
                  Crear cuenta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="destacados" className="container-app py-16">
      <SectionTitle
        eyebrow="Disponibles"
        title="Productos listos para una compra rapida"
        description="Una vista rapida de productos disponibles conectados al catalogo real."
      />

      {isLoading ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-72 animate-pulse rounded-3xl bg-slate-100" />
          ))}
        </div>
      ) : error ? (
        <div className="mt-10 rounded-[2rem] border border-rose-100 bg-rose-50 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-bold text-rose-700">{error}</p>
            <Button variant="secondary" icon={RefreshCw} onClick={fetchProducts}>
              Reintentar
            </Button>
          </div>
        </div>
      ) : visibleProducts.length === 0 ? (
        <div className="mt-10 rounded-[2rem] border border-slate-100 bg-white p-6 text-center shadow-sm shadow-green-950/5">
          <Package className="mx-auto h-10 w-10 text-green-700" />
          <h3 className="mt-3 text-lg font-black text-green-950">No hay productos disponibles por ahora</h3>
          <p className="mt-1 text-sm text-slate-500">Vuelve a revisar el catalogo mas tarde.</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => {
            const image = product.imageUrl || product.image_url;
            const categoryName = product.category?.name || 'Sin categoria';

            return (
              <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm shadow-green-950/5">
                <div className="flex h-40 flex-none items-center justify-center overflow-hidden bg-slate-50 p-3">
                  {image ? (
                    <img
                      src={image}
                      alt={product.name}
                      className="block rounded-2xl"
                      style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }}
                    />
                  ) : (
                    <Package className="h-12 w-12 text-green-700" />
                  )}
                </div>
                <div className="grid gap-3 p-5">
                  <span className="w-fit rounded-full bg-yellow-50 px-3 py-1 text-xs font-black text-yellow-700">{categoryName}</span>
                  <h3 className="min-h-12 break-words font-black leading-tight text-green-950">{product.name}</h3>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-black text-green-800">{formatCurrency(product.price)}</p>
                      <p className="text-xs font-bold text-slate-500">Stock: {product.stock ?? 0}</p>
                    </div>
                    <Link to={getProductPath(role, product.id)}>
                      <Button icon={ShoppingBag} variant="warm" className="min-h-10 px-4">
                        {getActionLabel(role)}
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
