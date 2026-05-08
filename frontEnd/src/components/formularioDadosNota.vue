<template>
   <q-card-section>
      <q-form ref="formRef" greedy @submit.prevent="createNotaTodosDados" class="q-gutter-md">

         <selectNomeIdUsuario lazy-rules v-model="formularioPrincipal.usuarioSelecionado" :rules="regras.notas.id_usuario" />

         <q-input filled v-model="formularioPrincipal.desc_nota" label="Texto da nota" placeholder="Texto" clearable
            hide-bottom-space lazy-rules autogrow 
            :rules="regras.notas.desc_nota"
            />
         <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-12 col-md-6">
               <div class="text-subtitle2 text-grey-8 q-mb-sm">
                  Finalizada
               </div>
               <div class="bg-grey-2 rounded-borders q-pa-sm">
                  <TrueOrFalse v-model="formularioPrincipal.finalizada_nota"  :rules="regras.notas.finalizada_nota" />
               </div>
            </div>

            <div class="col-12 col-md-6">
               <div class="text-subtitle2 text-grey-8 q-mb-sm">Nível de prioridade</div>

               <div class="bg-grey-2 rounded-borders q-pa-sm">
                  <farolComponente v-model="formularioPrincipal.id_tipo_nota" :rules="regras.notas.id_tipo_nota" />
               </div>
            </div>
         </div>

         <div class="row justify-end">
            <q-btn color="primary" label="Gravar" type="submit" icon="save" unelevated />
         </div>
         
      </q-form>
   </q-card-section>

</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import farolComponente from '../components/farolComponente.vue';
import TrueOrFalse from '../components/trueOrFalse.vue';
import selectNomeIdUsuario from '../components/selectNomeIdUsuario.vue';
import type { NotaInterface } from '../../interfaces/notaInterface'
import axios from 'axios'
import { atualizarNotaService } from '../../services/Notas/atualizarNota'
import { criarNota } from '../../services/Notas/criarNota'
import { regras } from 'src/utils/validacao/regras'


const emit = defineEmits(['notaCriado', 'notaEditado'])

const props = defineProps<{
   botaoVoltar?: boolean,
   nota?: NotaInterface | null
}>()

function preencherFormulario(nota: NotaInterface) {
   formularioPrincipal.usuarioSelecionado = nota.id_usuario ?? null
   formularioPrincipal.desc_nota = nota.desc_nota ?? ''
   formularioPrincipal.finalizada_nota = nota.finalizada_nota ?? false
   formularioPrincipal.id_tipo_nota = nota.id_tipo_nota ?? null
   formularioPrincipal.id_nota = nota.id_nota ?? null        // ✅
   formularioPrincipal.id_usuario = nota.id_usuario ?? null  // ✅
}

function limparFormularioPrincipal() {
   Object.assign(formularioPrincipal, estadoInicial);
   // if (formularioPrincipal) formularioPrincipal.resetValidation();
}


const formularioPrincipal = reactive({
   usuarioSelecionado: null as number | null,
   desc_nota: '' as string,
   finalizada_nota: false as boolean,
   id_tipo_nota: null as number | null,
   id_nota: null as number | null,
   id_usuario: null as number | null,
})

const estadoInicial = {
   usuarioSelecionado: null,
   desc_nota: '',
   finalizada_nota: null,
   id_tipo_nota: null,
   id_nota: null,
   id_usuario: null,
};


watch(() => props.nota, (usuarioExistente) => {
   if (usuarioExistente) {
      preencherFormulario(usuarioExistente)
   }
   else {
      limparFormularioPrincipal()
   }
}, { immediate: true })

async function createNotaTodosDados() {

   const nota: NotaInterface = {
      desc_nota: formularioPrincipal.desc_nota,
      id_tipo_nota: formularioPrincipal.id_tipo_nota!,
      id_usuario: formularioPrincipal.usuarioSelecionado!,
      finalizada_nota: formularioPrincipal.finalizada_nota,
      ...(formularioPrincipal.id_nota && { id_nota: formularioPrincipal.id_nota }),
   }

   try {
      if (formularioPrincipal.id_nota) {
         try {
            await atualizarNotaService(nota)
            emit('notaEditado', nota)
            alert('Nota atualizada atualizado com sucesso')
         } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401 && error.response?.data?.message === 'Não autorizado') {
               console.warn('401 ignorado ao recarregar lista.')
            } else {
               throw error
            }
         }

      } else {
         const res = await criarNota(nota)
         console.log(res)
         emit('notaCriado', res)
         alert('Nova nota criada: ' + (res.nome || formularioPrincipal.desc_nota))
      }

   } catch (error) {
      alert('Erro ao salvar usuário: ' + error)
   }
}

</script>