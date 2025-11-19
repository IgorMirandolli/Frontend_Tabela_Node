<template>
  <q-page class="flex flex-center">
    <q-card style="width: 350px">
      <q-card-section>
        <div class="text-h6 text-center">Criar Conta</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="nome" label="Nome" />
        <q-input v-model="email" label="Email" class="q-mt-md" />
        <q-input v-model="senha" label="Senha" type="password" class="q-mt-md" />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="primary" label="Cadastrar" @click="fazerCadastro" :loading="loading" />
      </q-card-actions>

      <q-card-section class="text-center">
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
      loading: false,
    }
  },

  methods: {
    async fazerCadastro() {
      this.loading = true

      try {
        await AuthService.register(this.nome, this.email, this.senha)

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
