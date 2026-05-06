<template>

<selectNomeIdUsuario lazy-rules v-model="formularioPrincipal.usuarioSelecionado"/>
</template>

<script setup lang="ts">
import { reactive, } from 'vue';

import selectNomeIdUsuario from '../components/selectNomeIdUsuario.vue';
const formularioPrincipal = reactive({
  usuarioSelecionado: null,

});


</script>