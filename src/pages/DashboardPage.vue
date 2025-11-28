<template>
  <q-page padding class="flex flex-center column q-gutter-lg">
    <div class="text-h4 text-center">Fazer Pedido</div>

    <q-card class="q-pa-xl" style="width: 420px; max-width: 90%">
      <q-card-section class="q-gutter-md">
        <!-- SELEÇÃO DO PRODUTO -->
        <q-select
          filled
          v-model="pedido.produto_id"
          :options="produtos"
          label="Selecione um produto"
          emit-value
          map-options
        />

        <!-- QUANTIDADE -->
        <q-input
          filled
          type="number"
          v-model.number="pedido.quantidade"
          label="Quantidade"
          min="1"
        />

        <!-- BOTÃO -->
        <q-btn
          color="primary"
          label="Fazer Pedido"
          class="full-width q-mt-md"
          @click="fazerPedido"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'DashboardPage',

  data() {
    return {
      produtos: [],

      pedido: {
        produto_id: null,
        quantidade: 1,
      },
    }
  },

  created() {
    this.carregarProdutos()
  },

  methods: {
    // ---------------------------------------------------
    // 1. BUSCAR PRODUTOS DA TABELA "produtos"
    // ---------------------------------------------------
    async carregarProdutos() {
      try {
        // --------- AJUSTE SUA API AQUI -------------------
        const resposta = await fetch('http://localhost:3000/produtos')
        const data = await resposta.json()
        // -------------------------------------------------

        this.produtos = data.map((p) => ({
          label: p.nome,
          value: p.id,
        }))
      } catch (erro) {
        console.error(erro)
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao carregar produtos',
        })
      }
    },

    // ---------------------------------------------------
    // 2. CRIAR O PEDIDO E SALVAR NA TABELA "pedidos"
    // ---------------------------------------------------
    async fazerPedido() {
      if (!this.pedido.produto_id) {
        this.$q.notify({ type: 'negative', message: 'Selecione um produto!' })
        return
      }

      if (this.pedido.quantidade < 1) {
        this.$q.notify({ type: 'negative', message: 'Quantidade inválida!' })
        return
      }

      try {
        // --------- AJUSTE SUA API AQUI -------------------
        const resposta = await fetch('http://localhost:3000/pedidos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.pedido),
        })
        // -------------------------------------------------

        if (!resposta.ok) throw new Error('Erro ao salvar pedido')

        this.$q.notify({
          type: 'positive',
          message: 'Pedido realizado com sucesso!',
        })

        // Resetar formulário
        this.pedido.produto_id = null
        this.pedido.quantidade = 1
      } catch (erro) {
        console.error(erro)
        this.$q.notify({
          type: 'negative',
          message: 'Não foi possível enviar o pedido',
        })
      }
    },
  },
}
</script>
