<template>
  <q-page class="login-page flex flex-center">
    <!-- Card de Login -->
    <q-card class="login-card q-pa-lg">
      <!-- LOGO -->
      <q-card-section class="text-center q-mb-md">
        <img src="../assets/techbuy-logo.png" alt="TechBuy" class="login-logo" />
      </q-card-section>

      <q-card-section>
        <div class="text-h5 text-center q-mb-sm">Bem-vindo</div>
        <div class="text-subtitle2 text-center q-mb-lg">Entre para acessar o sistema</div>

        <q-input v-model="email" label="Email" outlined dense class="q-mb-md" />
        <q-input v-model="senha" label="Senha" type="password" outlined dense />
      </q-card-section>

      <q-card-actions align="center" class="q-mt-md">
        <q-btn
          color="primary"
          label="Entrar"
          class="full-width"
          :loading="loading"
          @click="fazerLogin"
        />
      </q-card-actions>

      <q-card-section class="text-center q-mt-sm">
        <q-btn flat label="Criar conta" to="/register" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import AuthService from 'src/services/authService'

export default {
  data() {
    return {
      email: '',
      senha: '',
      loading: false,
    }
  },

  methods: {
    async fazerLogin() {
      this.loading = true

      try {
        const resp = await AuthService.login(this.email, this.senha)

        localStorage.setItem('token', resp.data.token)
        localStorage.setItem('role', resp.data.role)

        this.$q.notify({
          type: 'positive',
          message: 'Login realizado!',
        })

        this.$router.push('/dashboard')
      } catch (err) {
        this.$q.notify({
          type: 'negative',
          message: err.response?.data?.error || 'Erro ao fazer login',
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.login-page {
  background: url('https://unisoma.com.br/wp-content/uploads/2023/08/bg.jpg') no-repeat center
    center fixed;
  background-size: cover;
}

/* CARD AJUSTADO */
.login-card {
  width: 340px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.88);
  border-radius: 18px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

/* LOGO */
.login-logo {
  width: 140px;
  height: auto;
}
</style>
