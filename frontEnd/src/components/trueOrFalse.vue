<!-- trueOrFalse.vue -->

<template>
  <div class="row q-gutter-sm">

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

const props = defineProps({
  valor: Boolean
})

const valorInterno = ref(props.valor)

watch(() => props.valor, (novo) => {
  valorInterno.value = novo
})
</script>