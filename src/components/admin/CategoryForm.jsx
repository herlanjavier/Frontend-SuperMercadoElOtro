import { useEffect, useState } from 'react';
import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';

export default function CategoryForm({ category, isSaving, onSubmit, onCancel }) {
  const [form, setForm] = useState({ name: '', description: '', isActive: true });
  const [error, setError] = useState('');

  useEffect(() => {
    setForm({
      name: category?.name || '',
      description: category?.description || '',
      isActive: category?.isActive ?? category?.is_active ?? true,
    });
  }, [category]);

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setError('El nombre es requerido.');
      return;
    }
    onSubmit(form);
    setForm({ name: '', description: '', isActive: true });
  };

  return (
    <form onSubmit={submit} className="soft-card grid gap-4 rounded-[1.75rem] p-5">
      <Input label="Nombre" value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setError(''); }} error={error} />
      <Input label="Descripcion" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      {category ? (
        <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
          Categoria activa
        </label>
      ) : null}
      <div className="flex gap-2">
        <Button type="submit" isLoading={isSaving}>{category ? 'Guardar cambios' : 'Crear categoria'}</Button>
        {onCancel ? <Button variant="ghost" onClick={onCancel}>Cancelar</Button> : null}
      </div>
    </form>
  );
}
