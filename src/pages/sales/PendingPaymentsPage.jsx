import SalesOrdersView from './SalesOrdersView.jsx';

export default function PendingPaymentsPage() {
  return <SalesOrdersView title="Pagos pendientes" subtitle="Pedidos esperando verificacion fisica del pago QR." initialStatus="pending_payment" />;
}
