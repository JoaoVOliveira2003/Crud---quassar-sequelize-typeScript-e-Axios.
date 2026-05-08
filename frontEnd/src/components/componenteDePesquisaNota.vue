<template>
   <div class="pesquisa-card">
      <div class="row q-col-gutter-md">
         <div class="col-12 col-md-6">
            <p class="field-label">Usuário</p>
            <selectNomeIdUsuario v-model="formularioPesquisa.id_usuario" />
         </div>

         <div class="col-12 col-md-6">
            <p class="field-label">Nota</p>
            <q-input filled dense v-model="formularioPesquisa.desc_nota" placeholder="Buscar por descrição..." clearable
               hide-bottom-space>
               <template #prepend>
                  <q-icon name="search" />
               </template>
            </q-input>
         </div>

         <div class="col-12 col-md-6">
            <p class="field-label">Farol</p>
            <farolComponente v-model="formularioPesquisa.id_tipo_nota" :mostrar-limpar="true" />
         </div>

         <div class="col-12 col-md-6">
            <p class="field-label">Status</p>
            <TrueOrFalse v-model="formularioPesquisa.finalizada_nota" :permitir-nulo="true" />
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
import farolComponente from '../components/farolComponente.vue'
import TrueOrFalse from '../components/trueOrFalse.vue'
import selectNomeIdUsuario from '../components/selectNomeIdUsuario.vue'

const emit = defineEmits<{ pesquisar: [payload: typeof formularioPesquisa] }>()

const estadoInicial = {
   desc_nota: '' as string,
   finalizada_nota: null as boolean | null,
   id_tipo_nota: null as number | null,
   id_nota: null as number | null,
   id_usuario: null as number | null,
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
