<template>
  <q-page padding class="dashboard-bg column items-center">
    <div class="text-h4 text-center text-blue q-mb-lg titulo-dashboard">
      <q-icon name="shopping_cart" size="40px" class="q-mr-sm" />
      Produtos Disponíveis
    </div>

    <div class="row justify-center q-gutter-lg q-mb-xl loja-container" style="max-width: 1400px">
      <q-card
        v-for="p in produtos"
        :key="p.value"
        class="loja-card shadow-6"
        @click="irParaDetalhes(p)"
      >
        <q-img
          :src="p.imagem || 'https://via.placeholder.com/600x400?text=Sem+Imagem'"
          class="loja-img"
        />

        <q-card-section>
          <div class="loja-nome">{{ p.label.split(' - ')[0] }}</div>

          <div class="loja-preco">
            {{ p.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'

export default {
  name: 'DashboardPage',

  data() {
    return {
      produtos: [],
    }
  },

  created() {
    this.carregarProdutos()
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

    irParaDetalhes(produto) {
      this.$router.push(`/produto/${produto.value}`)
    },
  },
}
</script>

<style scoped>
.dashboard-bg {
  background: #ffffffff;
}

.titulo-dashboard {
  color: #ffffffff;
  text-shadow: none;
}

.loja-container {
  width: 100%;
}

.loja-card {
  width: 280px;
  border-radius: 18px;
  cursor: pointer;
  transition: 0.25s ease;
  background: #ffffff;
}

.loja-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 35px rgba(255, 255, 255, 1);
}

.loja-img {
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
}

.loja-nome {
  font-size: 1.1rem;
  font-weight: 600;
  min-height: 48px;
  margin-bottom: 6px;
}

.loja-preco {
  font-size: 1.3rem;
  font-weight: bold;
  color: #2980ff;
}
</style>
