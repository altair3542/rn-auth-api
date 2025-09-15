import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE = "https://dummyjson.com";

// Inicia sesión y devuelve el JSON de DummyJSON
export async function authLogin({ username, password }) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, expiresInMins: 30 }),
  });
  if (!res.ok) throw new Error("Credenciales inválidas");
  return res.json(); // { accessToken, ...user }
}

// Valida token y retorna el usuario
export async function authMe(tokenArg) {
  const token = tokenArg ?? (await AsyncStorage.getItem("token"));
  if (!token) throw new Error("Sin token");
  const res = await fetch(`${BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Token inválido");
  return res.json();
}

export async function getProducts({ limit = 10, skip = 0 } = {}) {
  const res = await fetch(`${BASE}/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error("Error cargando productos");
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error("No se encuentra el producto");
  return res.json();
}
