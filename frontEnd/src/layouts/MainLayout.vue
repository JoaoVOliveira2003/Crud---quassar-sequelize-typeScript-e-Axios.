<template>
  <q-layout view="lHh Lpr lFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="drawer = !drawer" />
        <q-toolbar-title class="text-weight-bold">
          Projeto de estudo
        </q-toolbar-title>
        <q-btn flat round dense icon="account_circle" @click="verUsuario()" />
        <q-btn flat round dense icon="logout"  @click="sair()"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above bordered :width="240" class="bg-grey-1">
      <q-list padding>

        <q-item-label header class="text-grey-7">
          Navegação
        </q-item-label>

        <q-item clickable v-ripple to="/">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>

          <q-item-section>
            Usuarios
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/notas">
          <q-item-section avatar>
            <q-icon name="format_list_bulleted" />
          </q-item-section>

          <q-item-section>
            Lista de notas
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const drawer = ref(false)

import { useRouter } from 'vue-router'
import { logout } from '../utils/funcoes'
const router = useRouter()
function sair() {
  logout(router)
}

function verUsuario() {
  const dados = localStorage.getItem('dados_usuario')

  if (!dados) {
    alert('Nenhum usuário encontrado.')
    return
  }

  const usuario = JSON.parse(dados)

  alert(
    `ID usuário: ${usuario.id_usuario}\n` +
    `Tipo usuário: ${usuario.id_tipo_usuario}`
  )
}
</script>