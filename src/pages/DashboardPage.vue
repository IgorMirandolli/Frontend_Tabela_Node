<template>
  <q-page padding class="flex flex-center column q-gutter-xl">
    <div class="text-h4 text-center">Painel do Sistema</div>

    <div class="row q-gutter-xl">
      <!-- Botão Produtos -->
      <q-card
        class="q-pa-lg cursor-pointer"
        style="width: 220px"
        @click="$router.push('/produtos')"
      >
        <q-card-section class="text-center">
          <q-icon name="inventory_2" size="64px" color="primary" />
          <div class="text-h6 q-mt-md">Produtos</div>
        </q-card-section>
      </q-card>

      <!-- Botão Pedidos -->
      <q-card class="q-pa-lg cursor-pointer" style="width: 220px" @click="$router.push('/pedidos')">
        <q-card-section class="text-center">
          <q-icon name="receipt_long" size="64px" color="primary" />
          <div class="text-h6 q-mt-md">Pedidos</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'DashboardPage',
}
</script>
