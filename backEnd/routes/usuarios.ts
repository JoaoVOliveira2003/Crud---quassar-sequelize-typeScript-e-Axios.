import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";
import {validarTokenObrigatorioMiddleware,validarTokenNaoObrigatorioMiddleware} from '../middleware/validar-token-middleware'
import { validarBody } from '../middleware/validacao/validacao-middleware';

export const routerUsuarios = Router();

routerUsuarios.get('/usuariosIdNome', async (req,res)=> await usuarioController.getUsuariosIdNome(req,res));
routerUsuarios.get("/filtroUsuarios/", async (req, res) => await usuarioController.getUsuariosFiltrado(req, res));
routerUsuarios.use(validarBody) 
routerUsuarios.post("/criarUsuario/", validarTokenNaoObrigatorioMiddleware ,async (req, res) => await usuarioController.gravarUsuario(req, res));
routerUsuarios.use(validarTokenObrigatorioMiddleware)
routerUsuarios.get("", async (req, res) => await usuarioController.getUsuarios(res));
routerUsuarios.put('/atualizarUsuario/:id',async(req,res)=> await usuarioController.atualizarUsuario(req,res));
routerUsuarios.delete("/deletarUsuario/:id",async (req,res)=> await usuarioController.deletarUsuario(req,res));
routerUsuarios.get('/perfilCookie', async (req,res)=> await usuarioController.perfilCookie(req,res));
routerUsuarios.get('/countTiposUsuario', async (req,res)=> await usuarioController.getCountTipoUsuario(res))

export default routerUsuarios;