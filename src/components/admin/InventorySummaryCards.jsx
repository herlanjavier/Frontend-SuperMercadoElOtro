import { AlertTriangle, Boxes, CircleDollarSign, Package, PackageCheck, PackageX, TrendingDown } from 'lucide-react';
import AdminStatsCard from './AdminStatsCard.jsx';
import { formatCurrency } from '../../utils/formatters.js';

export default function InventorySummaryCards({ summary = {} }) {
  const cards = [
    { title: 'Total productos', value: summary.totalProducts, icon: Package, tone: 'green' },
    { title: 'Activos', value: summary.activeProducts, icon: PackageCheck, tone: 'green' },
    { title: 'Inactivos', value: summary.inactiveProducts, icon: PackageX, tone: 'slate' },
    { title: 'Sin stock', value: summary.outOfStockProducts, icon: PackageX, tone: 'rose' },
    { title: 'Stock bajo', value: summary.lowStockProducts, icon: TrendingDown, tone: 'amber' },
    { title: 'Stock critico', value: summary.criticalStockProducts, icon: AlertTriangle, tone: 'rose' },
    { title: 'Stock actual', value: summary.totalCurrentStock, icon: Boxes, tone: 'blue' },
    { title: 'Valor inventario', value: formatCurrency(summary.totalInventoryValue), icon: CircleDollarSign, tone: 'green' },
  ];

  return <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map((card) => <AdminStatsCard key={card.title} {...card} />)}</section>;
}
