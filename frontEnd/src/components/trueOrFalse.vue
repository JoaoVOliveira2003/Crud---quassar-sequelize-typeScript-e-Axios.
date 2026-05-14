<template>
  <div class="row no-wrap q-gutter-sm">

    <q-btn square size="sm" :color="valorInterno === true ? 'positive' : 'grey-4'"
      :text-color="valorInterno === true ? 'white' : 'dark'" @click="alterar(true)">
      ✔
    </q-btn>

    <q-btn square size="sm" :color="valorInterno === false ? 'negative' : 'grey-4'"
      :text-color="valorInterno === false ? 'white' : 'dark'" @click="alterar(false)">
      ✖
    </q-btn>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  modelValue: boolean | null
  permitirNulo?: boolean
  iniciarNegativo?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean | null]
  'atualizarFinalizada': [value: boolean | null]
}>()

function valorInicial(): boolean | null {
  if (props.modelValue !== undefined && props.modelValue !== null) return props.modelValue
  if (props.iniciarNegativo) return false
  return null
}

const valorInterno = ref<boolean | null>(valorInicial())
const montado = ref(false)

function alterar(valor: boolean) {
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

  if (montado.value) {
    emit('atualizarFinalizada', novo)
  }
}, { immediate: true })  

onMounted(() => {
  montado.value = true
})
</script>