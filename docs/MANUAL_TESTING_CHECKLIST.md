# Checklist Manual de Pruebas

## Cliente

- [ ] Registrarse como cliente.
- [ ] Iniciar sesion.
- [ ] Ver catalogo.
- [ ] Filtrar productos por categoria.
- [ ] Agregar productos al carrito.
- [ ] Crear pedido.
- [ ] Ver mis pedidos.
- [ ] Ver detalle del pedido.
- [ ] Cancelar pedido pendiente.
- [ ] Ver recibo si el pedido esta confirmado.
- [ ] Descargar recibo si existe venta.
- [ ] Editar perfil.

## Encargado de ventas

- [ ] Iniciar sesion.
- [ ] Ver dashboard de ventas.
- [ ] Ver pedidos.
- [ ] Filtrar pedidos pendientes.
- [ ] Confirmar pago QR.
- [ ] Registrar repartidor.
- [ ] Marcar pedido como listo.
- [ ] Marcar pedido como entregado.
- [ ] Ver venta.
- [ ] Ver recibo.
- [ ] Descargar recibo PDF.

## Admin

- [ ] Iniciar sesion.
- [ ] Ver dashboard admin.
- [ ] Crear producto.
- [ ] Subir imagen de producto.
- [ ] Editar producto.
- [ ] Desactivar/restaurar producto.
- [ ] Crear categoria.
- [ ] Crear proveedor.
- [ ] Asociar productos a proveedor.
- [ ] Registrar entrada de inventario.
- [ ] Ver stock bajo.
- [ ] Ver notificaciones.
- [ ] Marcar notificaciones como leidas.
- [ ] Ver reporte de ventas.
- [ ] Descargar PDF de ventas.
- [ ] Ver reporte de inventario.
- [ ] Descargar PDF de inventario.
- [ ] Ver productos mas vendidos.
- [ ] Ver ventas por dia.

## Permisos

- [ ] Usuario sin sesion no entra a rutas protegidas.
- [ ] Cliente no entra a `/admin`.
- [ ] Cliente no entra a `/sales`.
- [ ] Sales manager no entra a reportes administrativos `/admin/reports`.
- [ ] Admin puede acceder a reportes.
