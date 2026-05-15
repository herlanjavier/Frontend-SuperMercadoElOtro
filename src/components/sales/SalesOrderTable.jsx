import SalesOrderCard from './SalesOrderCard.jsx';

export default function SalesOrderTable({ orders, onChanged }) {
  return (
    <section className="grid gap-4 xl:grid-cols-2">
      {orders.map((order) => <SalesOrderCard key={order.id} order={order} onChanged={onChanged} />)}
    </section>
  );
}
