<template>
  <q-layout view="lHh Lpr lFf">
    <!-- CONTEÚDO + BOTÃO LOGOUT -->
    <q-page-container>
      <div class="row justify-end q-pa-md">
        <q-btn color="primary" icon="logout" label="Logout" @click="logout" />
      </div>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import authService from 'src/services/authService'

function logout() {
  authService.logout()
}
</script>

<style>
.q-page-container {
  padding-top: 0 !important;
}
</style>
