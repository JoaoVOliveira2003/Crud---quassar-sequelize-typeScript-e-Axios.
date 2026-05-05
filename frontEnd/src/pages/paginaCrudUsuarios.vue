<template>
  <!-- <botaoLogout /> -->
  <div class="q-pa-md" style="max-width: 1000px; margin: auto;">

    <q-dialog v-model="modalAdicionarAberto">
      <q-card style="min-width: 900px">
        <q-card-section>
          <h4 class="flex flex-center q-my-none">
            {{ usuarioParaEditar ? 'Editar usuário' : 'Inserir novo usuário' }}
          </h4>

          <hr />
        </q-card-section>
        <q-card-section>
          <!-- <formularioDadosUsuario @usuarioCriado="atualizarFormulario" /> -->
          <formularioDadosUsuario :usuario="usuarioParaEditar" @usuarioCriado="atualizarFormulario"
            @usuarioEditado="aoEditar" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <componenteDePesquisa @pesquisar="fazerPesquisa" />
    <br>

    <q-table title="Usuários" :rows="usuarios" :columns="colunas" row-key="id">
      <template v-slot:body-cell-acoes="props">
        <q-td align="center">
          <q-btn color="primary" class="q-mr-sm" size="sm" @click="abrirModalEditar(props.row)">
            Editar
          </q-btn>
          <q-btn color="negative" size="sm" @click="abrirModalDeletar(props.row)">
            Deletar
          </q-btn>
        </q-td>
      </template>
    </q-table>


    <ModalDeletar v-model:modeloAberto="modalDeletarAberto" :usuario="usuarioParaDeletar"
      @confirmarDelete="confirmarDelete" />
  </div>

  <q-fab color="blue" icon="add" active-icon="close" direction="up" class="fixed-bottom-right q-mr-xl q-mb-xl">
    <q-fab-action color="blue" icon="add" label="Adicionar" @click="abrirModalAdicionar" label-position="left" />
  </q-fab>

</template>


<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import type { DadosUsuario } from '../../interfaces/usuarioInterface';
import type { formularioPesquisaInterface } from '../../interfaces/formularioPesquisaInterface'

import { ref, onMounted, onUnmounted } from 'vue';
import ModalDeletar from '../components/modalDeletar.vue';
import formularioDadosUsuario from '../components/formularioDadosUsuario.vue';
// import botaoLogout from '../components/botaoLogout.vue';
import componenteDePesquisa from 'src/components/componenteDePesquisa.vue';

import { carregarUsuarios } from '../../services/Usuarios/listarUsuarioService';
import { deletarUsuario } from '../../services/Usuarios/deletarUsuarioService';
import { buscarUsuariosFiltrados } from '../../services/Usuarios/listarUsuarioServiceFiltrados';
import { listarDadosUsuarioLogado } from '../../services/UsuarioLogado/listarDadosUsuarioLogado'

const usuarios = ref<DadosUsuario[]>([]);
const usuarioParaEditar = ref<DadosUsuario | null>(null);
const usuarioParaDeletar = ref<DadosUsuario | null>(null);

const modalDeletarAberto = ref(false);
const modalAdicionarAberto = ref(false);

const colunas: QTableColumn[] = [
  { name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left' },
  { name: 'nome', label: 'Nome', field: 'nome', sortable: true, align: 'left' },
  { name: 'tipoUsuario', label: 'Tipo usuário', field: 'tipoUsuario', format: (val) => val?.desc_tipo_usuario, sortable: true, align: 'left' },
  { name: 'acoes', label: 'Ações', align: 'center', field: () => '' }
];

const valorId_tipo_usuario = ref<number | null>(null);
const valorId = ref<number | null>(null);
const tempoRestante = ref("");

let intervalo: ReturnType<typeof setInterval>;

async function verTempoToken() {
  try {
    const token = await listarDadosUsuarioLogado();

    if (!token) return;

    valorId.value = token.data.id_usuario;
    valorId_tipo_usuario.value = token.data.id_tipo_usuario;
    tempoRestante.value = token.data.tempo_restante + " segundos";

  } catch {
    clearInterval(intervalo);
  }
}

onMounted(async () => {
  try {
    usuarios.value = await carregarUsuarios();

    const token = await listarDadosUsuarioLogado();

    localStorage.setItem('dados_usuario', JSON.stringify({
      id_usuario: token.data.id_usuario,
      id_tipo_usuario: token.data.id_tipo_usuario
    }));

    await verTempoToken();
    intervalo = setInterval(verTempoToken, 1000);

  } catch (error) {
    console.log('Usuário não autenticado' + error);
  }
});

onUnmounted(() => {
  clearInterval(intervalo);
});

async function atualizarFormulario() {
  usuarios.value = await carregarUsuarios();
  modalAdicionarAberto.value = false;
}

async function aoEditar() {
  await atualizarFormulario();
  usuarioParaEditar.value = null;
}


async function confirmarDelete() {
  if (!usuarioParaDeletar.value) return;

  try {
    await deletarUsuario(usuarioParaDeletar.value.id!);
    await atualizarFormulario();
    modalDeletarAberto.value = false;
    alert('Usuário deletado com sucesso');
    usuarioParaDeletar.value = null;
  } catch (error) {
    console.error(error);
    alert('Erro ao deletar usuário');
  }
}

function abrirModalEditar(row: DadosUsuario) {
  usuarioParaEditar.value = row;
  modalAdicionarAberto.value = true;
}

function abrirModalDeletar(row: DadosUsuario) {
  usuarioParaDeletar.value = row;
  modalDeletarAberto.value = true;
}

function abrirModalAdicionar() {
  usuarioParaEditar.value = null;
  modalAdicionarAberto.value = true;
}


async function fazerPesquisa(filtros: formularioPesquisaInterface) {
  usuarios.value = await buscarUsuariosFiltrados(filtros);
}

</script>