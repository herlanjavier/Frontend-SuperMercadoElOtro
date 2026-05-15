import { formatCurrency } from '../../utils/formatters.js';

export default function ProductPrice({ value, className = '' }) {
  return <p className={`text-lg font-black text-green-800 ${className}`}>{formatCurrency(value)}</p>;
}
