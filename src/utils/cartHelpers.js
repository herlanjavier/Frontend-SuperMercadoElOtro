export const calculateItemSubtotal = (item) => Number(item.price || 0) * Number(item.quantity || 0);

export const calculateCartTotal = (items) => items.reduce((total, item) => total + calculateItemSubtotal(item), 0);

export const calculateCartItemsCount = (items) => items.reduce((total, item) => total + Number(item.quantity || 0), 0);

export const normalizeCartProduct = (product) => ({
  id: product.id,
  productId: product.id,
  name: product.name,
  imageUrl: product.imageUrl || product.image_url || '',
  categoryName: product.category?.name || 'Sin categoría',
  price: Number(product.price || 0),
  stock: Number(product.stock || 0),
  quantity: 1,
  stockStatus: product.stockStatus,
  isActive: product.isActive !== false,
});

export const canAddProduct = (product, currentQuantity = 0) => {
  if (!product || product.isActive === false) return { ok: false, message: 'Producto no disponible.' };
  if (Number(product.stock || 0) <= 0) return { ok: false, message: 'Producto sin stock disponible.' };
  if (currentQuantity >= Number(product.stock || 0)) {
    return { ok: false, message: 'No puedes agregar más unidades de las disponibles.' };
  }
  return { ok: true };
};

export const validateCartBeforeCheckout = (items) => {
  if (!items.length) return { ok: false, message: 'Tu carrito está vacío.' };
  const invalidItem = items.find((item) => item.quantity > item.stock || item.stock <= 0);
  if (invalidItem) return { ok: false, message: `El producto ${invalidItem.name} ya no tiene stock suficiente.` };
  return { ok: true };
};
