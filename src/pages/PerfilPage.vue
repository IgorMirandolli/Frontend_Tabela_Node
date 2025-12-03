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
/* 🔹 Fundo igual ao Dashboard */
.perfil-bg {
  background: url('https://lh3.googleusercontent.com/rd-gg-dl/ABS2GSkdy_ztQ_QjIch178FpIBysPrg11vmi1Pifj7InwfkB8tp9iqD8hu5CNUsJuUYFfdkWlGX1C-hzFQIWXfjwIMKULDITz5Ju4iTOZzcIWV21G1X7BQBrIslaxCRtrbkEe_YtT4-G1tfwm5BWAACbcqpl81Q2ZdVt7ZKdSljxXeOoXHwpIMxtuYD6RFhwW4IZO2vnLyBIdhYLc3EEGyFUpc5c1PbvMqnwbGBymcpILxrxXUWrzbscWdvTDTqjhITPjTRN6S02NywzTKPXV3N-38FyXvZWPpR6unSqBNv1Yz3K_hgDOI2JSjfKBG1RKNpyX25_C-dEHktKtyfWs8ye7linrkSkOor-hYbav_h25MXK-JAKAHG6K_NlxgAPTh67cCbYtCwgIsFgQGchurssuOTEl7zIVvYX2c4--u8BPsegSzsOtjShXGhpl9ulymNueKC54WE9XysHwIypQlwiSWzUvtG7vbLX6IAQj1bvY8t_SHZoGT0M8dWz4wzxviOUWmmPgsJD4ysJj_6uYmV1cI9Ue5hCifJsOVueyvRLLMh3Si6NzulBaSAGYmo2Jc2DWurEHGRKfzlqxP4OCH-1NLeA9eMa2xFf8Aju-jC8sCM2_4n0rsot5TmCyn0GJbf8-uLd0c8qulqpo709kbjxlIVmFQfhaoSTtb6MYWgzqONzcETaFvkCTpgTf-VO8KIR8XMlxiw49_W7j7CAq5HxBfXBchGEy7GACy0NlRQAdPubIw2OHyQfVTWe42hKKP2wyANjpVkaxE0LrQAR4FAvewH7HlcPwFE8v78C4Z-57RF5_8vDhKIrSLvi_g8G6JJzZIVDDgdHWdVL_8h4AMwGqT4gaIhAVsukilyvpJ99mnmXMa8ZRymY_Wm5E1u3DBWC_hww3ai-pJgBvzKCNeAWHhWw62-33TFbGZLZgtp8RgAgzy-uyhmge5vMT18P5pretXUk1lKFFucMCERzRe3RhyIbUXID_C_8-0SXeXewwT0xoimWZrFCQM-JsAQaeGgqCQDzJYHU-hx6zJQiQndnDA7wVuV4Nx3Auix1YgCcYgAHOSKValTdoG1T98KcqlTf1p57vrnYY0pX0U3FHkKdCyHBraSHNXYbDISDHeG4w0Cew01eoBaE0Xa2vRYLc-jycEhjhbG5S-4zkoi_-U87xvJ-2x-t1ps6O3LLjfpE3jGeFLoOx4nwruRr4hNmubslrf9n3ICu0uJvgj8lAVYlZTI_=s1024-rj')
    no-repeat center center;
  background-size: cover;
}

/* 🔹 Card estiloso */
.perfil-card {
  width: 420px;
  border-radius: 20px;
  backdrop-filter: blur(1px);
  background: #ffffff;
}

/* 🔹 Itens organizados */
.perfil-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 17px;
}
</style>
