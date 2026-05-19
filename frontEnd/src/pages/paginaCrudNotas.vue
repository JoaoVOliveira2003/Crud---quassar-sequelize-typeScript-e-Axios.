<template>
  <div class="q-pa-lg">
    <componenteDePesquisaNota @pesquisar="fazerPesquisa" />
    <br>

    <q-dialog v-model="modalAdicionarAberto">
      <q-card class="q-pa-lg" style="width: 1000px; max-width: 95vw; max-height: 90vh;">
        <q-card-section>
          <h4 class="flex flex-center q-my-none">
            Inserir nova nota
          </h4>
          <hr />
        </q-card-section>

        <q-card-section class="scroll">
          <formularioDadosNota :nota="notaParaEditar" @notaCriado="atualizarFormulario"
            @notaEditado="atualizarFormulario" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-table title="Notas" :rows="notas" :columns="colunas" row-key="id_nota" :dense="$q.screen.lt.md" wrap-cells>

      <template v-slot:body-cell-id="props">
        <q-td :class="{ 'text-strike': props.row.finalizada_nota }">
          {{ props.row.id_nota }}
        </q-td>
      </template>

      <template v-slot:body-cell-criador="props">
        <q-td :class="{ 'text-strike': props.row.finalizada_nota }">
          {{ props.row.usuario?.nome ?? 'Sem usuário' }}
        </q-td>
      </template>

      <template v-slot:body-cell-titulo_nota="props">
        <q-td style="max-width: 300px;">
          <div :class="{ 'text-strike': props.row.finalizada_nota }" class="ellipsis-2-lines"
            style="white-space: normal; word-break: break-word;">
            {{ props.row.titulo_nota }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-desc_nota="props">
        <q-td style="max-width: 300px;">
          <div :class="{ 'text-strike': props.row.finalizada_nota }" class="ellipsis-2-lines"
            style="white-space: normal; word-break: break-word;">
            {{ props.row.desc_nota }}
            <q-tooltip v-if="props.row.desc_nota?.length > 100">
              {{ props.row.desc_nota }}
            </q-tooltip>
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-finalizada="props">
        <q-td align="center">
          <TrueOrFalse v-model="props.row.finalizada_nota"
            @atualizarFinalizada="(valor: boolean | null) => atualizarFinalizada(props.row, valor ?? false)" />
        </q-td>
      </template>

      <template v-slot:body-cell-prioridade="props">
        <q-td align="center">
          <farolComponente v-model="props.row.id_tipo_nota"
            @atualizar="(id) => atualizarPrioridade(props.row, id ?? 0)" />
        </q-td>
      </template>

      <template v-slot:body-cell-acoes="props">
        <q-td align="center" style="width: 120px;">
          <div class="row no-wrap justify-center items-center q-gutter-xs">
            <q-btn color="primary" icon="edit" size="sm" @click="abrirModalEditar(props.row)" />
            <q-btn icon="delete" color="negative" size="sm" @click="abrirModalDeletar(props.row)" />
          </div>
        </q-td>
      </template>

    </q-table>

    <q-fab color="blue" icon="add" active-icon="close" direction="up" class="fixed-bottom-right q-mb-xl q-mr-xl">
      <q-fab-action color="blue" icon="add" label="Adicionar" @click="abrirModalAdicionar" label-position="left" />
    </q-fab>

  </div>

  <ModalDeletar v-model:modeloAberto="modalDeletarAberto" :nome="notaParaDeletar?.usuario?.nome ?? null" @confirmarDelete="confirmarDelete" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import type { NotaInterface } from '../../interfaces/notaInterface'
import type { formularioPesquisaNotaInterface } from '../../interfaces/formularioPesquisaNotaInterface'
import { carregarNotas } from '../../services/Notas/listarNotasService'
import { buscarNotasFiltrados } from '../../services/Notas/listarNotaServiceFiltradosService'
import { deletarNota } from '../../services/Notas/deletarNotaService'
import { atualizarNotaService } from '../../services/Notas/atualizarNotaService'
import ModalDeletar from '../components/modalDeletar.vue'
import farolComponente from '../components/farolComponente.vue'
import TrueOrFalse from '../components/trueOrFalse.vue'
import formularioDadosNota from '../components/formularioDadosNota.vue'
import componenteDePesquisaNota from 'src/components/componenteDePesquisaNota.vue'

const $q = useQuasar()

import type { QTableColumn } from 'quasar'

const modalDeletarAberto = ref(false)
const modalAdicionarAberto = ref(false)

const notas = ref<NotaInterface[]>([])
const notaParaEditar = ref<NotaInterface | null>(null)
const notaParaDeletar = ref<NotaInterface | null>(null)

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
  { name: 'titulo_nota', label: 'Título', field: 'titulo_nota', sortable: true, align: 'left', },
  // { name: 'desc_nota', label: 'Nota', field: 'desc_nota', sortable: true, align: 'left', style: 'max-width: 300px; white-space: normal; word-break: break-word;' },
  { name: 'prioridade', label: 'Prioridade', field: 'id_tipo_nota', sortable: true, align: 'center' },
  { name: 'finalizada', label: 'Finalizada', field: 'finalizada_nota', sortable: true, align: 'center' },
  { name: 'acoes', label: 'Ações', field: () => '', align: 'center' }
]

function abrirModalEditar(row: NotaInterface) {
  notaParaEditar.value = row
  modalAdicionarAberto.value = true
}

function abrirModalDeletar(row: NotaInterface) {
  notaParaDeletar.value = row
  modalDeletarAberto.value = true
}

async function atualizarFormulario() {
  notas.value = await carregarNotas()
  modalAdicionarAberto.value = false
}

async function confirmarDelete() {
  if (!notaParaDeletar.value) return

  try {
    await deletarNota(notaParaDeletar.value.id_nota!)
    await atualizarFormulario()
    modalDeletarAberto.value = false
    alert('nota deletado com sucesso')
    notaParaDeletar.value = null
  } catch (error) {
    console.error(error)
    alert('Erro ao deletar usuário')
  }
}

function abrirModalAdicionar() {
  notaParaEditar.value = null
  modalAdicionarAberto.value = true
}

async function atualizarPrioridade(row: NotaInterface, id: number) {
  try {
    await atualizarNotaService({ ...row, id_tipo_nota: id })
    $q.notify({ message: 'Prioridade atualizada!', color: 'positive', position: 'bottom', timeout: 2000 })
  } catch {
    $q.notify({ message: 'Erro ao atualizar!', color: 'negative', position: 'bottom', timeout: 2000 })
  }
}

async function atualizarFinalizada(row: NotaInterface, valor: boolean) {
  try {
    await atualizarNotaService({ ...row, finalizada_nota: valor })
    $q.notify({ message: 'Estado atualizado!', color: 'positive', position: 'bottom', timeout: 2000 })
  } catch {
    $q.notify({ message: 'Erro ao atualizar!', color: 'negative', position: 'bottom', timeout: 2000 })
  }
}

async function fazerPesquisa(filtros: formularioPesquisaNotaInterface) {
  notas.value = await buscarNotasFiltrados(filtros)
}
</script>