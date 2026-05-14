<template>
  <div class="relative-position">
    <q-btn round unelevated size="sm" :style="{ backgroundColor: corAtual }">
      <q-popup-proxy transition-show="scale" transition-hide="scale">
        <div class="row q-pa-sm q-gutter-sm bg-white">
          <q-btn v-for="cor in cores" :key="cor.id_tipo_nota!" round size="sm" :style="{ backgroundColor: cor.id_hex_Cor! }" @click="selecionarCor(cor.id_tipo_nota!)" />
         <q-btn round size="sm" v-if="props.mostrarLimpar !== false" icon="close" color="grey-4" text-color="dark" @click="selecionarCor(null)" />
        </div>
      </q-popup-proxy>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { carregarTiposNotas } from '../../services/TiposNotas/listarTiposNotas'
import type { NotaInterface } from "../../interfaces/notaInterface"

const props = defineProps<{
  modelValue: number | null
  mostrarLimpar?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
  'atualizar': [value: number | null]
}>()

function valorInicial(): number | null {
  if (props.modelValue !== undefined && props.modelValue !== null) return props.modelValue
  if (props.mostrarLimpar) return null
  return 2
}

const valorInterno = ref<number | null>(valorInicial())
const cores = ref<NotaInterface[]>([])
const montado = ref(false)

onMounted(async () => {
  cores.value = await carregarTiposNotas()
  montado.value = true
})

watch(() => props.modelValue, (novo) => {
  valorInterno.value = novo ?? (props.mostrarLimpar ? null : 2)
})

watch(valorInterno, (novo) => {
  emit('update:modelValue', novo)

  if (montado.value) {
    emit('atualizar', novo)
  }
}, { immediate: true }) 

function selecionarCor(id: number | null) {
  valorInterno.value = id ?? (props.mostrarLimpar ? null : 2)
}

const corAtual = computed(() => {
  const tipo = cores.value.find(c => c.id_tipo_nota === valorInterno.value)
  return tipo ? tipo.id_hex_Cor : '#CCCCCC'
})
</script>