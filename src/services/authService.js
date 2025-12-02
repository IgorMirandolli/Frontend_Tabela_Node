
import { api } from "boot/axios";

export default {
    login(email, senha) {
        return api.post("/login", { email, senha })
            .then(res => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);
                return res;
            })
            .catch(err => {
                throw err;
            });
    },

    register(nome, email, senha, confirmarSenha) {
        return api.post("/register", { nome, email, senha, confirmarSenha })
            .catch(err => {
                throw err;
            });
    },

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/#/login";
    }
};
