export interface PagosModel {
  opcion?: number;
  id?: number;
  IDCompra?: number;
  metodoPago?: string;
  monto?: number;
  referencia?: string;
  comprobante?: string;
  estado?: number;
  observacion?: string;
  fechaPago?: string;
  validadoPor?: number;
  usuario?: string;
  pagina?: number;
  registrosPorPagina?: number;
}
