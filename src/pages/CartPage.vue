<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Carrinho</div>

    <q-card v-if="cart.items.length === 0" class="q-pa-md">
      <div class="text-grey">Seu carrinho está vazio.</div>
    </q-card>

    <q-card v-else class="q-pa-md">
      <q-list>
        <q-item v-for="item in cart.items" :key="item.id">
          <q-item-section> {{ item.nome }} - {{ item.quantidade }}x </q-item-section>

          <q-item-section side>
            <q-btn color="negative" dense round icon="delete" @click="remove(item.id)" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup>
import { useCartStore } from 'src/stores/cartStore'

const cart = useCartStore()

function remove(id) {
  cart.removeFromCart(id)
}
</script>
