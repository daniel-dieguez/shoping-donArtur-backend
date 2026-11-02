export interface CompraDetalleModel {
  opcion?: number;
  id?: number;
  IDCompra?: number;
  IDProducto?: number;
  IDVariante?: number;
  cantidad?: number;
  costoUnitario?: number;
  subtotal?: number;
  pagina?: number;
  registrosPorPagina?: number;
}
