import { authRepository } from "../repositories/authRepository";

export const authService = {
    registrar: function (nombre, contrasena) {
        if (!nombre || nombre.trim() === "") {
            return Promise.reject(new Error("El nombre es obligatorio"));
        }
        if (!contrasena || contrasena.length < 6) {
            return Promise.reject(new Error("La contraseña debe tener al menos 6 caracteres"));
        }
        return authRepository.registrar(nombre.trim(), contrasena);
    },

    login: function (correo, contrasena) {
        if (!correo || !contrasena) {
            return Promise.reject(new Error("El correo y la contraseña son obligatorios"));
        }
        return authRepository.login(correo.trim().toLowerCase(), contrasena);
    }
};