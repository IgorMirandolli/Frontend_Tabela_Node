<template>
  <q-page padding>
    <div class="row items-center justify-between q-mb-md">
      <div class="row items-center">
        <q-btn flat round dense icon="arrow_back" class="q-mr-sm" @click="$router.back()" />
        <div class="text-h5">Gerenciamento de Pedidos</div>
      </div>

      <q-btn color="primary" label="Novo Pedido" @click="abrirModal()" />
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-6">
        <q-input
          filled
          v-model="filtroBusca"
          label="Buscar pedidos"
          debounce="300"
          clearable
          prefix="🔍"
        />
      </div>

      <div class="col-12 col-md-4">
        <q-select
          filled
          v-model="filtroStatus"
          label="Status"
          :options="['TODOS', 'ABERTO', 'PAGO', 'CANCELADO']"
        />
      </div>
    </div>

    <q-table title="Pedidos" :rows="pedidosFiltrados" :columns="columns" row-key="id" flat bordered>
      <template v-slot:body-cell-acoes="props">
        <q-td>
          <q-btn flat size="sm" icon="edit" color="primary" @click="editar(props.row)" />
          <q-btn flat size="sm" icon="delete" color="negative" @click="excluir(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="modalAberto">
      <q-card style="width: 450px; max-width: 90vw">
        <q-card-section>
          <div class="text-h6">{{ editando ? 'Editar Pedido' : 'Novo Pedido' }}</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-select
            filled
            label="Produto"
            :options="produtosSelect"
            v-model="form.id_produto"
            emit-value
            map-options
          />

          <q-input filled type="number" label="Quantidade" v-model="form.quantidade" />

          <q-input filled type="number" label="Valor Total" v-model="form.valor_total" />

          <q-input filled type="date" label="Data do Pedido" v-model="form.data_pedido" />

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

      filtroBusca: '',
      filtroStatus: 'TODOS',

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

        {
          name: 'valor_total',
          label: 'Valor Total',
          field: 'valor_total',
          format: (val) => (val != null ? 'R$ ' + Number(val).toFixed(2).replace('.', ',') : '—'),
        },

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

  computed: {
    pedidosFiltrados() {
      let lista = [...this.pedidos]

      if (this.filtroBusca.trim() !== '') {
        const busca = this.filtroBusca.toLowerCase()

        lista = lista.filter(
          (pedido) =>
            String(pedido.id).includes(busca) ||
            String(pedido.id_produto).includes(busca) ||
            String(pedido.status).toLowerCase().includes(busca),
        )
      }

      if (this.filtroStatus !== 'TODOS') {
        lista = lista.filter((p) => p.status === this.filtroStatus)
      }

      return lista
    },
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

    excluir(id) {
      this.$q
        .dialog({
          title: 'Confirmar Exclusão',
          message: 'Tem certeza que deseja excluir este pedido?',
          ok: {
            label: 'Excluir',
            color: 'negative',
          },
          cancel: {
            label: 'Cancelar',
            flat: true,
          },
        })
        .onOk(async () => {
          await api.delete(`/pedidos/${id}`)
          this.carregarPedidos()
        })
    },
  },
}
</script>
