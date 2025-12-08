<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Carrinho</div>

    <!-- Carrinho vazio -->
    <q-card v-if="cart.items.length === 0" class="q-pa-md">
      <div class="text-grey">Seu carrinho está vazio.</div>
    </q-card>

    <!-- Carrinho com itens -->
    <q-card v-else class="q-pa-md">
      <q-list>
        <q-item v-for="item in cart.items" :key="item.id">
          <q-item-section>
            {{ item.nome }} - {{ item.quantidade }}x — R$
            {{ (item.preco * item.quantidade).toFixed(2) }}
          </q-item-section>

          <q-item-section side>
            <q-btn color="negative" dense round icon="delete" @click="remove(item.id)" />
          </q-item-section>
        </q-item>
      </q-list>

      <!-- TOTAL -->
      <div class="text-right q-mt-md text-h6">
        Total: <strong>R$ {{ totalGeral }}</strong>
      </div>

      <!-- BOTÃO FAZER PEDIDO -->
      <div class="q-mt-md text-right">
        <q-btn color="primary" label="Fazer Pedido" @click="showConfirmacao = true" />
      </div>
    </q-card>

    <!-- CONFIRMAÇÃO -->
    <q-dialog v-model="showConfirmacao">
      <q-card>
        <q-card-section class="text-h6"> Confirmar Pedido? </q-card-section>

        <q-card-section>
          Total: <strong>R$ {{ totalGeral }}</strong>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey" v-close-popup />
          <q-btn flat label="Confirmar" color="primary" @click="confirmarPedido" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useCartStore } from 'src/stores/cartStore'
import { api } from 'boot/axios'

const $q = useQuasar()
const cart = useCartStore()
const showConfirmacao = ref(false)

function remove(id) {
  cart.removeFromCart(id)
}

const totalGeral = computed(() => {
  return cart.items.reduce((acc, item) => acc + item.preco * item.quantidade, 0).toFixed(2)
})

async function confirmarPedido() {
  try {
    // Envia item por item, pois o backend aceita apenas 1 produto por pedido
    for (const item of cart.items) {
      await api.post('/pedidos', {
        id_produto: item.id,
        quantidade: item.quantidade,
        total: (item.preco * item.quantidade).toFixed(2),
      })
    }

    cart.clearCart()
    showConfirmacao.value = false

    $q.notify({
      type: 'positive',
      message: 'Pedido realizado com sucesso!',
    })
  } catch (err) {
    console.error(err)

    $q.notify({
      type: 'negative',
      message: 'Erro ao realizar pedido',
    })
  }
}
</script>
