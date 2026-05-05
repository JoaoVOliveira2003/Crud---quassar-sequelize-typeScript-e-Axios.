<template>
  <q-form ref="formRef" greedy @submit.prevent="createUsuarioTodosDados">

    <q-input filled v-model="formularioPrincipal.nome" label="Nome" class="bordered q-mb-sm"
      placeholder="Digite seu nome" clearable hide-bottom-space lazy-rules :rules="regras.usuario.nome" />

    <q-input lazy-rules filled v-model="formularioPrincipal.dataDeNascimento" label="Data de Nascimento" type="date"
      class="bordered q-mb-sm" clearable hide-bottom-space :rules="regras.usuario.dataDeNascimento" />

    <div class="row q-gutter-sm">
      <div class="col">
        <q-input lazy-rules filled v-model.number="formularioPrincipal.peso" label="Peso (kg)" type="number"
          class="bordered q-mb-sm" clearable hide-bottom-space @keypress="limparCampoPeso"
          :rules="regras.usuario.peso" />
      </div>

      <div class="col">
        <q-input lazy-rules filled v-model.number="formularioPrincipal.altura" label="Altura (m)" type="number"
          step="0.01" class="bordered q-mb-sm" clearable hide-bottom-space :rules="regras.usuario.altura" />
      </div>
    </div>

    <div class="row q-gutter-sm">
      <div class="col">
        <q-input lazy-rules filled v-model="formularioPrincipal.rua" label="Rua" placeholder="Digite sua rua" clearable
          hide-bottom-space :rules="regras.endereco.rua" />
      </div>

      <div class="col">
        <q-input lazy-rules filled v-model.number="formularioPrincipal.numero" label="Número" type="number" clearable
          hide-bottom-space :rules="regras.endereco.numero" />
      </div>
    </div>
    <br>
    <div class="row q-gutter-sm">
      <div class="col">
        <selectCidade lazy-rules v-model="formularioPrincipal.cidadeSelecionada"
          :rules="regras.endereco.cidadeSelecionada" />
      </div>
      <div class="col">
        <selectTipoUsuario lazy-rules v-model="formularioPrincipal.tipoUsuario" :rules="regras.usuario.tipoUsuario" />
      </div>
    </div>

    <div class="row q-gutter-sm">
      <div class="col">
        <q-input lazy-rules filled v-model="formularioPrincipal.email" label="Email" placeholder="Digite sua email"
          clearable hide-bottom-space :rules="regras.login.email" autocomplete="email" />
      </div>


      <!-- :rules="regras.usuario.novaSenha" :disable="valorId_tipo_usuario !== 1"  -->

      <div class="col">

        <InputSenha 
        v-model="formularioPrincipal.senha" 
        label="Senha"
        :rules="valorId_tipo_usuario === null ? regras.login.senha : regras.usuario.novaSenha"
        :disable="valorId_tipo_usuario !== null && valorId_tipo_usuario !== 1" 
        />

      </div>
    </div>

    <div class="q-mt-md">
      <q-btn v-if="botaoVoltar" label="Cancelar" color="secondary" class="q-mr-xs" to="/login" />
      <q-btn color="secondary" label="Gravar" type="submit" />
    </div>

  </q-form>

</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { DadosUsuario } from '../../interfaces/usuarioInterface'
import { regras } from 'src/utils/validacao/regras'
import { validarObjeto } from 'src/utils/validacao/validacao'
import { criarUsuario } from '../../services/Usuarios/criarUsuarioService';
import { atualizarUsuarioService } from '../../services/Usuarios/atualizarUsuarioService';
import selectCidade from '../components/selectCidade.vue';
import selectTipoUsuario from '../components/selectTipoUsuario.vue';
import InputSenha from './inputSenha.vue'
import { listarDadosUsuarioLogado } from '../../services/UsuarioLogado/listarDadosUsuarioLogado'

import axios from 'axios'

const props = defineProps<{
  botaoVoltar?: boolean,
  usuario?: DadosUsuario | null
}>()

