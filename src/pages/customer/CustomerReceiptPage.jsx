import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import ReceiptCard from '../../components/customer/ReceiptCard.jsx';
import { useReceipt } from '../../hooks/useReceipt.js';

export default function CustomerReceiptPage() {
  const { saleId } = useParams();
  const { receipt, isLoading, error, downloadPdf } = useReceipt(saleId);

  if (isLoading) return <div className="soft-card h-96 animate-pulse rounded-[2rem]" />;

  if (error || !receipt) {
    return <EmptyState title="Recibo no disponible" description={error} actionLabel="Volver a pedidos" onAction={() => window.location.assign('/customer/orders')} />;
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/customer/orders">
          <Button variant="ghost" icon={ArrowLeft}>Volver a pedidos</Button>
        </Link>
        <Button icon={Download} onClick={downloadPdf}>Descargar PDF</Button>
      </div>
      <ReceiptCard receipt={receipt} />
    </div>
  );
}
