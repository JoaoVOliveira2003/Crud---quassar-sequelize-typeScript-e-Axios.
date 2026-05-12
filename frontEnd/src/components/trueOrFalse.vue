<template>
  <div class="row no-wrap q-gutter-sm" >

    <q-btn
      square
      size="sm"
      :color="valorInterno === true ? 'positive' : 'grey-4'"
      :text-color="valorInterno === true ? 'white' : 'dark'"
      @click="toggle(true)"
    >
      ✔
    </q-btn>

    <q-btn
      square
      size="sm"
      :color="valorInterno === false ? 'negative' : 'grey-4'"
      :text-color="valorInterno === false ? 'white' : 'dark'"
      @click="toggle(false)"
    >
      ✖
    </q-btn>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean | null  
  permitirNulo?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean | null]  
  'atualizarFinalizada': [value: boolean | null]
}>()

const valorInterno = ref<boolean | null>(props.modelValue ?? false)

function toggle(valor: boolean) {
  if (valorInterno.value === valor && props.permitirNulo !== false) {
    valorInterno.value = null
  } else {
    valorInterno.value = valor
  }
}


watch(() => props.modelValue, (novo) => {
  valorInterno.value = novo
})

watch(valorInterno, (novo) => {
  emit('update:modelValue', novo)
  emit('atualizarFinalizada', novo)
})
</script>