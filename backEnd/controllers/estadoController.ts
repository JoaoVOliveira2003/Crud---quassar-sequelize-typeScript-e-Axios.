import { Request, Response } from "express";
import { getEstado } from "../services/estado-service";
import { getEstadoPorIdPais } from "../services/estado-por-idPais-service" 

//versões antigas usavam module, agora é namespace
export namespace estadoController {
  
  export async function getEstados(_req: Request, res: Response) {
    const cidades = await getEstado();
    res.json(cidades);
  }

  export async function getEstadosPorIdPais(req: Request, res: Response) {
    const id = Number(req.params.id);
    const cidades = await getEstadoPorIdPais(id); 
    res.json(cidades);
  }
}
