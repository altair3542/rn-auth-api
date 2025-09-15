# 📱 RN Auth API Demo

Proyecto educativo en **React Native (Expo)** para practicar **autenticación** y **consumo de APIs REST**.  
Se desarrolló en clase como un medio-app de ejemplo: login con token, validación de sesión y listado/detalle de productos.

---

## 🚀 Tecnologías

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- Context API + Reducer (manejo de sesión)
- AsyncStorage (persistencia de token)
- API de [DummyJSON](https://dummyjson.com/)

---

## ⚙️ Instalación

1. Clonar el repo:
   ```bash
   git clone https://github.com/tuusuario/rn-auth-api.git
   cd rn-auth-api
   ```

2. Instalar dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Iniciar proyecto con Expo:
   ```bash
   npx expo start
   ```

4. Escanear QR en Expo Go (iOS/Android) o abrir en emulador.

---

## 🔑 Credenciales de prueba

Usamos el endpoint de autenticación de DummyJSON.  
Ejemplo de usuario válido:

- **Usuario:** `emilys`  
- **Contraseña:** `emilyspass`

📌 Más usuarios de prueba: [DummyJSON Auth](https://dummyjson.com/docs/auth)

---

## 📂 Estructura principal

```
rn-auth-api/
├── App.js
├── src/
│   ├── api.js              # llamadas a la API
│   ├── auth/
│   │   ├── AuthContext.js  # contexto de autenticación
│   │   ├── LoginScreen.js
│   │   ├── SplashScreen.js
│   └── products/
│       ├── ProductsScreen.js
│       ├── ProductDetailScreen.js
└── README.md
```

---

## 🧑‍🏫 Notas para estudiantes

- El **AuthContext** controla el estado global de sesión (`isLoading`, `token`, `user`).
- `SplashScreen` se muestra hasta que se resuelve si existe un token válido.
- Al hacer login se guarda el `accessToken` en **AsyncStorage**.
- En **signOut** se elimina el token y se vuelve a la pantalla de login.

---

## 🛠️ Scripts útiles

```bash
# Ejecutar app
npx expo start

# Limpiar caché de metro bundler
npx expo start -c
```

---

## ✨ Próximos pasos

- Validar errores en el login (mostrar mensajes al usuario).
- Agregar paginación infinita a la lista de productos.
- Proteger rutas con `PrivateRoute` (stack navigator).
- Implementar CRUD de productos.

---

## 👨‍🏫 Autor

Proyecto didáctico desarrollado en clase de **Lógica y Desarrollo de Software**.  
Profesor: **[Tu Nombre]**
