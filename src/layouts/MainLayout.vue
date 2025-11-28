<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Painel do Sistema </q-toolbar-title>

        <!-- BOTÃO LOGOUT CORRIGIDO -->
        <q-btn flat round dense icon="logout" color="white" @click="logout" class="q-pa-sm" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  methods: {
    logout() {
      // ação de logout
      this.$router.push('/')
    },
  },
}
</script>
