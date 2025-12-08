<template>
  <q-page class="perfil-bg flex flex-center">
    <q-card class="perfil-card shadow-6">
      <q-card-section class="text-center">
        <q-icon name="account_circle" size="80px" class="text-primary q-mb-md" />
        <div class="text-h5 text-weight-bold">Meu Perfil</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-gutter-md">
        <div class="perfil-item">
          <q-icon name="badge" class="text-primary" />
          <span><strong>ID:</strong> {{ user.id }}</span>
        </div>

        <div class="perfil-item">
          <q-icon name="email" class="text-primary" />
          <span><strong>Email:</strong> {{ user.email }}</span>
        </div>

        <div class="perfil-item">
          <q-icon name="admin_panel_settings" class="text-primary" />
          <span><strong>Função:</strong> {{ user.role }}</span>
        </div>
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

<style scoped>
.perfil-bg {
  background: url('https://unisoma.com.br/wp-content/uploads/2023/08/bg.jpg') no-repeat center
    center;
  background-size: cover;
}

.perfil-card {
  width: 420px;
  border-radius: 20px;
  backdrop-filter: blur(1px);
  background: #ffffff;
}

.perfil-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 17px;
}
</style>
