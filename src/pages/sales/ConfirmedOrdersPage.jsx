import SalesOrdersView from './SalesOrdersView.jsx';

export default function ConfirmedOrdersPage() {
  return <SalesOrdersView title="Pedidos confirmados" subtitle="Pedidos pagados y listos para preparar." initialStatus="confirmed" />;
}
