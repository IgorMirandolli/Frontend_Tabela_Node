<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white q-px-md">
      <q-toolbar>
        <div class="row items-center q-gutter-sm">
          <q-btn
            flat
            dense
            label="Início"
            icon="dashboard"
            class="header-btn"
            @click="$router.push('/dashboard')"
          />

          <q-btn
            v-if="role === 'admin'"
            flat
            dense
            label="Produtos"
            icon="inventory_2"
            class="header-btn"
            @click="$router.push('/produtos')"
          />

          <q-btn
            v-if="role === 'admin'"
            flat
            dense
            label="Pedidos"
            icon="shopping_cart"
            class="header-btn"
            @click="$router.push('/pedidos')"
          />
        </div>

        <q-space />

        <!-- 🔵 BOTÃO DO CARRINHO ADICIONADO (SEM MUDAR NADA) -->
        <q-btn
          flat
          dense
          icon="shopping_cart"
          class="header-btn q-mr-sm"
          @click="$router.push('/carrinho')"
        />

        <q-btn
          flat
          dense
          label="Perfil"
          icon="person"
          class="header-btn q-mr-sm"
          @click="$router.push('/perfil')"
        />

        <q-btn
          flat
          dense
          label="Sair"
          color="negative"
          icon="logout"
          class="header-btn"
          @click="confirmarLogout = true"
        />
      </q-toolbar>
    </q-header>

    <q-dialog v-model="confirmarLogout">
      <q-card>
        <q-card-section class="text-h6"> Confirmar Logout </q-card-section>

        <q-card-section> Tem certeza que deseja sair da sua conta? </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Sair" color="negative" @click="logoutConfirmado" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      confirmarLogout: false,
    }
  },

  computed: {
    role() {
      return localStorage.getItem('role') || null
    },
  },

  methods: {
    logoutConfirmado() {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.header-btn {
  border-radius: 8px;
  padding: 4px 10px;
  transition: 0.2s;
}

.header-btn:hover {
  background: rgba(255, 255, 255, 0.12) !important;
}
</style>
