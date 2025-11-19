import { api } from "boot/axios";

export default {
    login(email, senha) {
        return api.post('/login', { email, senha });
    },

    register(nome, email, senha) {
        return api.post('/register', { nome, email, senha });
    },
    logout() {
        localStorage.removeItem("token");
        window.location.href = "/#/login";
    }
};
