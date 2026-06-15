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
                  <SelectGenerico
                     :opcoes="listaPaises"
                     rotulo="País"
                     campoDescricao="desc_pais"
                     campoValor="cod_pais"
                     @selecionado="aoSelecionarPais"
                  />

                  <SelectGenerico
                     v-if="listaEstados.length"
                     :opcoes="listaEstados"
                     rotulo="Estado"
                     campoDescricao="desc_estado"
                     campoValor="cod_estado"
                     @selecionado="aoSelecionarEstado"
                  />

                  <SelectGenerico
                     v-if="listaCidades.length"
                     :opcoes="listaCidades"
                     rotulo="Cidade"
                     campoDescricao="desc_cidade"
                     campoValor="cod_cidade"
                     @selecionado="aoSelecionarCidade"
                  />
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

const listaPaises = ref<PaisInterface[]>([])
const listaEstados = ref<EstadoInterface[]>([])
const listaCidades = ref<CidadeInterface[]>([])

onMounted(async () => {
   listaPaises.value = await listarPaises()
})

async function aoSelecionarPais(paisSelecionado: PaisInterface) {
   listaEstados.value = await listarEstadoPorIdPais(paisSelecionado.cod_pais)
   listaCidades.value = []
}

async function aoSelecionarEstado(estadoSelecionado: EstadoInterface) {
   listaCidades.value = await listarCidadePorIdEstado(
      estadoSelecionado.cod_estado
   )
}

function aoSelecionarCidade(cidadeSelecionada: CidadeInterface) {
   console.log(cidadeSelecionada)
}

</script>