import { createContext, useContext, useState, useEffect } from "react";

const RolContext = createContext();

const CLAVE_STORAGE = "sesion";

export function RolProvider({ children }) {
    const [sesion, setSesion] = useState(function () {
        const guardada = localStorage.getItem(CLAVE_STORAGE);
        return guardada ? JSON.parse(guardada) : null;
    });

    useEffect(() => {
        if (sesion) {
            localStorage.setItem(CLAVE_STORAGE, JSON.stringify(sesion));
        } else {
            localStorage.removeItem(CLAVE_STORAGE);
        }
    }, [sesion]);

    function iniciarSesion({ token, usuario }) {
        setSesion({ token, usuario });
    }

    function cerrarSesion() {
        setSesion(null);
    }

    const valor = {
        usuario: sesion ? sesion.usuario : null,
        token: sesion ? sesion.token : null,
        rol: sesion ? sesion.usuario.rol : null,       // se mantiene "rol" para no romper el resto del código existente
        estaAutenticado: Boolean(sesion),
        iniciarSesion,
        cerrarSesion
    };

    return <RolContext.Provider value={valor}>{children}</RolContext.Provider>;
}

export function useRol() {
    return useContext(RolContext);
}