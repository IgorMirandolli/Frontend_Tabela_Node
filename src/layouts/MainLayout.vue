<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <!-- 🔹 BOTÃO INÍCIO -->
        <q-btn
          dense
          flat
          color="white"
          icon="home"
          label="Início"
          class="q-mr-md"
          @click="$router.push('/dashboard')"
        />

        <!-- 🔹 BOTÃO PRODUTOS -->
        <q-btn
          dense
          flat
          color="white"
          icon="inventory_2"
          label="Produtos"
          class="q-mr-sm"
          @click="$router.push('/produtos')"
        />

        <!-- 🔹 BOTÃO PEDIDOS -->
        <q-btn
          dense
          flat
          color="white"
          icon="receipt_long"
          label="Pedidos"
          class="q-mr-sm"
          @click="$router.push('/pedidos')"
        />

        <!-- 🔹 empurra o logout para a direita -->
        <q-space />

        <!-- 🔹 LOGOUT -->
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
      localStorage.removeItem('token')
      this.$router.push('/')
    },
  },
}
</script>
