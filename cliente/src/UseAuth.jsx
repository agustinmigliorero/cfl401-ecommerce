import { createContext, useState, useEffect, useLayoutEffect } from "react";

const AuthContext = createContext();

const useAuth = () => {
  const [usuarioLogeado, setUsuarioLogeado] = useState({
    usuario: { id: "", nombre: "", esAdmin: false },
    logeado: false,
  });
  const [cargando, setCargando] = useState(true);

  async function fetchUsuarioLogeado() {
    const respuesta = await fetch(
      "http://localhost:3000/usuarios/usuario-logeado",
      {
        credentials: "include",
      }
    );
    const usuario = await respuesta.json();
    setUsuarioLogeado(usuario);
    setCargando(false);
  }

  useLayoutEffect(() => {
    fetchUsuarioLogeado();
    console.log(usuarioLogeado);
  }, []);

  // useEffect(() => {
  //   fetchUsuarioLogeado();
  //   console.log(usuarioLogeado);
  // }, []);

  return {
    usuarioLogeado,
    setUsuarioLogeado,
    cargando,
  };
};

const AuthProvider = ({ children }) => {
  const { usuarioLogeado, setUsuarioLogeado, cargando } = useAuth();

  if (cargando) {
    return <h1>Cargando...</h1>;
  }

  return (
    <AuthContext.Provider value={{ usuarioLogeado, setUsuarioLogeado }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };

// import { createContext, useState, useContext, useEffect } from "react";

// const AuthContext = createContext({});

// const useAuth = () => {
//   const auth = useContext(AuthContext);
//   return auth;
// };

// const AuthProvider = ({ children }) => {
//   const [usuarioLogeado, setUsuarioLogeado] = useState({ logeado: false });

//   async function fetchUsuarioLogeado() {
//     const respuesta = await fetch(
//       "http://localhost:3000/usuarios/usuario-logeado",
//       {
//         credentials: "include",
//       }
//     );
//     const usuario = await respuesta.json();
//     setUsuarioLogeado(usuario);
//   }

//   //   fetchUsuarioLogeado();

//   useEffect(() => {
//     fetchUsuarioLogeado();
//     console.log(usuarioLogeado);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ usuarioLogeado, setUsuarioLogeado }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthProvider, useAuth };
