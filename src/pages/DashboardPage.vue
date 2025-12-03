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
          class="full-width q-mt-md"
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
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
          <q-btn flat label="Confirmar" color="positive" @click="fazerPedido" />
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
  background: url('https://lh3.googleusercontent.com/rd-gg-dl/ABS2GSkdy_ztQ_QjIch178FpIBysPrg11vmi1Pifj7InwfkB8tp9iqD8hu5CNUsJuUYFfdkWlGX1C-hzFQIWXfjwIMKULDITz5Ju4iTOZzcIWV21G1X7BQBrIslaxCRtrbkEe_YtT4-G1tfwm5BWAACbcqpl81Q2ZdVt7ZKdSljxXeOoXHwpIMxtuYD6RFhwW4IZO2vnLyBIdhYLc3EEGyFUpc5c1PbvMqnwbGBymcpILxrxXUWrzbscWdvTDTqjhITPjTRN6S02NywzTKPXV3N-38FyXvZWPpR6unSqBNv1Yz3K_hgDOI2JSjfKBG1RKNpyX25_C-dEHktKtyfWs8ye7linrkSkOor-hYbav_h25MXK-JAKAHG6K_NlxgAPTh67cCbYtCwgIsFgQGchurssuOTEl7zIVvYX2c4--u8BPsegSzsOtjShXGhpl9ulymNueKC54WE9XysHwIypQlwiSWzUvtG7vbLX6IAQj1bvY8t_SHZoGT0M8dWz4wzxviOUWmmPgsJD4ysJj_6uYmV1cI9Ue5hCifJsOVueyvRLLMh3Si6NzulBaSAGYmo2Jc2DWurEHGRKfzlqxP4OCH-1NLeA9eMa2xFf8Aju-jC8sCM2_4n0rsot5TmCyn0GJbf8-uLd0c8qulqpo709kbjxlIVmFQfhaoSTtb6MYWgzqONzcETaFvkCTpgTf-VO8KIR8XMlxiw49_W7j7CAq5HxBfXBchGEy7GACy0NlRQAdPubIw2OHyQfVTWe42hKKP2wyANjpVkaxE0LrQAR4FAvewH7HlcPwFE8v78C4Z-57RF5_8vDhKIrSLvi_g8G6JJzZIVDDgdHWdVL_8h4AMwGqT4gaIhAVsukilyvpJ99mnmXMa8ZRymY_Wm5E1u3DBWC_hww3ai-pJgBvzKCNeAWHhWw62-33TFbGZLZgtp8RgAgzy-uyhmge5vMT18P5pretXUk1lKFFucMCERzRe3RhyIbUXID_C_8-0SXeXewwT0xoimWZrFCQM-JsAQaeGgqCQDzJYHU-hx6zJQiQndnDA7wVuV4Nx3Auix1YgCcYgAHOSKValTdoG1T98KcqlTf1p57vrnYY0pX0U3FHkKdCyHBraSHNXYbDISDHeG4w0Cew01eoBaE0Xa2vRYLc-jycEhjhbG5S-4zkoi_-U87xvJ-2x-t1ps6O3LLjfpE3jGeFLoOx4nwruRr4hNmubslrf9n3ICu0uJvgj8lAVYlZTI_=s1024-rj')
    no-repeat center center;
  background-size: cover;
}

.glass-card {
  background: rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25) !important;
}

.titulo-dashboard {
  text-shadow: 0px 3px 12px rgba(0, 0, 0, 0.6);
}
</style>
