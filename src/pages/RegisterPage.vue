<template>
  <q-page class="register-page flex flex-center">
    <q-card class="register-card q-pa-lg">
      <q-card-section>
        <div class="text-h5 text-center q-mb-md">Criar Conta</div>
        <div class="text-subtitle2 text-center q-mb-lg">Preencha os dados abaixo</div>

        <q-input v-model="nome" label="Nome" outlined dense class="q-mb-md" />

        <q-input v-model="email" label="Email" outlined dense class="q-mb-md" />

        <q-input v-model="senha" label="Senha" type="password" outlined dense class="q-mb-md" />

        <q-input v-model="confirmarSenha" label="Confirmar Senha" type="password" outlined dense />
      </q-card-section>

      <q-card-actions align="center" class="q-mt-md">
        <q-btn
          color="primary"
          label="Cadastrar"
          class="full-width"
          :loading="loading"
          @click="fazerCadastro"
        />
      </q-card-actions>

      <q-card-section class="text-center q-mt-sm">
        <q-btn flat label="Já tenho conta" to="/login" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import AuthService from 'src/services/authService'

export default {
  data() {
    return {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
      loading: false,
    }
  },

  methods: {
    async fazerCadastro() {
      this.loading = true

      if (this.senha !== this.confirmarSenha) {
        this.$q.notify({
          type: 'negative',
          message: 'As senhas não coincidem!',
        })
        this.loading = false
        return
      }

      try {
        await AuthService.register(this.nome, this.email, this.senha, this.confirmarSenha)

        this.$q.notify({
          type: 'positive',
          message: 'Conta criada com sucesso!',
        })

        this.$router.push('/login')
      } catch (err) {
        this.$q.notify({
          type: 'negative',
          message: err.response?.data?.error || 'Erro ao cadastrar',
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.register-page {
  background: url('https://unisoma.com.br/wp-content/uploads/2023/08/bg.jpg') no-repeat center
    center fixed;
  background-size: cover;
}

.register-card {
  width: 350px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}
</style>
