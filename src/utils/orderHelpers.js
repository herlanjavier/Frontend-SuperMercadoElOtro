export const ORDER_STATUS = {
  PENDING_PAYMENT: 'pending_payment',
  CONFIRMED: 'confirmed',
  READY_FOR_PICKUP: 'ready_for_pickup',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

const statusMeta = {
  [ORDER_STATUS.PENDING_PAYMENT]: {
    label: 'Pendiente de pago',
    color: 'bg-amber-50 text-amber-700 ring-amber-200',
    iconName: 'Clock',
  },
  [ORDER_STATUS.CONFIRMED]: {
    label: 'Confirmado',
    color: 'bg-blue-50 text-blue-700 ring-blue-200',
    iconName: 'CheckCircle',
  },
  [ORDER_STATUS.READY_FOR_PICKUP]: {
    label: 'Listo para recoger',
    color: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    iconName: 'PackageCheck',
  },
  [ORDER_STATUS.DELIVERED]: {
    label: 'Entregado',
    color: 'bg-green-100 text-green-800 ring-green-200',
    iconName: 'Home',
  },
  [ORDER_STATUS.CANCELLED]: {
    label: 'Cancelado',
    color: 'bg-rose-50 text-rose-700 ring-rose-200',
    iconName: 'XCircle',
  },
};

export const getOrderStatusLabel = (status) => statusMeta[status]?.label || 'Estado desconocido';

export const getOrderStatusColor = (status) =>
  statusMeta[status]?.color || 'bg-slate-100 text-slate-600 ring-slate-200';

export const getOrderStatusIconName = (status) => statusMeta[status]?.iconName || 'Clock';

export const canCustomerCancelOrder = (order) => order?.status === ORDER_STATUS.PENDING_PAYMENT;

export const isOrderPaid = (status) =>
  [ORDER_STATUS.CONFIRMED, ORDER_STATUS.READY_FOR_PICKUP, ORDER_STATUS.DELIVERED].includes(status);

export const getOrderShortId = (id) => (id ? `#${String(id).slice(0, 8).toUpperCase()}` : '#PEDIDO');

export const getOrderItemsCount = (order) =>
  (order?.items || order?.orderItems || order?.order_items || []).reduce((total, item) => total + Number(item.quantity || 0), 0);

export const formatOrderDate = (date) => {
  if (!date) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-BO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};
