import { createContext, useEffect, useMemo, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authLogin, authMe } from "../api";

export const AuthContext = createContext(null)

const initial = { isLoading: true, user: null, token: null}

function reducer(state, action) {
  switch (action.type) {
    case 'RESTORE':
      return { ...state, token: action.token, user: action.user ?? null, isloading : false }
    case 'SIGN_IN' :
      return { ...state, token: action.token, user: action.user, isLoading: false}
    case 'SIgn_OUT':
      return { ...state, token: null, user: null, isloading: false }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial)

  // Restaurar el token al inciar la app.

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // opcional: validar token con /auth/me
          const user = await authMe().catch(() => null);
          dispatch({ type: 'RESTORE', token, user });
        } else {
          dispatch({ type: 'RESTORE', token: null, user: null });
        }
      } catch {
        dispatch({ type: 'RESTORE', token: null, user: null });
      }
    })();
  }, []);

  const actions = useMemo(() => ({
    signIn: async (username, password) => {
      const data = await authLogin({ username, password})
      await AsyncStorage.setItem('token', data.accessToken)
      dispatch({ type: 'SIGN_IN', token: data.accessToken, user: { id: data.id, username: data.username}})
    },
    signOut: async () => {
      await AsyncStorage.removeItem('token')
      dispatch({ type: 'SIGN_OUT'})
    }
  }), [])

  const value = useMemo(() => ({ ...state, ...actions }), [state, actions]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// auth flow carga el token, luego muestra una pantalla de bienvenida (splash), condiciona rutas en caso de ser necesario.
