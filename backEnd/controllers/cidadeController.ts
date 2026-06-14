import { Request, Response } from "express";
import { getCidades as getCidade } from "../services/cidade-service";
import { getCidadePorIdEstado } from "../services/cidade-por-idEstado.ts" 

//versões antigas usavam module, agora é namespace
export namespace cidadeController {
  
  export async function getCidades(_req: Request, res: Response) {
    const cidades = await getCidade();
    res.json(cidades);
  }

  export async function getCidadesPorIdEstado(req: Request, res: Response) {
    const id = Number(req.params.id);
    const cidades = await getCidadePorIdEstado(id); 
    res.json(cidades);
  }
}
