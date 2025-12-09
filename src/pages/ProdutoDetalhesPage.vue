<template>
  <q-page padding class="column items-center q-gutter-md">
    <q-card
      v-if="produto"
      class="shadow-4"
      style="max-width: 450px; width: 100%; border-radius: 18px"
    >
      <q-img
        :src="produto.imagem"
        alt="Imagem do Produto"
        style="height: 220px; border-radius: 18px 18px 0 0"
        fit="cover"
      />

      <q-card-section>
        <div class="text-h5 text-center q-mb-sm">{{ produto.nome }}</div>

        <div class="text-subtitle1 text-center text-primary">
          R$ {{ produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
        </div>
      </q-card-section>

      <q-card-section>
        <div class="text-body2 text-grey-7">
          {{ produto.descricao || 'Sem descrição disponível.' }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-input filled type="number" min="1" v-model.number="quantidade" label="Quantidade" />
      </q-card-section>

      <q-card-section class="text-center">
        <q-btn color="primary" label="Adicionar ao Carrinho" @click="adicionarAoCarrinho" />
      </q-card-section>
    </q-card>

    <q-spinner v-else size="40px" color="primary" />
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { api } from 'boot/axios'
import { useCartStore } from 'src/stores/cartStore.js'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const route = useRoute()
const cart = useCartStore()

const produto = ref(null)
const quantidade = ref(1)

onMounted(async () => {
  try {
    const id = Number(route.params.id)
    const response = await api.get('/produtos')
    produto.value = response.data.find((p) => p.id === id)

    if (!produto.value) console.error('Produto não encontrado.')
  } catch (error) {
    console.error('Erro ao carregar produto:', error)
  }
})

function adicionarAoCarrinho() {
  if (!produto.value) return

  cart.addItem({
    id: produto.value.id,
    nome: produto.value.nome,
    preco: Number(produto.value.preco),
    quantidade: quantidade.value,
  })

  $q.notify({
    type: 'positive',
    message: 'Produto adicionado ao carrinho!',
  })
}
</script>
