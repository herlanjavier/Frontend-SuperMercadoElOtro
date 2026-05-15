import { Eye, EyeOff, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../../common/Button.jsx';
import Input from '../../common/Input.jsx';

const initialForm = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  ci: '',
  phone: '',
  address: '',
  addressReference: '',
  isActive: true,
};

const getField = (user, camel, snake = camel) => user?.[camel] ?? user?.[snake] ?? '';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function SalesManagerForm({ user, mode = 'create', isSaving, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const editing = mode === 'edit';

  useEffect(() => {
    if (!user || !editing) return;
    setForm({
      email: user.email || '',
      password: '',
      firstName: getField(user, 'firstName', 'first_name'),
      lastName: getField(user, 'lastName', 'last_name'),
      ci: user.ci || '',
      phone: user.phone || '',
      address: user.address || '',
      addressReference: getField(user, 'addressReference', 'address_reference'),
      isActive: (user.isActive ?? user.is_active) !== false,
    });
  }, [editing, user]);

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!editing && !validateEmail(form.email)) nextErrors.email = 'Ingresa un correo valido.';
    if (!editing && form.password.length < 8) nextErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
    if (!form.firstName.trim()) nextErrors.firstName = 'El nombre es requerido.';
    if (!form.lastName.trim()) nextErrors.lastName = 'El apellido es requerido.';
    if (!form.ci.trim()) nextErrors.ci = 'El CI es requerido.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      ci: form.ci.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      addressReference: form.addressReference.trim(),
    };

    if (editing) {
      payload.isActive = form.isActive;
    } else {
      payload.email = form.email.trim();
      payload.password = form.password;
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="soft-card grid gap-5 rounded-[2rem] p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {!editing ? (
          <>
            <Input label="Correo" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} error={errors.email} />
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-700">Contraseña</span>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  className={`h-12 w-full rounded-2xl border bg-white/90 px-4 pr-12 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-700/10 ${errors.password ? 'border-red-300' : 'border-slate-200'}`}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-xl text-slate-500 hover:bg-green-50 hover:text-green-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password ? <span className="mt-1 block text-xs font-medium text-red-600">{errors.password}</span> : null}
            </label>
          </>
        ) : null}

        <Input label="Nombre" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} error={errors.firstName} />
        <Input label="Apellido" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} error={errors.lastName} />
        <Input label="CI" value={form.ci} onChange={(e) => update('ci', e.target.value)} error={errors.ci} />
        <Input label="Telefono" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
        <Input label="Direccion" value={form.address} onChange={(e) => update('address', e.target.value)} />
        <Input label="Referencia" value={form.addressReference} onChange={(e) => update('addressReference', e.target.value)} />
      </div>

      {editing ? (
        <label className="flex min-h-12 items-center gap-3 rounded-2xl bg-slate-50 px-4 text-sm font-bold text-slate-700">
          <input type="checkbox" checked={form.isActive} onChange={(e) => update('isActive', e.target.checked)} />
          Usuario activo
        </label>
      ) : (
        <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-800">
          Este formulario crea exclusivamente usuarios con rol Encargado de ventas.
        </div>
      )}

      <Button type="submit" icon={Save} isLoading={isSaving} className="w-full sm:w-auto sm:justify-self-start">
        {editing ? 'Guardar cambios' : 'Crear encargado'}
      </Button>
    </form>
  );
}
