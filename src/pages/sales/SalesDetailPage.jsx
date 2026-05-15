import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import SaleDetailCard from '../../components/sales/SaleDetailCard.jsx';
import SalesPageHeader from '../../components/sales/SalesPageHeader.jsx';
import { useSaleDetail } from '../../hooks/useSaleDetail.js';

export default function SalesDetailPage() {
  const { id } = useParams();
  const { sale, isLoading, error, downloadPdf } = useSaleDetail(id, { loadSale: true, loadReceipt: true });

  if (isLoading) return <div className="soft-card h-96 animate-pulse rounded-[2rem]" />;
  if (error || !sale) return <EmptyState title="Venta no encontrada" description={error} />;

  return (
    <div className="grid gap-6">
      <SalesPageHeader title="Detalle de venta" subtitle="Informacion de la venta registrada." />
      <Link to="/sales/sales"><Button variant="ghost" icon={ArrowLeft}>Volver a ventas</Button></Link>
      <SaleDetailCard sale={sale} onDownload={downloadPdf} />
    </div>
  );
}
