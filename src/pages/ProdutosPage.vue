<template>
  <q-page padding>
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">Gerenciamento de Produtos</div>
      <q-btn color="primary" label="Novo Produto" @click="abrirModal()" />
    </div>

    <q-table title="Produtos" :rows="produtos" :columns="colunas" row-key="id" flat bordered>
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
          <q-btn dense flat icon="delete" color="red" @click="deletarProduto(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <!-- MODAL -->
    <q-dialog v-model="modalAberto">
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

          <!-- toggle corrigido -->
          <q-toggle v-model="produtoEditando.ativo" label="Ativo?" true-value="1" false-value="0" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Salvar" @click="salvarProduto" />
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
      modalAberto: false,
      produtoEditando: {},

      colunas: [
        { name: 'id', label: 'ID', field: 'id', align: 'left' },
        { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
        { name: 'preco', label: 'Preço', field: 'preco', align: 'right' },
        { name: 'quantidade', label: 'Quantidade', field: 'quantidade', align: 'right' },
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
      produtosService.listar().then((resp) => {
        this.produtos = resp.data
      })
    },

    abrirModal(produto = null) {
      this.produtoEditando = produto
        ? { ...produto }
        : { nome: '', preco: 0, quantidade: 0, ativo: 1 }

      this.modalAberto = true
    },

    salvarProduto() {
      const payload = {
        ...this.produtoEditando,
        preco: Number(this.produtoEditando.preco),
        quantidade: Number(this.produtoEditando.quantidade),
        ativo: Number(this.produtoEditando.ativo),
      }

      if (payload.id) {
        produtosService.atualizar(payload.id, payload).then(() => {
          this.listarProdutos()
          this.modalAberto = false
        })
      } else {
        produtosService.criar(payload).then(() => {
          this.listarProdutos()
          this.modalAberto = false
        })
      }
    },

    deletarProduto(id) {
      produtosService.deletar(id).then(() => this.listarProdutos())
    },
  },
}
</script>
