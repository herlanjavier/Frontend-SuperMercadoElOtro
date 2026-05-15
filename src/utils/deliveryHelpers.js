export const buildDeliveryPersonFullName = (deliveryPerson = {}) =>
  [deliveryPerson.firstName || deliveryPerson.first_name, deliveryPerson.lastName || deliveryPerson.last_name].filter(Boolean).join(' ');

export const hasDeliveryPerson = (order) =>
  Boolean(order?.deliveryPersonFirstName || order?.delivery_person_first_name || order?.deliveryPersonLastName || order?.delivery_person_last_name);

export const getVehicleLabel = (vehicleType) => vehicleType || 'Vehiculo no registrado';

export const normalizeDeliveryPayload = (form) => ({
  firstName: form.firstName?.trim(),
  lastName: form.lastName?.trim(),
  ci: form.ci?.trim() || '',
  vehicleType: form.vehicleType?.trim() || '',
  plate: form.plate?.trim() || '',
  phone: form.phone?.trim() || '',
});

export const getDeliveryPersonFromOrder = (order = {}) => ({
  firstName: order.deliveryPersonFirstName || order.delivery_person_first_name || '',
  lastName: order.deliveryPersonLastName || order.delivery_person_last_name || '',
  ci: order.deliveryPersonCi || order.delivery_person_ci || '',
  vehicleType: order.deliveryPersonVehicleType || order.delivery_person_vehicle_type || '',
  plate: order.deliveryPersonPlate || order.delivery_person_plate || '',
  phone: order.deliveryPersonPhone || order.delivery_person_phone || '',
});
