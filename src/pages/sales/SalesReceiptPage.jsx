import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import ReceiptCard from '../../components/customer/ReceiptCard.jsx';
import { useSaleDetail } from '../../hooks/useSaleDetail.js';

export default function SalesReceiptPage() {
  const { saleId } = useParams();
  const { receipt, isLoading, error, downloadPdf } = useSaleDetail(saleId, { loadSale: false, loadReceipt: true });

  if (isLoading) return <div className="soft-card h-96 animate-pulse rounded-[2rem]" />;
  if (error || !receipt) return <EmptyState title="Recibo no disponible" description={error} />;

  return (
    <div className="mx-auto grid max-w-3xl gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/sales/sales"><Button variant="ghost" icon={ArrowLeft}>Volver a ventas</Button></Link>
        <Button icon={Download} onClick={downloadPdf}>Descargar PDF</Button>
      </div>
      <ReceiptCard receipt={receipt} />
    </div>
  );
}
