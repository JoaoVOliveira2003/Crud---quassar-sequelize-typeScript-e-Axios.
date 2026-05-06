<template>
  <q-select class="q-mt-5 q-mb-5" filled :options="usuarios" v-model="internalValue" label="Selecione usuario"
    option-label="nome" option-value="id" emit-value map-options />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { carregarUsuariosIdNome } from '../../services/Usuarios/listarUsuarioIdNome'
import type { tipoUsuarioInterface } from '../../interfaces/tipoUsuarioInterface'

const props = defineProps<{
  modelValue: number | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

const usuarios = ref<tipoUsuarioInterface[]>([])
const internalValue = ref<number | null>(props.modelValue)

watch(() => props.modelValue, (val) => {
  internalValue.value = val
})


watch(internalValue, (val) => {
  emit('update:modelValue', val)
})

onMounted(async () => {
  usuarios.value = await carregarUsuariosIdNome()
})
</script>