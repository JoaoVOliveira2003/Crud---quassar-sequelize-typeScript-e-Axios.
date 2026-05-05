import { salvarUsuario } from "../../services/usuario-salvar-service.ts";
import { conecta } from "../../config/conecta.ts";

process.env.CRYPTO_SECRET = 'chaveSecreta'

describe("salvarUsuario (integration)", () => {

  const getMockUsuario = () => ({
    nome: "João Silva",
    dataDeNascimento: "1990-01-01",
    peso: 1,
    altura: 1,
    id_tipo_usuario: 1,
    endereco: {
      rua: "Rua A",
      numero: 12,
      cod_cidade: 1,
    },
    login: {
      email: "joao@email.com",
      senha: "senha123",
    },
    criadoPor: 3
  } as any)

  beforeAll(async () => {
    await conecta.authenticate()
    await conecta.sync() // ou force: true se quiser limpar tudo
  })

  afterAll(async () => {
    await conecta.close()
  })

  beforeEach(async () => {

  })

  it("Deve cadastrar usuário, endereço e login com sucesso", async () => {
    const resultado = await salvarUsuario(getMockUsuario())

    expect(resultado).toHaveProperty('id')
    expect(resultado).toHaveProperty('endereco')
    expect(resultado).toHaveProperty('login')

    expect(resultado.endereco.rua).toBe("Rua A")
    expect(resultado.login.email).toBe("joao@email.com")
  })

  it("Deve criptografar a senha antes de salvar", async () => {
    const resultado = await salvarUsuario(getMockUsuario())

    // senha NÃO deve ser a original
    expect(resultado.login.senha).not.toBe("senha123")
  })

  it("Deve lançar erro se validação falhar", async () => {
    const usuarioInvalido = getMockUsuario()
    usuarioInvalido.nome = null

    await expect(salvarUsuario(usuarioInvalido))
      .rejects
      .toThrow()
  })

})