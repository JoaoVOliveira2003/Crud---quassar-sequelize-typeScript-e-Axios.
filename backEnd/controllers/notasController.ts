import { Request, Response } from "express";
import { getTodasNotas } from "../services/notas-get-service";
import { salvarNota } from "../services/nota-salvar-service";
import { deletarNotaService } from "../services/nota-deletar-service"
import { atualizarNotaService } from "../services/nota-atualizar-service"
import { getTodasNotasFiltradas } from "../services/nota-get-filtrado-service";
import { formularioPesquisaNotaInterface  } from "../interfaces/formularioPesquisaNotaInterface";


export namespace notasController {

   export async function getNotas(_req: Request, res: Response) {
      try {         
         const notas = await getTodasNotas();
         res.json(notas);
      } catch (error: any) {
         console.log(error);
         res.status(500).json({ erro: error.message }); ''
      }
   }

   export async function gravarNota(req: Request, res: Response) {
      try {
         let dadosNota = req.body.nota;
         const retorno = await salvarNota(dadosNota);
         res.json(retorno);
      } catch (error: any) {
         console.log(error);
         res.status(500).json({ erro: error.message }); ''
      }
   }

   export async function deletarNota(req: Request, res: Response) {
      try {
         const id = Number(req.params.id);
         const retorno = await deletarNotaService(id);
         res.json(retorno);
      } catch (error: any) {
         console.error(error);
         res.status(500).json({
            erro: "Erro ao deletar nota",
            detalhes: error.message,
         });
      }
   }

   export async function atualizarNota(req: Request, res: Response) {
      try {
         const id = Number(req.params.id);
         const nota = req.body;

         const retorno = await atualizarNotaService(id, nota);
         res.json(retorno);
      } catch (error: any) {
         console.error(error);
         res.status(500).json({
            erro: "Erro ao atualizar usuário e endereço",
            detalhes: error.message,
         });
      }
   }

   export async function getNotaFiltrado(req: Request, res: Response) {
      try {
         const filtros = req.body.filtro as formularioPesquisaNotaInterface;
         const retorno = await getTodasNotasFiltradas(filtros) ;
         res.json(retorno);
      } catch (error: any) {
         console.error(error);
         res.status(500).json({
            erro: "Erro trazer notas filtradas",
            detalhes: error.message,
         });
      }
   }

}