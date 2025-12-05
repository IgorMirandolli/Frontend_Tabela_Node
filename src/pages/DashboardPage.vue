<template>
  <q-page padding class="dashboard-bg column flex flex-center">
    <div class="text-h4 text-center text-white q-mb-lg titulo-dashboard">
      <q-icon name="shopping_cart" size="40px" class="q-mr-sm" />
      Fazer Pedido
    </div>

    <q-card
      class="q-pa-xl shadow-4 solid-card"
      style="width: 450px; max-width: 95%; border-radius: 18px"
    >
      <q-card-section class="column q-gutter-lg">
        <q-select
          filled
          dense
          rounded
          v-model="pedido.id_produto"
          :options="produtos"
          label="Selecione um produto"
          emit-value
          map-options
          @update:model-value="atualizarTotal"
          prefix="Produto"
        />

        <q-input
          filled
          dense
          rounded
          type="number"
          v-model.number="pedido.quantidade"
          label="Quantidade"
          min="1"
          @update:model-value="atualizarTotal"
          prefix="#"
        />

        <div class="text-center q-mt-md">
          <div class="text-subtitle1 text-grey-8">Total do Pedido</div>
          <div class="text-h4 text-primary" style="font-weight: 700">
            R$ {{ valorTotal.toFixed(2) }}
          </div>
        </div>

        <q-btn
          color="primary"
          label="Fazer Pedido"
          class="full-width q-mt-md btn-modern"
          size="lg"
          push
          rounded
          @click="abrirConfirmacao"
        />
      </q-card-section>
    </q-card>

    <q-dialog v-model="showConfirmacao" persistent>
      <q-card class="q-pa-lg" style="min-width: 350px; border-radius: 14px">
        <div class="text-h6 text-center q-mb-md">Confirmar Pedido</div>

        <div class="text-body1 q-mb-md">
          <b>Produto:</b> {{ nomeProdutoSelecionado }} <br />
          <b>Quantidade:</b> {{ pedido.quantidade }} <br />
          <b>Total:</b> R$ {{ valorTotal.toFixed(2) }}
        </div>

        <div class="row justify-between q-mt-lg">
          <q-btn flat label="Cancelar" color="negative" class="btn-flat-modern" v-close-popup />
          <q-btn
            flat
            label="Confirmar"
            color="positive"
            class="btn-flat-modern"
            @click="fazerPedido"
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'

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
  },

  computed: {
    nomeProdutoSelecionado() {
      const p = this.produtos.find((x) => x.value === this.pedido.id_produto)
      return p ? p.label : ''
    },
  },

  methods: {
    async carregarProdutos() {
      try {
        const { data } = await api.get('/produtos')

        this.produtos = data.map((p) => ({
          label: `${p.nome} - R$ ${(Number(p.preco) || 0).toFixed(2)}`,
          value: p.id,
          preco: Number(p.preco) || 0,
        }))
      } catch (erro) {
        console.error(erro)
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao carregar produtos',
        })
      }
    },

    atualizarTotal() {
      const produto = this.produtos.find((p) => p.value === this.pedido.id_produto)
      if (!produto) {
        this.valorTotal = 0
        return
      }
      this.valorTotal = produto.preco * (this.pedido.quantidade || 1)
    },

    abrirConfirmacao() {
      if (!this.pedido.id_produto) {
        return this.$q.notify({
          type: 'negative',
          message: 'Selecione um produto!',
        })
      }

      if (this.pedido.quantidade < 1) {
        return this.$q.notify({
          type: 'negative',
          message: 'Quantidade inválida!',
        })
      }

      this.atualizarTotal()
      this.showConfirmacao = true
    },

    async fazerPedido() {
      try {
        await api.post('/pedidos', {
          ...this.pedido,
          valor_total: this.valorTotal,
        })

        this.$q.notify({
          type: 'positive',
          message: 'Pedido realizado com sucesso!',
        })

        this.showConfirmacao = false
        this.pedido.id_produto = null
        this.pedido.quantidade = 1
        this.valorTotal = 0
      } catch (erro) {
        console.error(erro)
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao registrar pedido',
        })
      }
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

/* --- BOTÃO MODERNO (principal) --- */
.btn-modern {
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: 0.25s ease-in-out;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.btn-modern:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
}

/* --- BOTÕES FLAT DO DIÁLOGO --- */
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
