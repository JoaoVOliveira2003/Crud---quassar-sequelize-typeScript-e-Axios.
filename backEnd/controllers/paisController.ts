import { Request, Response } from "express";
import { getPais } from "../services/pais-service";

//versões antigas usavam module, agora é namespace
export namespace paisController { 
  export async function getPaises(_req: Request, res: Response) {
    const paises = await getPais();
    res.json(paises);
  }
}
