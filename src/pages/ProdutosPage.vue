<template>
  <q-page padding>
    <!-- TOPO -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">Gerenciamento de Produtos</div>
      <q-btn color="primary" label="Novo Produto" @click="abrirModal()" />
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-6">
        <q-input
          dense
          clearable
          v-model="filtroBusca"
          label="Buscar por nome"
          debounce="400"
          :loading="carregando"
          @update:model-value="filtrarTabela"
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-md-3">
        <q-select
          dense
          v-model="filtroStatus"
          :options="opcoesStatus"
          label="Status"
          clearable
          emit-value
          map-options
          @update:model-value="filtrarTabela"
        />
      </div>
    </div>

    <q-table
      title="Produtos"
      :rows="produtosFiltrados"
      :columns="colunas"
      row-key="id"
      flat
      bordered
      :loading="carregando"
      :pagination="paginacao"
      @update:pagination="paginacao = $event"
      class="shadow-2 rounded-borders"
    >
      <template v-slot:body-cell-ativo="props">
        <q-td>
          <q-badge :color="props.row.ativo == 1 ? 'green' : 'red'">
            {{ props.row.ativo == 1 ? 'Ativo' : 'Inativo' }}
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-acoes="props">
        <q-td>
          <q-btn dense flat icon="edit" color="primary" @click="abrirModal(props.row)" />
          <q-btn dense flat icon="delete" color="red" @click="confirmarExclusao(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="modalAberto" transition-show="scale" transition-hide="scale">
      <q-card style="width: 400px">
        <q-card-section class="text-h6">
          {{ produtoEditando.id ? 'Editar Produto' : 'Novo Produto' }}
        </q-card-section>

        <q-card-section>
          <q-input filled v-model="produtoEditando.nome" label="Nome" />

          <q-input filled v-model.number="produtoEditando.preco" type="number" label="Preço" />

          <q-input
            filled
            v-model.number="produtoEditando.quantidade"
            type="number"
            label="Quantidade"
          />

          <q-toggle v-model="produtoEditando.ativo" label="Ativo?" true-value="1" false-value="0" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Salvar" :loading="loadingSalvar" @click="salvarProduto" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import produtosService from 'src/services/produtosService'

export default {
  data() {
    return {
      produtos: [],
      produtosFiltrados: [],
      modalAberto: false,
      carregando: false,
      loadingSalvar: false,
      produtoEditando: {},

      filtroBusca: '',
      filtroStatus: null,
      opcoesStatus: [
        { label: 'Ativo', value: 1 },
        { label: 'Inativo', value: 0 },
      ],

      paginacao: {
        page: 1,
        rowsPerPage: 10,
      },

      colunas: [
        { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
        { name: 'nome', label: 'Nome', field: 'nome', align: 'left', sortable: true },

        {
          name: 'preco',
          label: 'Preço',
          field: (row) => row.preco,
          align: 'right',
          sortable: true,
          format: (val) =>
            Number(val).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }),
        },

        {
          name: 'quantidade',
          label: 'Quantidade',
          field: 'quantidade',
          align: 'right',
          sortable: true,
        },

        { name: 'ativo', label: 'Ativo', field: 'ativo', align: 'center' },
        { name: 'acoes', label: 'Ações', field: 'acoes', align: 'center' },
      ],
    }
  },

  mounted() {
    this.listarProdutos()
  },

  methods: {
    listarProdutos() {
      this.carregando = true
      produtosService.listar().then((resp) => {
        this.produtos = resp.data
        this.produtosFiltrados = resp.data
        this.carregando = false
      })
    },

    filtrarTabela() {
      let dados = [...this.produtos]

      if (this.filtroBusca) {
        const busca = this.filtroBusca.toLowerCase()
        dados = dados.filter((p) => p.nome.toLowerCase().includes(busca))
      }

      if (this.filtroStatus !== null && this.filtroStatus !== undefined) {
        dados = dados.filter((p) => Number(p.ativo) === Number(this.filtroStatus))
      }

      this.produtosFiltrados = dados
    },

    abrirModal(produto = null) {
      this.produtoEditando = produto
        ? { ...produto }
        : { nome: '', preco: 0, quantidade: 0, ativo: 1 }

      this.modalAberto = true
    },

    salvarProduto() {
      this.loadingSalvar = true

      const payload = {
        ...this.produtoEditando,
        preco: Number(this.produtoEditando.preco),
        quantidade: Number(this.produtoEditando.quantidade),
        ativo: Number(this.produtoEditando.ativo),
      }

      const acao = payload.id
        ? produtosService.atualizar(payload.id, payload)
        : produtosService.criar(payload)

      acao
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: payload.id ? 'Produto atualizado!' : 'Produto criado!',
          })

          this.modalAberto = false
          this.listarProdutos()
        })
        .catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'Erro ao salvar!',
          })
        })
        .finally(() => {
          this.loadingSalvar = false
        })
    },

    confirmarExclusao(id) {
      this.$q
        .dialog({
          title: 'Confirmar exclusão',
          message: 'Tem certeza que deseja apagar este produto?',
          cancel: true,
          persistent: true,
          ok: {
            label: 'Sim',
            color: 'red',
          },
        })
        .onOk(() => {
          produtosService
            .deletar(id)
            .then(() => {
              this.$q.notify({
                type: 'positive',
                message: 'Produto apagado com sucesso!',
              })
              this.listarProdutos()
            })
            .catch(() => {
              this.$q.notify({
                type: 'negative',
                message: 'Erro ao apagar produto!',
              })
            })
        })
    },
  },
}
</script>
