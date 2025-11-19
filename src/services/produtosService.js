import { api } from "boot/axios"; // usa axios configurado pelo Quasar

export default {
    listar() {
        return api.get("/crud/produtos");
    },

    criar(produto) {
        return api.post("/crud/produtos", produto);
    },

    atualizar(id, produto) {
        return api.put(`/crud/produtos/${id}`, produto);
    },

    deletar(id) {
        return api.delete(`/crud/produtos/${id}`);
    }
};
