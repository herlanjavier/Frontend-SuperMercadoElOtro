import { getOrderItemsCount, getOrderShortId, getOrderStatusColor, getOrderStatusLabel, isOrderPaid } from './orderHelpers.js';

export const getShortOrderId = getOrderShortId;
export const getOrderStatusTone = getOrderStatusColor;
export const getSalesOrderStatusLabel = getOrderStatusLabel;

export const canConfirmPayment = (order) => order?.status === 'pending_payment';
export const canMarkReady = (order) => order?.status === 'confirmed';
export const canMarkDelivered = (order) => order?.status === 'ready_for_pickup';
export const canRegisterDeliveryPerson = (order) => ['confirmed', 'ready_for_pickup'].includes(order?.status);
export const isPaidStatus = isOrderPaid;

export const getPaymentLabel = (status) => (isOrderPaid(status) ? 'Pagado' : status === 'cancelled' ? 'Cancelado' : 'Pendiente');

export const getOrderActionLabel = (status) => {
  const labels = {
    pending_payment: 'Confirmar pago QR',
    confirmed: 'Marcar como listo',
    ready_for_pickup: 'Marcar como entregado',
    delivered: 'Ver recibo',
    cancelled: 'Estado final',
  };
  return labels[status] || 'Ver detalle';
};

export const getSalesOrderItemsCount = getOrderItemsCount;

export const getCustomerName = (orderOrSale) => {
  const customer = orderOrSale?.customer || orderOrSale?.profile || {};
  return [customer.firstName || customer.first_name, customer.lastName || customer.last_name].filter(Boolean).join(' ') || 'Cliente';
};

export const getCustomerPhone = (orderOrSale) => orderOrSale?.customer?.phone || orderOrSale?.profile?.phone || 'Sin telefono';
