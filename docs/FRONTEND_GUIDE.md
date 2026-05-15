# Guia del Frontend

Frontend de **Supermercado Online El Otro** construido con React, Vite, TailwindCSS, Axios y Zustand.

## Instalacion

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

URL local habitual:

```txt
http://localhost:5173
```

## Variables de entorno

Crear o revisar `.env`:

```env
VITE_API_URL=https://backend-supermercadoelotro.onrender.com/api
VITE_APP_NAME=Supermercado Online El Otro
```

El frontend no usa claves privadas de Supabase.

## Roles y rutas

- `admin`: `/admin`
- `sales_manager`: `/sales`
- `customer`: `/customer`

## Flujo principal

1. El cliente se registra o inicia sesion.
2. El cliente ve catalogo, agrega productos al carrito y crea un pedido.
3. El pedido queda como pendiente de pago.
4. El encargado confirma el pago QR desde `/sales`.
5. El backend descuenta stock, crea la venta y genera recibo.
6. El admin consulta inventario, ventas y reportes desde `/admin`.

## Notas de seguridad

- El frontend se conecta al backend mediante `VITE_API_URL`.
- El frontend nunca debe incluir `SUPABASE_SERVICE_ROLE_KEY`.
- Las operaciones sensibles se hacen en backend.
- Los permisos reales se validan en backend; el frontend solo mejora la experiencia de usuario.
