import { createContext, useEffect, useMemo, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authLogin, authMe } from "../api";

export const AuthContext = createContext(null);

const initial = { isLoading: true, user: null, token: null };

function reducer(state, action) {
  switch (action.type) {
    case "RESTORE":
      return { ...state, token: action.token ?? null, user: action.user ?? null, isLoading: false };
    case "SIGN_IN":
      return { ...state, token: action.token, user: action.user, isLoading: false };
    case "SIGN_OUT":
      return { ...state, token: null, user: null, isLoading: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  // Restaurar sesión al arrancar la app
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("token");
        if (!saved) {
          dispatch({ type: "RESTORE", token: null, user: null });
          return;
        }
        const me = await authMe(saved); // valida el token
        dispatch({ type: "RESTORE", token: saved, user: me });
      } catch (e) {
        // token inválido/expirado, limpiar
        await AsyncStorage.removeItem("token");
        dispatch({ type: "RESTORE", token: null, user: null });
      }
    })();
  }, []);

  const actions = useMemo(
    () => ({
      signIn: async (username, password) => {
        const data = await authLogin({ username, password });
        // DummyJSON retorna accessToken
        await AsyncStorage.setItem("token", data.accessToken);
        dispatch({
          type: "SIGN_IN",
          token: data.accessToken,
          user: { id: data.id, username: data.username },
        });
      },
      signOut: async () => {
        await AsyncStorage.removeItem("token");
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    []
  );

  const value = useMemo(() => ({ ...state, ...actions }), [state, actions]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
