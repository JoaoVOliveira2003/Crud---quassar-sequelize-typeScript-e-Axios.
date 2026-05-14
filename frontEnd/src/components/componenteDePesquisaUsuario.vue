<template>
  <div class="pesquisa-card">
  <h6 class="q-mt-none q-mb-sm">Pesquisar usuário</h6>   
  <div class="row q-col-gutter-md">     
      <div class="col-12 col-md-6">
        <q-input filled v-model="formularioPesquisa.nome" placeholder="Buscar por nome..." clearable hide-bottom-space>
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>       
      </div>
      <div class="col-12 col-md-6">
        <selectTipoUsuario v-model="formularioPesquisa.tipoUsuario" />
      </div>
    </div>
    <q-separator class="q-my-md" />
    <div class="row justify-end q-gutter-sm">
      <q-btn label="Limpar" icon="clear" flat unelevated @click="resetar" />
      <q-btn label="Pesquisar" icon="search" color="primary" unelevated @click="pesquisar" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import selectTipoUsuario from './selectTipoUsuario.vue'

const emit = defineEmits<{ pesquisar: [payload: typeof formularioPesquisa] }>()

const estadoInicial = {
  nome: '' as string,
  tipoUsuario: null as number | null,
}

const formularioPesquisa = reactive({ ...estadoInicial })

function pesquisar() {
  emit('pesquisar', { ...formularioPesquisa })
}

function resetar() {
  Object.assign(formularioPesquisa, estadoInicial)
  pesquisar()
}
</script>