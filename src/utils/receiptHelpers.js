export const getReceiptTitle = () => 'Recibo / Nota de venta';

export const canDownloadReceipt = (orderStatus) =>
  ['confirmed', 'ready_for_pickup', 'delivered'].includes(orderStatus);

export const buildReceiptFileName = (receipt) => {
  const number = receipt?.receiptNumber || receipt?.receipt_number || receipt?.id || 'recibo';
  return `receipt-${String(number).replaceAll('/', '-')}.pdf`;
};
