<template>
  <div class="q-pa-md" style="max-width: 1000px; margin: auto;">

    <q-table title="Notas de usuarios" :rows="notas" :columns="colunas" row-key="id_nota">

      <!-- Coluna Finalizada -->
      <template v-slot:body-cell-finalizada="props">
        <q-td align="center">
          <trueOuFalse :valor="props.row.finalizada_nota" />
        </q-td>
      </template>

      <template v-slot:body-cell-prioridade="props">
        <q-td align="center">
          <farolComponente v-model:valor="props.row.id_tipo_nota" />
        </q-td>
      </template>

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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { NotaInterface } from '../../interfaces/notaInterface'
import { carregarNotas } from '../../services/Notas/listarNotas'

import farolComponente from "../components/farolComponente.vue"
import trueOuFalse from "../components/trueOrFalse.vue"
import formularioDadosUsuario from "../components/formularioDadosUsuario.vue"


import type { QTableColumn } from 'quasar'

const notas = ref<NotaInterface[]>([])

onMounted(async () => {
  try {
    notas.value = await carregarNotas()
  } catch (error) {
    console.log(error)
  }
})

const colunas: QTableColumn[] = [
  {
    name: 'id',
    label: 'Id Nota',
    field: 'id_nota',
    sortable: true,
    align: 'left'
  },
  {
    name: 'criador',
    label: 'Criador',
    field: row => row.usuario?.nome ?? 'Sem usuário',
    sortable: true,
    align: 'left'
  },
  {
    name: 'prioridade',
    label: 'Prioridade',
    field: 'id_tipo_nota',
    sortable: true,
    align: 'center'
  },
  {
    name: 'finalizada',
    label: 'Finalizada',
    field: 'finalizada_nota',
    sortable: true,
    align: 'center'
  },
  {
    name: 'acoes',
    label: 'Ações',
    field: () => '',
    align: 'center'
  }
]

function abrirModalEditar(row: NotaInterface) {
  console.log(row)
}

function abrirModalDeletar(row: NotaInterface) {
  console.log(row)
}

function abrirModalAdicionar() {
  usuarioParaEditar.value = null;
  modalAdicionarAberto.value = true;
}
</script>