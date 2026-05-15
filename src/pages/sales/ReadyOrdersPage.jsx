import SalesOrdersView from './SalesOrdersView.jsx';

export default function ReadyOrdersPage() {
  return <SalesOrdersView title="Listos para recoger / entregar" subtitle="Pedidos listos para salida o entrega." initialStatus="ready_for_pickup" />;
}
