<template>
    <div class="row" style="height: 100vh;">
        <div v-if="!$q.screen.xs" class="col-6 bg-grey-2 flex flex-center">
            <img style="" src="../assets/imgs/shallows.png" alt="">
        </div>

        <div :class="$q.screen.xs ? 'col-12 flex flex-center' : 'col-6 flex flex-center'">
            <div style="width: 300px;">
                <h4 class="flex flex-center">Projeto de estudo</h4>
                <q-form filled greedy @submit.prevent="realizarLogin()">
                    <q-input filled class="q-mb-sm" v-model="formulario.email" label="Email" :rules="regras.login.email"/>
                    <InputSenha  v-model="formulario.senha" label="Senha" :rules="regras.login.senha"/>
                    <q-btn label="Entrar" color="primary" class="full-width q-mt-md" type="submit"  />
                    <div class="text-center q-mt-md">
                        <router-link to="/cadastro">Não possuo conta</router-link>
                    </div>

                </q-form>
            </div>
        </div>
    </div>

<q-dialog v-model="mostrarAviso">
  <q-card style="min-width: 300px">

    <q-card-section>
      <div class="text-h6">
        Usuário de demonstração
      </div>
    </q-card-section>

    <q-card-section>

      <q-input
        class="q-mb-md"
        filled
        readonly
        v-model="emailDemo"
        label="Email"
      >
        <template v-slot:append>
          <q-btn
            flat
            round
            icon="content_copy"
            @click="copiarTexto(emailDemo)"
          />
        </template>
      </q-input>

      <q-input
        filled
        readonly
        v-model="senhaDemo"
        label="Senha"
      >
        <template v-slot:append>
          <q-btn
            flat
            round
            icon="content_copy"
            @click="copiarTexto(senhaDemo)"
          />
        </template>
      </q-input>

    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Fechar" v-close-popup />
    </q-card-actions>

  </q-card>
</q-dialog>

</template>

<script setup lang="ts">
import { reactive,onMounted,ref } from 'vue'
import type { loginInterface } from '../../interfaces/loginInterface'
import { regras } from '../utils/validacao/regras'
import { login } from '../../services/Login/realizarLogin'
import { useRouter } from 'vue-router'
const router = useRouter()
import axios from 'axios';
import InputSenha from '../components/inputSenha.vue'

const mostrarAviso = ref(false)
const senhaDemo = ref('senha')

onMounted(() => {
  const avisoJaMostrado = localStorage.getItem('avisoLogin')

  if (!avisoJaMostrado) {
    mostrarAviso.value = true
    localStorage.setItem('avisoLogin', 'true')
  }
})

const emailDemo = ref('senha@gmail.com')

async function copiarTexto(texto: string) {
  await navigator.clipboard.writeText(texto)
}
const formulario = reactive({
    email: '',
    senha: ''
});

async function realizarLogin() {
  const dadosLogin: loginInterface = {
    email: formulario.email,
    senha: formulario.senha
  }

  try {
    await login(dadosLogin);
    router.push('/');
  } catch (error) {
    alert('Erro ao realizarLogin')
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.erro || 'Erro inesperado');
    } else {
      alert('Erro inesperado');
    }
  }
}
</script>