const emit = defineEmits(['usuarioCriado', 'usuarioEditado'])
const valorId_tipo_usuario = ref<number | null>(null);

const formRef = ref();

const estadoInicial = {
  nome: '',
  dataDeNascimento: '',
  peso: null,
  altura: null,
  rua: '',
  numero: null,
  cidadeSelecionada: null,
  tipoUsuario: null,
  email: '',
  senha: ''
};

const formularioPrincipal = reactive({
  nome: '',
  dataDeNascimento: '',
  peso: null as number | null,
  altura: null as number | null,
  rua: '',
  numero: null as number | null,
  tipoUsuario: null as number | null,
  cidadeSelecionada: null as number | null,
  email: '',
  senha: ''
});

function preencherFormulario(usuario: DadosUsuario) {
  const endereco = Array.isArray(usuario.endereco) ? usuario.endereco[0] : usuario.endereco
  const login = Array.isArray(usuario.login) ? usuario.login[0] : usuario.login

  formularioPrincipal.nome = usuario.nome ?? ''
  formularioPrincipal.dataDeNascimento = usuario.dataDeNascimento?.split('T')[0] ?? ''
  formularioPrincipal.peso = usuario.peso ?? null
  formularioPrincipal.altura = usuario.altura ?? null
  formularioPrincipal.rua = endereco?.rua ?? ''
  formularioPrincipal.numero = endereco?.numero ?? null
  formularioPrincipal.cidadeSelecionada = endereco?.cod_cidade ?? null
  formularioPrincipal.tipoUsuario = usuario.id_tipo_usuario ?? null
  formularioPrincipal.email = login?.email ?? ''
  formularioPrincipal.senha = ''
}

function limparFormularioPrincipal() {
  Object.assign(formularioPrincipal, estadoInicial);
  if (formRef.value) formRef.value.resetValidation();
}

function limparCampoPeso(event: KeyboardEvent) {
  if (event.key === ',' || event.key === '.' || !/[0-9]/.test(event.key)) event.preventDefault();
}

async function createUsuarioTodosDados() {
  const usuario: DadosUsuario = {
    ...(props.usuario?.id ? { id: props.usuario.id } : {}),
    nome: formularioPrincipal.nome,
    dataDeNascimento: formularioPrincipal.dataDeNascimento,
    peso: formularioPrincipal.peso,
    altura: formularioPrincipal.altura,
    id_tipo_usuario: formularioPrincipal.tipoUsuario,

    endereco: {
      rua: formularioPrincipal.rua,
      numero: formularioPrincipal.numero,
      cod_cidade: formularioPrincipal.cidadeSelecionada
    },

    login: {
      email: formularioPrincipal.email,...(formularioPrincipal.senha? { senha: formularioPrincipal.senha }: {})
    }
  }

  const erros = validarObjeto(usuario)

  if (erros.length > 0) {
    alert(erros.join('\n'))
    return
  }

  try {
    if (props.usuario?.id) {
      try {
        await atualizarUsuarioService(usuario)
        emit('usuarioEditado', usuario)
        alert('Usuário atualizado com sucesso')
      } catch (error: unknown) {
        if (
          axios.isAxiosError(error) &&
          error.response?.status === 401 &&
          error.response?.data?.message === 'Não autorizado'
        ) {
          console.warn('401 ignorado ao recarregar lista.')
        } else {
          throw error
        }
      }

    } else {
      const res = await criarUsuario(usuario)
      emit('usuarioCriado', res)
      alert('Novo usuário criado: ' + (res.nome || formularioPrincipal.nome))
    }

    limparFormularioPrincipal()
  } catch (error) {
    alert('Erro ao salvar usuário: ' + error)
  }
}


async function init() {
  const usuario = await listarDadosUsuarioLogado();
  valorId_tipo_usuario.value = usuario.data.id_tipo_usuario;
}

watch(() => props.usuario, (usuarioExistente) => {
  if (usuarioExistente) {
    init()
    preencherFormulario(usuarioExistente)
  }
  else {
    limparFormularioPrincipal()
  }
}, { immediate: true })


</script>