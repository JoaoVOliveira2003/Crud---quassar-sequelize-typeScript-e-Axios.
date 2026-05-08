<template>
    <q-page-sticky>
        <q-btn label="Logout" @click="sair()" />
    </q-page-sticky>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { logout } from '../utils/funcoes'
const router = useRouter()
function sair() {
    logout(router)
}
</script>