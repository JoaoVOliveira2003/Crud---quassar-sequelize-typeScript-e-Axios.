import { conecta } from '../../config/conecta'
import { getTodosTiposUsuario } from '../../services/tipoUsuario-get-service'
import '../../app'

describe("Retornar tipos de usuarios", () => {
    afterAll(async () => {
        await conecta.close()
    });

    it('deve retornar todos tipos de usuario', async () => {
        const resultado = await getTodosTiposUsuario();
        expect(resultado.length).toBeGreaterThan(0)
    })

    it('Deve retornar objetos de tipo.', async () => {
        const resultado = await getTodosTiposUsuario();
        expect(resultado[0]).toHaveProperty('id_tipo_usuario');
        expect(resultado[0]).toHaveProperty('desc_tipo_usuario');
        expect(resultado[0]).toHaveProperty('createdAt');
        expect(resultado[0]).toHaveProperty('updatedAt');
    });

    it('Deve lançar erro se o banco falhar', async () => {
        await conecta.close()
        await expect(getTodosTiposUsuario()).rejects.toThrow()
    })
})