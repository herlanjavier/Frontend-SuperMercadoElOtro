import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, XCircle } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import OrderCard from '../../components/customer/OrderCard.jsx';
import OrderFilters from '../../components/customer/OrderFilters.jsx';
import { useCustomerOrders } from '../../hooks/useCustomerOrders.js';

function OrderSkeleton() {
  return (
    <div className="grid gap-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="soft-card h-48 animate-pulse rounded-[1.75rem] bg-white" />
      ))}
    </div>
  );
}

export default function CustomerOrdersPage() {
  const navigate = useNavigate();
  const [orderToCancel, setOrderToCancel] = useState(null);
  const { orders, isLoading, error, filters, setFilters, clearFilters, refetch, cancelOrderById } = useCustomerOrders();

  const confirmCancel = async () => {
    if (!orderToCancel) return;
    await cancelOrderById(orderToCancel);
    setOrderToCancel(null);
  };

  return (
    <div className="grid gap-6">
      <header className="rounded-[2rem] bg-green-900 p-6 text-white shadow-2xl shadow-green-950/15">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-yellow-300">Compras</p>
            <h2 className="mt-2 text-3xl font-black">Mis pedidos</h2>
            <p className="mt-2 text-green-50/80">Consulta el estado de tus compras y revisa tus productos.</p>
          </div>
          <Link to="/customer/catalog">
            <Button variant="warm" icon={ShoppingBag} className="w-full sm:w-auto">
              Seguir comprando
            </Button>
          </Link>
        </div>
      </header>

      <OrderFilters filters={filters} onChange={setFilters} onClear={clearFilters} />

      {isLoading ? <OrderSkeleton /> : null}

      {!isLoading && error ? (
        <EmptyState title="No se pudieron cargar tus pedidos" description={error} actionLabel="Reintentar" onAction={refetch} />
      ) : null}

      {!isLoading && !error && orders.length === 0 ? (
        <EmptyState
          title="Aun no tienes pedidos"
          description="Cuando realices una compra, podras seguir su estado desde aqui."
          actionLabel="Explorar catalogo"
          onAction={() => navigate('/customer/catalog')}
        />
      ) : null}

      {!isLoading && !error && orders.length > 0 ? (
        <section className="grid gap-4 xl:grid-cols-2">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} onCancel={setOrderToCancel} />
          ))}
        </section>
      ) : null}

      {orderToCancel ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-green-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-rose-50 text-rose-700">
              <XCircle className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-center text-xl font-black text-green-950">Cancelar pedido</h3>
            <p className="mt-2 text-center text-sm leading-6 text-slate-600">
              Esta accion cancelara el pedido pendiente de pago. Podras crear uno nuevo desde el catalogo.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <Button variant="secondary" onClick={() => setOrderToCancel(null)}>
                Mantener pedido
              </Button>
              <Button className="bg-rose-600 hover:bg-rose-700" onClick={confirmCancel}>
                Si, cancelar
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
