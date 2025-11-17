import { api } from "boot/axios"; // usa axios configurado pelo Quasar

export default {
    listar() {
        return api.get("/produtos");
    },

    criar(produto) {
        return api.post("/produtos", produto);
    },

    atualizar(id, produto) {
        return api.put(`/produtos/${id}`, produto);
    },

    deletar(id) {
        return api.delete(`/produtos/${id}`);
    }
};
