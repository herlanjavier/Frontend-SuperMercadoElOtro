import { getStockStatusClass, getStockStatusLabel } from '../../utils/productHelpers.js';

export default function ProductStockBadge({ status, stock, compact = false }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-black ring-1 ${getStockStatusClass(status)}`}
    >
      {getStockStatusLabel(status)}
      {!compact && status !== 'out_of_stock' ? ` · ${stock} disp.` : ''}
    </span>
  );
}
