<template>
   <q-page class="q-pa-lg">

      <div class="row justify-center">
         <div class="col-12 col-md-6">

            <q-card>
               <q-card-section>
                  <div class="text-h6">
                     Seleção de País, Estado e Cidade
                  </div>
               </q-card-section>

               <q-card-section class="column q-gutter-md">

                  <SelectGenerico :options="paises" label="País" campoDescricao="desc_pais" campoValor="cod_pais"
                     @selecionado="selecionouPais" />

                  <SelectGenerico v-if="estados.length" :options="estados" label="Estado" campoDescricao="desc_estado"
                     campoValor="cod_estado" @selecionado="selecionouEstado" />

                  <SelectGenerico v-if="cidades.length" :options="cidades" label="Cidade" campoDescricao="desc_cidade"
                     campoValor="cod_cidade" @selecionado="selecionouCidade" />

               </q-card-section>
            </q-card>

         </div>
      </div>

   </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import SelectGenerico from 'src/components/selectGenerico.vue'

import { listarPaises } from '../../services/Pais/listarPaisService'
import { listarEstadoPorIdPais } from '../../services/Estados/listarEstadoPorIdPais'
import { listarCidadePorIdEstado } from '../../services/Cidades/listarCidadePorIdEstadoService'

import type { PaisInterface } from '../../interfaces/paisInterface'
import type { EstadoInterface } from '../../interfaces/estadoInterface'
import type { CidadeInterface } from '../../interfaces/cidadeInterface'

const paises = ref<PaisInterface[]>([])
const estados = ref<EstadoInterface[]>([])
const cidades = ref<CidadeInterface[]>([])

onMounted(async () => {
   paises.value = await listarPaises()
})

async function selecionouPais(item: unknown) {
   const pais = item as PaisInterface

   estados.value = await listarEstadoPorIdPais(
      pais.cod_pais
   )

   cidades.value = []
}

async function selecionouEstado(item: unknown) {
   const estado = item as EstadoInterface

   cidades.value = await listarCidadePorIdEstado(
      estado.cod_estado
   )
}

function selecionouCidade(item: unknown) {
   const cidade = item as CidadeInterface

   console.log(cidade)
}
</script>