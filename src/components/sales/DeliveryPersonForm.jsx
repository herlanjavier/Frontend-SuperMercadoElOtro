import { useEffect, useState } from 'react';
import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';
import { getDeliveryPersonFromOrder, normalizeDeliveryPayload } from '../../utils/deliveryHelpers.js';

export default function DeliveryPersonForm({ open, order, isSaving, onClose, onSubmit }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', ci: '', vehicleType: '', plate: '', phone: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (order) setForm(getDeliveryPersonFromOrder(order));
  }, [order]);

  if (!open || !order) return null;

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const submit = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = 'El nombre es requerido.';
    if (!form.lastName.trim()) next.lastName = 'El apellido es requerido.';
    setErrors(next);
    if (Object.keys(next).length) return;
    onSubmit(normalizeDeliveryPayload(form));
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-green-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[2rem] bg-white p-6 shadow-2xl">
        <h3 className="text-xl font-black text-green-950">Datos del repartidor</h3>
        <p className="mt-1 text-sm text-slate-600">El repartidor no tendra acceso al sistema. Solo se guardan sus datos para el pedido.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Input label="Nombre" value={form.firstName} onChange={(e) => setField('firstName', e.target.value)} error={errors.firstName} />
          <Input label="Apellido" value={form.lastName} onChange={(e) => setField('lastName', e.target.value)} error={errors.lastName} />
          <Input label="CI" value={form.ci} onChange={(e) => setField('ci', e.target.value)} />
          <Input label="Telefono" value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
          <Input label="Vehiculo" value={form.vehicleType} onChange={(e) => setField('vehicleType', e.target.value)} />
          <Input label="Placa" value={form.plate} onChange={(e) => setField('plate', e.target.value)} />
        </div>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <Button variant="secondary" disabled={isSaving} onClick={onClose}>Cancelar</Button>
          <Button isLoading={isSaving} onClick={submit}>Guardar repartidor</Button>
        </div>
      </div>
    </div>
  );
}
