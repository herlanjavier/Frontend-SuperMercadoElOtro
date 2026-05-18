import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LayoutDashboard, LogIn, Package, Plus, RefreshCw, ShoppingBag, UserPlus } from 'lucide-react';
import Button from '../common/Button.jsx';
import Modal from '../common/Modal.jsx';
import SectionTitle from '../common/SectionTitle.jsx';
import ProductStockBadge from '../catalog/ProductStockBadge.jsx';
import { productService } from '../../services/product.service.js';
import { useAuth } from '../../hooks/useAuth.js';
import { useCart } from '../../hooks/useCart.js';
import { formatCurrency } from '../../utils/formatters.js';
import { getDashboardPathByRole } from '../../utils/roleRedirect.js';
import { getProductImage, isProductAvailable } from '../../utils/productHelpers.js';
import { ROLES } from '../../utils/constants.js';

const loginMessage = 'Inicia sesión o crea una cuenta para comprar.';

export default function ProductPreview() {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const visibleProducts = useMemo(() => products.slice(0, 8), [products]);
  const isCustomer = isAuthenticated && role === ROLES.CUSTOMER;
  const isStaff = isAuthenticated && [ROLES.ADMIN, ROLES.SALES_MANAGER].includes(role);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await productService.getProducts({ onlyAvailable: true });
      setProducts(Array.isArray(data) ? data.slice(0, 8) : []);
    } catch (err) {
      setError(err.userMessage || err?.message || 'No se pudieron cargar los productos disponibles.');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const requireLogin = () => {
    toast(loginMessage);
    setShowLoginModal(true);
  };

  const handleProductAction = (product) => {
    if (!isProductAvailable(product)) {
      toast.error('Producto sin stock disponible.');
      return;
    }

    if (!isAuthenticated) {
      requireLogin();
      return;
    }

    if (isStaff) {
      navigate(getDashboardPathByRole(role));
      return;
    }

    addItem(product);
  };

  const getButton = (product) => {
    const available = isProductAvailable(product);

    if (isCustomer) {
      return (
        <Button
          icon={available ? Plus : Package}
          disabled={!available}
          onClick={() => handleProductAction(product)}
          className="min-h-10 w-full px-4"
        >
          {available ? 'Agregar' : 'Sin stock'}
        </Button>
      );
    }

    if (isStaff) {
      return (
        <Button icon={LayoutDashboard} variant="secondary" onClick={() => navigate(getDashboardPathByRole(role))} className="min-h-10 w-full px-4">
          Ir a mi panel
        </Button>
      );
    }

    return (
      <Button icon={LogIn} variant="warm" disabled={!available} onClick={() => handleProductAction(product)} className="min-h-10 w-full px-4">
        {available ? 'Iniciar sesión para comprar' : 'Sin stock'}
      </Button>
    );
  };

  return (
    <section id="destacados" className="container-app py-16">
      <SectionTitle
        eyebrow="Catalogo publico"
        title="Productos destacados para tu proxima compra"
        description="Consulta precios, categorias e inventario disponible. Para comprar, inicia sesion como cliente."
      />

      {isLoading ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="h-80 animate-pulse rounded-3xl bg-slate-100" />
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
            const image = getProductImage(product);
            const categoryName = product.category?.name || 'Sin categoria';
            const available = isProductAvailable(product);

            return (
              <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm shadow-green-950/5">
                <div className="flex h-44 flex-none items-center justify-center overflow-hidden bg-slate-50 p-3">
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
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate rounded-full bg-yellow-50 px-3 py-1 text-xs font-black text-yellow-700">
                      {categoryName}
                    </span>
                    <ProductStockBadge status={available ? product.stockStatus : 'out_of_stock'} stock={product.stock} compact />
                  </div>
                  <h3 className="line-clamp-2 min-h-12 break-words font-black leading-tight text-green-950">{product.name}</h3>
                  <p className="line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
                    {product.description || 'Producto disponible en tienda.'}
                  </p>
                  <div className="grid gap-3">
                    <div>
                      <p className="text-lg font-black text-green-800">{formatCurrency(product.price)}</p>
                      <p className="text-xs font-bold text-slate-500">{available ? `Stock: ${product.stock ?? 0}` : 'Sin stock'}</p>
                    </div>
                    {getButton(product)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <Modal open={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <div className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-3xl bg-green-50 text-green-700">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-xl font-black text-green-950">Inicia sesión o crea una cuenta para comprar.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Puedes seguir mirando productos. Para agregar al carrito o crear pedidos necesitas una cuenta de cliente.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link to="/login">
              <Button icon={LogIn} className="w-full">
                Iniciar sesión
              </Button>
            </Link>
            <Link to="/register">
              <Button icon={UserPlus} variant="secondary" className="w-full">
                Crear cuenta
              </Button>
            </Link>
          </div>
        </div>
      </Modal>
    </section>
  );
}
