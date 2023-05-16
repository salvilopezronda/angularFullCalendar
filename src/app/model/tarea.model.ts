export class Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  estado: number;
  tipologia: number;
  fecha: string
  constructor(data?: any) {
    this.id = (data && data.id) || null;
    this.titulo = (data && data.titulo) || null;
    this.descripcion = (data && data.descripcion) || null;
    this.estado = (data && data.estado) || null;
    this.tipologia = (data && data.tipologia) || null;
    this.fecha = (data && data.fecha) ||null;
  }
  public toService() {
    const obj: any = new Object();
    obj.id = this.id;
    obj.fecha =this.fecha;
    obj.titulo = this.titulo;
    obj.descripcion = this.descripcion;
    obj.estado = this.estado;
    obj.tipologia = this.tipologia;
  }
}
