// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, AuthContext } from "./src/auth/AuthContext";
import LoginScreen from "./src/auth/LoginScreen";
import SplashScreen from "./src/auth/SplashScreen";
import ProductsScreen from "./src/products/ProductsScreen";
import ProductDetailScreen from "./src/products/ProductDetailScreen";
import { useContext } from "react";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { isLoading, token } = useContext(AuthContext);

  if (isLoading) return <SplashScreen />;

  return (
    <Stack.Navigator>
      {token ? (
        <>
          <Stack.Screen name="Products" component={ProductsScreen} options={{ title: "Productos" }} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: "Detalle" }} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Iniciar sesión" }} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
