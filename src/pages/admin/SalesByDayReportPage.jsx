import ReportChartCard from '../../components/reports/ReportChartCard.jsx';
import ReportEmptyState from '../../components/reports/ReportEmptyState.jsx';
import ReportFilters from '../../components/reports/ReportFilters.jsx';
import ReportPageHeader from '../../components/reports/ReportPageHeader.jsx';
import SalesByDayTable from '../../components/reports/SalesByDayTable.jsx';
import { useSalesByDayReport } from '../../hooks/useSalesByDayReport.js';

export default function SalesByDayReportPage() {
  const { report, filters, setFilters, isLoading, error, fetchReport, clearFilters } = useSalesByDayReport();
  const rows = Array.isArray(report) ? report : report?.data || report?.salesByDay || report?.items || [];

  return (
    <div className="grid gap-6">
      <ReportPageHeader title="Ventas por dia" subtitle="Comportamiento diario de ventas e ingresos." />
      <ReportFilters filters={filters} onChange={setFilters} onApply={fetchReport} onClear={clearFilters} error={error} />
      {isLoading ? <div className="soft-card h-64 animate-pulse rounded-[2rem]" /> : null}
      {!isLoading && rows.length ? (
        <>
          <ReportChartCard title="Ingresos diarios" items={rows} valueKey="revenue" labelKey="date" />
          <SalesByDayTable rows={rows} />
        </>
      ) : null}
      {!isLoading && !rows.length ? <ReportEmptyState title="Sin ventas por dia" /> : null}
    </div>
  );
}
