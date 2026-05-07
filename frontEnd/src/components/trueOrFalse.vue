<template>
  <div class="row no-wrap q-gutter-sm" style="min-width: 68px;">

    <q-btn
      square
      size="sm"
      :color="valorInterno === true ? 'positive' : 'grey-4'"
      :text-color="valorInterno === true ? 'white' : 'dark'"
      @click="valorInterno = true"
    >
      ✔
    </q-btn>

    <q-btn
      square
      size="sm"
      :color="valorInterno === false ? 'negative' : 'grey-4'"
      :text-color="valorInterno === false ? 'white' : 'dark'"
      @click="valorInterno = false"
    >
      ✖
    </q-btn>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'atualizarFinalizada': [value: boolean]
}>()


const valorInterno = ref(props.modelValue)

watch(() => props.modelValue, (novo) => {
  valorInterno.value = novo
})

watch(valorInterno, (novo) => {
  emit('update:modelValue', novo)
  emit('atualizarFinalizada',novo)

})
</script>