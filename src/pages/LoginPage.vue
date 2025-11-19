<template>
  <q-page class="flex flex-center">
    <q-card style="width: 350px">
      <q-card-section>
        <div class="text-h6 text-center">Login</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="email" label="Email" />
        <q-input v-model="senha" label="Senha" type="password" class="q-mt-md" />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="primary" label="Entrar" @click="fazerLogin" :loading="loading" />
      </q-card-actions>

      <q-card-section class="text-center">
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

        this.$q.notify({
          type: 'positive',
          message: 'Login realizado!',
        })

        this.$router.push('/produtos')
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
