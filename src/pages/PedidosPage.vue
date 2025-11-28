<template>
  <q-page padding>
    <!-- TOPO -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">Gerenciamento de Pedidos</div>
      <q-btn color="primary" label="Novo Pedido" @click="abrirModal()" />
    </div>

    <!-- TABELA DE PEDIDOS -->
    <q-table title="Pedidos" :rows="pedidos" :columns="columns" row-key="id" flat bordered>
      <template v-slot:body-cell-acoes="props">
        <q-td>
          <q-btn flat size="sm" icon="edit" color="primary" @click="editar(props.row)" />
          <q-btn flat size="sm" icon="delete" color="negative" @click="excluir(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <!-- MODAL -->
    <q-dialog v-model="modalAberto">
      <q-card style="width: 450px; max-width: 90vw">
        <q-card-section>
          <div class="text-h6">{{ editando ? 'Editar Pedido' : 'Novo Pedido' }}</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <!-- PRODUTO -->
          <q-select
            filled
            label="Produto"
            :options="produtosSelect"
            v-model="form.id_produto"
            emit-value
            map-options
          />

          <!-- QUANTIDADE -->
          <q-input filled type="number" label="Quantidade" v-model="form.quantidade" />

          <!-- VALOR TOTAL -->
          <q-input filled type="number" label="Valor Total" v-model="form.valor_total" />

          <!-- DATA -->
          <q-input filled type="date" label="Data do Pedido" v-model="form.data_pedido" />

          <!-- STATUS -->
          <q-select
            filled
            label="Status"
            v-model="form.status"
            :options="['ABERTO', 'PAGO', 'CANCELADO']"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey" v-close-popup />
          <q-btn color="primary" label="Salvar" @click="salvar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'

export default {
  data() {
    return {
      pedidos: [],
      produtosSelect: [],

      modalAberto: false,
      editando: false,

      form: {
        id: null,
        id_produto: null,
        quantidade: null,
        valor_total: null,
        data_pedido: null,
        status: 'ABERTO',
      },

      columns: [
        { name: 'id', label: 'ID', field: 'id', align: 'left' },
        { name: 'id_produto', label: 'Produto', field: 'id_produto' },
        { name: 'quantidade', label: 'Qtd', field: 'quantidade' },
        { name: 'valor_total', label: 'Valor Total', field: 'valor_total' },
        { name: 'data_pedido', label: 'Data', field: 'data_pedido' },
        { name: 'status', label: 'Status', field: 'status' },
        { name: 'acoes', label: 'Ações', field: 'acoes' },
      ],
    }
  },

  mounted() {
    this.carregarPedidos()
    this.carregarProdutos()
  },

  methods: {
    async carregarPedidos() {
      const { data } = await api.get('/pedidos')
      this.pedidos = data
    },

    async carregarProdutos() {
      const { data } = await api.get('/produtos')
      this.produtosSelect = data.map((p) => ({
        label: p.nome,
        value: p.id,
      }))
    },

    abrirModal() {
      this.editando = false
      this.form = {
        id: null,
        id_produto: null,
        quantidade: null,
        valor_total: null,
        data_pedido: null,
        status: 'ABERTO',
      }
      this.modalAberto = true
    },

    editar(row) {
      this.editando = true
      this.form = { ...row }

      if (this.form.data_pedido) {
        this.form.data_pedido = this.form.data_pedido.split('T')[0]
      }

      this.modalAberto = true
    },

    async salvar() {
      if (this.editando) {
        await api.put(`/pedidos/${this.form.id}`, this.form)
      } else {
        await api.post('/pedidos', this.form)
      }

      this.modalAberto = false
      this.carregarPedidos()
    },

    async excluir(id) {
      if (confirm('Tem certeza que deseja excluir este pedido?')) {
        await api.delete(`/pedidos/${id}`)
        this.carregarPedidos()
      }
    },
  },
}
</script>
