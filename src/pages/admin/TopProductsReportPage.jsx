import ReportChartCard from '../../components/reports/ReportChartCard.jsx';
import ReportEmptyState from '../../components/reports/ReportEmptyState.jsx';
import ReportFilters from '../../components/reports/ReportFilters.jsx';
import ReportPageHeader from '../../components/reports/ReportPageHeader.jsx';
import TopProductsTable from '../../components/reports/TopProductsTable.jsx';
import Input from '../../components/common/Input.jsx';
import { useTopProductsReport } from '../../hooks/useTopProductsReport.js';

export default function TopProductsReportPage() {
  const { report, filters, setFilters, isLoading, error, fetchReport, clearFilters } = useTopProductsReport();
  const products = Array.isArray(report) ? report : report?.data || report?.products || [];

  return (
    <div className="grid gap-6">
      <ReportPageHeader title="Productos mas vendidos" subtitle="Ranking de productos por cantidad e ingresos." />
      <ReportFilters filters={filters} onChange={setFilters} onApply={fetchReport} onClear={clearFilters} error={error}>
        <Input label="Limite" type="number" min="1" max="50" value={filters.limit} onChange={(e) => setFilters({ limit: e.target.value })} />
      </ReportFilters>
      {isLoading ? <div className="soft-card h-64 animate-pulse rounded-[2rem]" /> : null}
      {!isLoading && products.length ? (
        <>
          <ReportChartCard title="Ingresos por producto" items={products} valueKey="totalRevenue" labelKey="productName" />
          <TopProductsTable products={products} />
        </>
      ) : null}
      {!isLoading && !products.length ? <ReportEmptyState title="Sin productos vendidos" /> : null}
    </div>
  );
}
