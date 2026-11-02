export interface ComprasModel {
  opcion?: number;
  id?: number;
  IDUsuario?: number;
  total?: number;
  subtotal?: number;
  totalFinal?: number;
  numeroCompra?: string;
  IDCupon?: number;
  descuento?: number;
  estado?: number;
  estadoPago?: number;
  fechaPago?: string;
  usuario?: string;
  pagina?: number;
  registrosPorPagina?: number;
}
