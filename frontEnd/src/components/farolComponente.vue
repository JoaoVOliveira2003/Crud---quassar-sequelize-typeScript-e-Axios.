<template>
  <div class="relative-position">

    <!-- Bolinha principal -->
    <q-btn
      round
      unelevated
      size="sm"
      :style="{ backgroundColor: corAtual }"
    >
      <q-popup-proxy transition-show="scale" transition-hide="scale">
        <div class="row q-pa-sm q-gutter-sm bg-white">

          <!-- Botões dinâmicos -->
          <q-btn
            v-for="cor in cores"
            :key="cor.id_tipo_nota"
            round
            size="sm"
            :style="{ backgroundColor: cor.id_hex_Cor }"
            @click="selecionarCor(cor.id_tipo_nota)"
          />

        </div>
      </q-popup-proxy>
    </q-btn>

  </div>
</template>

<script setup lang="ts">
import { carregarTiposNotas } from '../../services/TiposNotas/listarTiposNotas'
import { ref, computed, watch, onMounted } from 'vue'
import type { NotaInterface } from "../../interfaces/notaInterface"

const props = defineProps<{
  valor: number | null
}>()

/**
 * Evento custom (opcional, mas importante)
 */
const emit = defineEmits(['update:valor'])
/**
 * Estado interno
 */
const valorInterno = ref(props.valor)
const cores = ref<NotaInterface[]>([])

/**
 * Carregar cores do backend
 */
onMounted(async () => {
  cores.value = await carregarTiposNotas()
})

/**
 * Sincroniza quando o pai muda
 */
watch(() => props.valor, (novo) => {
  valorInterno.value = novo
})

/**
 * Seleção de cor
 */
function selecionarCor(id: number) {
  valorInterno.value = id
  emit('update:valor', id)
}

/**
 * Cor atual (HEX vindo do banco)
 */
const corAtual = computed(() => {
  const tipo = cores.value.find(
    (c) => c.id_tipo_nota === valorInterno.value
  )

  return tipo ? tipo.id_hex_Cor : '#CCCCCC'
})
</script>