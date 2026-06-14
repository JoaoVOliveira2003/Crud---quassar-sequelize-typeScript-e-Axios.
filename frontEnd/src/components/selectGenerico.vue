<template>
   <q-select v-model="valorSelecionado" :options="options" :option-label="campoDescricao" :option-value="campoValor"
      emit-value map-options outlined :label="label" @update:model-value="onChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface OptionItem {
   [key: string]: string | number
}

const props = defineProps({
   options: {
      type: Array as () => OptionItem[],
      required: true
   },

   label: {
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

const emit = defineEmits(['selecionado'])

const valorSelecionado = ref<string | number | null>(null)

function onChange(valor: string | number) {
   const item = props.options.find(
      registro => registro[props.campoValor] === valor
   )

   if (!item) return

   emit('selecionado', item)
}
</script>