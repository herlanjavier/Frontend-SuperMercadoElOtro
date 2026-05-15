import { useEffect, useState } from 'react';
import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';

const fields = ['firstName', 'lastName', 'ci', 'phone', 'address', 'addressReference'];

export default function ProfileForm({ profile, isSaving, onSubmit }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    ci: '',
    phone: '',
    address: '',
    addressReference: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({
      firstName: profile?.firstName || profile?.first_name || '',
      lastName: profile?.lastName || profile?.last_name || '',
      ci: profile?.ci || '',
      phone: profile?.phone || '',
      address: profile?.address || '',
      addressReference: profile?.addressReference || profile?.address_reference || '',
    });
  }, [profile]);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.firstName.trim()) nextErrors.firstName = 'El nombre es requerido.';
    if (!form.lastName.trim()) nextErrors.lastName = 'El apellido es requerido.';
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    await onSubmit(
      Object.fromEntries(fields.map((field) => [field, typeof form[field] === 'string' ? form[field].trim() : form[field]])),
    );
  };

  return (
    <form onSubmit={handleSubmit} className="soft-card grid gap-4 rounded-[2rem] p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Nombre" value={form.firstName} onChange={handleChange('firstName')} error={errors.firstName} />
        <Input label="Apellido" value={form.lastName} onChange={handleChange('lastName')} error={errors.lastName} />
        <Input label="CI" value={form.ci} onChange={handleChange('ci')} />
        <Input label="Telefono" value={form.phone} onChange={handleChange('phone')} />
        <Input label="Direccion" value={form.address} onChange={handleChange('address')} className="sm:col-span-2" />
        <Input
          label="Referencia de direccion"
          value={form.addressReference}
          onChange={handleChange('addressReference')}
          className="sm:col-span-2"
        />
      </div>
      <Button type="submit" isLoading={isSaving} className="w-full sm:w-auto sm:justify-self-start">
        Guardar cambios
      </Button>
    </form>
  );
}
