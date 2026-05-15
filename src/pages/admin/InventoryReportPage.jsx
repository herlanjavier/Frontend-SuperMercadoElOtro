import { AlertTriangle, Boxes, CircleDollarSign, Package } from 'lucide-react';
import ReportEmptyState from '../../components/reports/ReportEmptyState.jsx';
import ReportFilters from '../../components/reports/ReportFilters.jsx';
import ReportPageHeader from '../../components/reports/ReportPageHeader.jsx';
import ReportSummaryCard from '../../components/reports/ReportSummaryCard.jsx';
import InventoryReportTable, { InventoryEntriesReportList } from '../../components/reports/InventoryReportTable.jsx';
import { useAdminCategories } from '../../hooks/useAdminCategories.js';
import { useInventoryReport } from '../../hooks/useInventoryReport.js';
import { formatCurrency } from '../../utils/formatters.js';

export default function InventoryReportPage() {
  const { report, filters, setFilters, isLoading, isDownloading, error, fetchReport, downloadPdf, clearFilters } = useInventoryReport();
  const { categories } = useAdminCategories({ includeInactive: true });
  const products = report?.products || [];
  const entries = report?.inventoryEntries || report?.inventory_entries || [];
  const summary = report?.summary || {};

  return (
    <div className="grid gap-6">
      <ReportPageHeader title="Reporte de inventario" subtitle="Stock actual, alertas y entradas de productos." onDownload={downloadPdf} isDownloading={isDownloading} />
      <ReportFilters filters={filters} onChange={setFilters} onApply={fetchReport} onClear={clearFilters} error={error}>
        <select value={filters.categoryId} onChange={(e) => setFilters({ categoryId: e.target.value })} className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm">
          <option value="">Todas las categorias</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <select value={filters.stockStatus} onChange={(e) => setFilters({ stockStatus: e.target.value })} className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm">
          <option value="">Todos los estados</option>
          <option value="normal">Normal</option>
          <option value="low">Stock bajo</option>
          <option value="critical">Stock critico</option>
          <option value="out_of_stock">Sin stock</option>
        </select>
        <label className="flex h-12 items-center gap-2 rounded-2xl bg-slate-50 px-4 text-sm font-bold text-slate-700">
          <input type="checkbox" checked={filters.includeInactive} onChange={(e) => setFilters({ includeInactive: e.target.checked })} />
          Incluir inactivos
        </label>
      </ReportFilters>
      {isLoading ? <div className="soft-card h-64 animate-pulse rounded-[2rem]" /> : null}
      {!isLoading && report ? (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <ReportSummaryCard title="Productos" value={summary.totalProducts || 0} icon={Package} />
            <ReportSummaryCard title="Stock total" value={summary.totalCurrentStock || 0} icon={Boxes} tone="blue" />
            <ReportSummaryCard title="Valor" value={formatCurrency(summary.totalInventoryValue)} icon={CircleDollarSign} tone="green" />
            <ReportSummaryCard title="Criticos" value={summary.criticalStockProducts || 0} icon={AlertTriangle} tone="rose" />
            <ReportSummaryCard title="Activos" value={summary.activeProducts || 0} icon={Package} />
            <ReportSummaryCard title="Inactivos" value={summary.inactiveProducts || 0} icon={Package} tone="slate" />
            <ReportSummaryCard title="Sin stock" value={summary.outOfStockProducts || 0} icon={AlertTriangle} tone="rose" />
            <ReportSummaryCard title="Stock bajo" value={summary.lowStockProducts || 0} icon={AlertTriangle} tone="amber" />
          </section>
          {products.length ? <InventoryReportTable products={products} /> : <ReportEmptyState title="Sin productos" />}
          <section className="soft-card rounded-[2rem] p-5">
            <h3 className="text-lg font-black text-green-950">Entradas recientes</h3>
            <div className="mt-4">{entries.length ? <InventoryEntriesReportList entries={entries} /> : <ReportEmptyState title="Sin entradas" />}</div>
          </section>
        </>
      ) : null}
    </div>
  );
}
