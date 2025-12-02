<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Meu Perfil</div>

    <q-card class="q-pa-md">
      <q-card-section>
        <div><strong>ID:</strong> {{ user.id }}</div>
        <div><strong>Email:</strong> {{ user.email }}</div>
        <div><strong>Função:</strong> {{ user.role }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { jwtDecode } from 'jwt-decode'

export default {
  name: 'PerfilPage',

  data() {
    return {
      user: {},
    }
  },

  created() {
    const token = localStorage.getItem('token')

    if (token) {
      this.user = jwtDecode(token)
    }
  },
}
</script>
