<template>
  <q-page padding class="dashboard-bg column items-center">
    <!-- Título -->
    <div class="text-h4 text-center text-white q-mb-lg titulo-dashboard">
      <q-icon name="shopping_cart" size="40px" class="q-mr-sm" />
      Fazer Pedido
    </div>

    <!-- GRID DOS PRODUTOS -->
    <div class="row justify-center q-gutter-lg q-mb-xl" style="max-width: 1200px">
      <q-card
        v-for="p in produtos"
        :key="p.value"
        class="product-card shadow-4"
        @click="selecionarProduto(p)"
      >
        <q-img
          :src="p.imagem || 'https://via.placeholder.com/300x200?text=Sem+Imagem'"
          class="product-img"
        />
        <q-card-section>
          <div class="text-h6">{{ p.label.split(' - ')[0] }}</div>
          <div class="text-subtitle2 text-primary">
            {{ p.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="primary" flat icon="add_shopping_cart" @click.stop="selecionarProduto(p)" />
        </q-card-actions>
      </q-card>
    </div>

    <!-- DIÁLOGO DE ADICIONAR AO CARRINHO -->
    <q-dialog v-model="showConfirmacao" persistent>
      <q-card class="q-pa-lg" style="min-width: 350px; border-radius: 14px">
        <div class="text-h6 text-center q-mb-md">Adicionar ao Carrinho</div>

        <div class="text-body1 q-mb-md">
          <b>Produto:</b> {{ nomeProdutoSelecionado }} <br />
          <b>Quantidade:</b> {{ pedido.quantidade }} <br />
          <b>Total:</b> R$ {{ valorTotal.toFixed(2) }}
        </div>

        <div class="row justify-between q-mt-lg">
          <q-btn flat label="Cancelar" color="negative" class="btn-flat-modern" v-close-popup />
          <q-btn
            flat
            label="Adicionar"
            color="positive"
            class="btn-flat-modern"
            @click="adicionarCarrinho"
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import { useCartStore } from 'src/stores/cartStore'

export default {
  name: 'DashboardPage',

  data() {
    return {
      produtos: [],

      pedido: {
        id_produto: null,
        quantidade: 1,
      },

      valorTotal: 0,
      showConfirmacao: false,
    }
  },

  created() {
    this.carregarProdutos()
    this.cart = useCartStore() // instancia o store do Pinia
  },

  computed: {
    nomeProdutoSelecionado() {
      const p = this.produtos.find((x) => x.value === this.pedido.id_produto)
      return p ? p.label.split(' - ')[0] : ''
    },
  },

  methods: {
    async carregarProdutos() {
      try {
        const { data } = await api.get('/produtos')

        const ativos = data.filter((p) => p.ativo === 1 || p.ativo === true || p.status === 'ativo')

        this.produtos = ativos.map((p) => ({
          label: `${p.nome} - R$ ${(Number(p.preco) || 0).toFixed(2)}`,
          value: p.id,
          preco: Number(p.preco) || 0,
          imagem: p.imagem || null,
        }))
      } catch {
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao carregar produtos',
        })
      }
    },

    selecionarProduto(produto) {
      this.pedido.id_produto = produto.value
      this.pedido.quantidade = 1
      this.valorTotal = produto.preco
      this.showConfirmacao = true
    },

    adicionarCarrinho() {
      const produto = this.produtos.find((x) => x.value === this.pedido.id_produto)
      if (!produto) return

      // CORREÇÃO AQUI (única mudança)
      this.cart.addItem({
        id: produto.value,
        nome: produto.label.split(' - ')[0],
        preco: produto.preco,
        quantidade: this.pedido.quantidade,
      })

      console.log('Carrinho atual (PINIA):', this.cart.items)

      this.$q.notify({
        type: 'positive',
        message: 'Produto adicionado ao carrinho!',
      })

      this.showConfirmacao = false
      this.pedido.id_produto = null
      this.pedido.quantidade = 1
      this.valorTotal = 0
    },
  },
}
</script>

<style scoped>
.dashboard-bg {
  background: url('https://unisoma.com.br/wp-content/uploads/2023/08/bg.jpg') no-repeat center
    center;
  background-size: cover;
}

.titulo-dashboard {
  text-shadow: 0px 3px 12px rgba(0, 0, 0, 0.6);
}

.product-card {
  width: 260px;
  border-radius: 16px;
  cursor: pointer;
  transition: 0.25s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
}

.product-img {
  height: 180px;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.btn-flat-modern {
  font-weight: 600;
  transition: 0.25s ease;
  border-radius: 10px !important;
  padding: 6px 12px !important;
}

.btn-flat-modern:hover {
  background: rgba(0, 0, 0, 0.08);
}
</style>
