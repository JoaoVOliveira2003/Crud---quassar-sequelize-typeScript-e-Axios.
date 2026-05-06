import { Request, Response } from "express";
import { getTodosTiposNota } from "../services/tipoNota-get-service";

export namespace tipoNotaController {

  export async function getTiposNota(_req: Request, res: Response) {
    try {
      const tipoNota = await getTodosTiposNota();
      res.json(tipoNota);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ erro: error.message });
    }
  }

}
