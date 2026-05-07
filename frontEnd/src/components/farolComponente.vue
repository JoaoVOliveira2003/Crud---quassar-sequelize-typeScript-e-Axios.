<template>
  <div class="relative-position">

    <q-btn round unelevated size="sm" :style="{ backgroundColor: corAtual }">
      <q-popup-proxy transition-show="scale" transition-hide="scale">
        <div class="row q-pa-sm q-gutter-sm bg-white">

          <q-btn v-for="cor in cores" :key="cor.id_tipo_nota!" round size="sm"
            :style="{ backgroundColor: cor.id_hex_Cor! }" @click="selecionarCor(cor.id_tipo_nota!)" />

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
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'atualizar': [value: number]
}>()


const valorInterno = ref(props.modelValue)
const cores = ref<NotaInterface[]>([])

onMounted(async () => {
  cores.value = await carregarTiposNotas()
})

watch(() => props.modelValue, (novo) => {
  valorInterno.value = novo
})

function selecionarCor(id: number) {
  valorInterno.value = id
  emit('update:modelValue', id)
  emit('atualizar', id)
}

const corAtual = computed(() => {
  const tipo = cores.value.find(c => c.id_tipo_nota === valorInterno.value)
  return tipo ? tipo.id_hex_Cor : '#CCCCCC'
})
</script>