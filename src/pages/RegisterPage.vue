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
  background: url('https://lh3.googleusercontent.com/rd-gg-dl/ABS2GSkdy_ztQ_QjIch178FpIBysPrg11vmi1Pifj7InwfkB8tp9iqD8hu5CNUsJuUYFfdkWlGX1C-hzFQIWXfjwIMKULDITz5Ju4iTOZzcIWV21G1X7BQBrIslaxCRtrbkEe_YtT4-G1tfwm5BWAACbcqpl81Q2ZdVt7ZKdSljxXeOoXHwpIMxtuYD6RFhwW4IZO2vnLyBIdhYLc3EEGyFUpc5c1PbvMqnwbGBymcpILxrxXUWrzbscWdvTDTqjhITPjTRN6S02NywzTKPXV3N-38FyXvZWPpR6unSqBNv1Yz3K_hgDOI2JSjfKBG1RKNpyX25_C-dEHktKtyfWs8ye7linrkSkOor-hYbav_h25MXK-JAKAHG6K_NlxgAPTh67cCbYtCwgIsFgQGchurssuOTEl7zIVvYX2c4--u8BPsegSzsOtjShXGhpl9ulymNueKC54WE9XysHwIypQlwiSWzUvtG7vbLX6IAQj1bvY8t_SHZoGT0M8dWz4wzxviOUWmmPgsJD4ysJj_6uYmV1cI9Ue5hCifJsOVueyvRLLMh3Si6NzulBaSAGYmo2Jc2DWurEHGRKfzlqxP4OCH-1NLeA9eMa2xFf8Aju-jC8sCM2_4n0rsot5TmCyn0GJbf8-uLd0c8qulqpo709kbjxlIVmFQfhaoSTtb6MYWgzqONzcETaFvkCTpgTf-VO8KIR8XMlxiw49_W7j7CAq5HxBfXBchGEy7GACy0NlRQAdPubIw2OHyQfVTWe42hKKP2wyANjpVkaxE0LrQAR4FAvewH7HlcPwFE8v78C4Z-57RF5_8vDhKIrSLvi_g8G6JJzZIVDDgdHWdVL_8h4AMwGqT4gaIhAVsukilyvpJ99mnmXMa8ZRymY_Wm5E1u3DBWC_hww3ai-pJgBvzKCNeAWHhWw62-33TFbGZLZgtp8RgAgzy-uyhmge5vMT18P5pretXUk1lKFFucMCERzRe3RhyIbUXID_C_8-0SXeXewwT0xoimWZrFCQM-JsAQaeGgqCQDzJYHU-hx6zJQiQndnDA7wVuV4Nx3Auix1YgCcYgAHOSKValTdoG1T98KcqlTf1p57vrnYY0pX0U3FHkKdCyHBraSHNXYbDISDHeG4w0Cew01eoBaE0Xa2vRYLc-jycEhjhbG5S-4zkoi_-U87xvJ-2x-t1ps6O3LLjfpE3jGeFLoOx4nwruRr4hNmubslrf9n3ICu0uJvgj8lAVYlZTI_=s1024-rj')
    no-repeat center center fixed;
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
