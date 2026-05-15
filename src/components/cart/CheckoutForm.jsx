import Input from '../common/Input.jsx';

export default function CheckoutForm({ form, errors, onChange }) {
  return (
    <section className="soft-card rounded-[2rem] p-5">
      <p className="text-sm font-black uppercase tracking-wide text-green-700">Entrega</p>
      <h2 className="mt-1 text-2xl font-black text-green-950">Confirma el destino</h2>
      <div className="mt-5 grid gap-4">
        <Input
          label="Dirección de entrega"
          value={form.deliveryAddress}
          onChange={(event) => onChange('deliveryAddress', event.target.value)}
          error={errors.deliveryAddress}
          placeholder="Zona Central"
        />
        <Input
          label="Referencia"
          value={form.deliveryReference}
          onChange={(event) => onChange('deliveryReference', event.target.value)}
          placeholder="Casa azul cerca del mercado"
        />
      </div>
    </section>
  );
}
