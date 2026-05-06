<template>
  <div class="q-pa-md" style="max-width: 1000px; margin: auto;">

    <q-dialog v-model="modalAdicionarAberto">
      <q-card style="min-width: 900px">
        <q-card-section>
          <h4 class="flex flex-center q-my-none">
            Inserir nova nota
          </h4>
          <hr />
        </q-card-section>

        <q-card-section>
<formularioDadosNota :nota="notaParaEditar" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-table title="Notas" :rows="notas" :columns="colunas" row-key="id_nota">

      <!-- Finalizada -->
      <template v-slot:body-cell-finalizada="props">
        <q-td align="center">
          <TrueOrFalse :valor="props.row.finalizada_nota" />
        </q-td>
      </template>

      <!-- Prioridade -->
      <template v-slot:body-cell-prioridade="props">
        <q-td align="center">
          <farolComponente :valor="props.row.id_tipo_nota" @update:valor="val => props.row.id_tipo_nota = val" />
        </q-td>
      </template>

      <!-- Ações -->
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

    <q-fab color="blue" icon="add" active-icon="close" direction="up" class="fixed-bottom-right q-mr-xl q-mb-xl">
      <q-fab-action color="blue" icon="add" label="Adicionar" @click="abrirModalAdicionar" label-position="left" />
    </q-fab>
  </div>

  <ModalDeletar v-model:modeloAberto="modalDeletarAberto" :nome="notaParaDeletar?.usuario.nome ?? null"
    @confirmarDelete="confirmarDelete" />


</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { NotaInterface } from '../../interfaces/notaInterface'
import { carregarNotas } from '../../services/Notas/listarNotas'
import { deletarNota } from '../../services/Notas/deletarNota'

import ModalDeletar from '../components/modalDeletar.vue';

import farolComponente from "../components/farolComponente.vue"
import TrueOrFalse from "../components/trueOrFalse.vue"
import formularioDadosNota from "../components/formularioDadosNota.vue"



import type { QTableColumn } from 'quasar'

const modalDeletarAberto = ref(false);
const modalAdicionarAberto = ref(false);

const notas = ref<NotaInterface[]>([])
const notaParaEditar = ref<NotaInterface | null>(null)
const notaParaDeletar = ref<NotaInterface | null>(null);

onMounted(async () => {
  try {
    notas.value = await carregarNotas()
  } catch (error) {
    console.log(error)
  }
})

const colunas: QTableColumn[] = [
  { name: 'id', label: 'Id Nota', field: 'id_nota', sortable: true, align: 'left' },
  { name: 'criador', label: 'Criador', field: row => row.usuario?.nome ?? 'Sem usuário', sortable: true, align: 'left' },
  { name: 'desc_nota', label: 'Nota', field: 'desc_nota', sortable: true, align: 'left' },
  { name: 'prioridade', label: 'Prioridade', field: 'id_tipo_nota', sortable: true, align: 'center' },
  { name: 'finalizada', label: 'Finalizada', field: 'finalizada_nota', sortable: true, align: 'center' },
  { name: 'acoes', label: 'Ações', field: () => '', align: 'center' }
]

function abrirModalEditar(row: NotaInterface) {
  notaParaEditar.value = row
  modalAdicionarAberto.value = true
}

function abrirModalDeletar(row: NotaInterface) {
  notaParaDeletar.value = row;
  modalDeletarAberto.value = true;
}

async function atualizarFormulario() {
  notas.value = await carregarNotas();
  modalAdicionarAberto.value = false;
}

async function confirmarDelete() {
  if (!notaParaDeletar.value) return;

  try {
    await deletarNota(notaParaDeletar.value.id_nota!);
    await atualizarFormulario();
    modalDeletarAberto.value = false;
    alert('nota deletado com sucesso');
    notaParaDeletar.value = null;
  } catch (error) {
    console.error(error);
    alert('Erro ao deletar usuário');
  }
}

function abrirModalAdicionar() {
  notaParaEditar.value = null
  modalAdicionarAberto.value = true
}
</script>