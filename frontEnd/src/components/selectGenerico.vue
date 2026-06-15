<template>
   <q-select
      v-model="valorSelecionado"
      :options="opcoes"
      :option-label="campoDescricao"
      :option-value="campoValor"
      emit-value
      map-options
      outlined
      :label="rotulo"
      @update:model-value="aoSelecionar"
   />
</template>

emit-value: faz o v-model armazenar apenas o valor definido em option-value (ex: id).
map-options: encontra o objeto correspondente ao valor armazenado para exibir o texto correto.
outlined: adiciona uma borda ao campo (apenas visual).

<script setup lang="ts">
import { ref } from 'vue'

// basicamente esta falando que vai ter uma chave string e um valor sting ou number
interface ItemOpcao {
   [chave: string]: string | number
}

const props = defineProps({
   opcoes: {
      // Essa prop é um Array e os elementos desse array são do tipo ItemOpcao
      type: Array as () => ItemOpcao[],
      required: true
   },
   rotulo: {
      type: String,
      default: 'Selecione'
   },
   campoDescricao: {
      type: String,
      default: 'nome'
   },
   campoValor: {
      type: String,
      default: 'id'
   }
})

const emitir = defineEmits(['selecionado'])

const valorSelecionado = ref<string | number | null>(null)

// ao selecionar vai emitir o valor selecionado com esse valor
function aoSelecionar(valor: string | number) {
   const itemSelecionado = props.opcoes.find(
      registro => registro[props.campoValor] === valor
   )

   if (!itemSelecionado) return

   emitir('selecionado', itemSelecionado)
}
</script>