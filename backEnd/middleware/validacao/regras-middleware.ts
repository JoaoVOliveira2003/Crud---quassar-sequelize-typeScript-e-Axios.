import { regrasUsuario } from './regras/usuarios';
import { regrasEndereco } from './regras/enderecos';
import { regrasLogin } from './regras/login';

export const regras = {
  usuario: regrasUsuario,
  endereco: regrasEndereco,
  login: regrasLogin
};