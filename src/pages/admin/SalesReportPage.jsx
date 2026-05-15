import { CircleDollarSign, ReceiptText } from 'lucide-react';
import ReportEmptyState from '../../components/reports/ReportEmptyState.jsx';
import ReportFilters from '../../components/reports/ReportFilters.jsx';
import ReportPageHeader from '../../components/reports/ReportPageHeader.jsx';
import ReportSummaryCard from '../../components/reports/ReportSummaryCard.jsx';
import SalesReportTable from '../../components/reports/SalesReportTable.jsx';
import { useSalesReport } from '../../hooks/useSalesReport.js';
import { formatCurrency } from '../../utils/formatters.js';
import { getPeriodLabel } from '../../utils/reportHelpers.js';

export default function SalesReportPage() {
  const { report, filters, setFilters, isLoading, isDownloading, error, fetchReport, downloadPdf, clearFilters } = useSalesReport();
  const sales = report?.sales || [];

  return (
    <div className="grid gap-6">
      <ReportPageHeader title="Reporte de ventas" subtitle="Consulta ingresos y ventas por periodo." onDownload={downloadPdf} isDownloading={isDownloading} />
      <ReportFilters filters={filters} onChange={setFilters} onApply={fetchReport} onClear={clearFilters} error={error} />
      {isLoading ? <div className="soft-card h-64 animate-pulse rounded-[2rem]" /> : null}
      {!isLoading && report ? (
        <>
          <section className="grid gap-4 sm:grid-cols-3">
            <ReportSummaryCard title="Total ventas" value={report.summary?.totalSalesCount || 0} icon={ReceiptText} tone="green" />
            <ReportSummaryCard title="Ingresos" value={formatCurrency(report.summary?.totalRevenue)} icon={CircleDollarSign} tone="blue" />
            <ReportSummaryCard title="Periodo" value={report.period?.label || getPeriodLabel(filters)} icon={ReceiptText} tone="amber" />
          </section>
          {sales.length ? <SalesReportTable sales={sales} /> : <ReportEmptyState />}
        </>
      ) : null}
    </div>
  );
}
