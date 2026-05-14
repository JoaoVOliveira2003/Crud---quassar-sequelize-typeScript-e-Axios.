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
                    <InputSenha v-model="formulario.senha" label="Senha" :rules="regras.login.senha"/>
                    <q-btn label="Entrar" color="primary" class="full-width q-mt-md" type="submit"  />
                    <div class="text-center q-mt-md">
                        <router-link to="/cadastro">Não possuo conta</router-link>
                    </div>

                </q-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { loginInterface } from '../../interfaces/loginInterface'
import { regras } from '../utils/validacao/regras'
import { login } from '../../services/Login/realizarLogin'
import { useRouter } from 'vue-router'
const router = useRouter()
import axios from 'axios';
import InputSenha from '../components/inputSenha.vue'

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