import { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { AuthContext } from './AuthContext';

export default function LoginScreen() {
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState('emilys');      // demo user
  const [password, setPassword] = useState('emilyspass');  // demo pass
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await signIn(username.trim(), password.trim());
    } catch (e) {
      Alert.alert('Error', e.message || 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Ingresar</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario (ej: emilys)"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña (ej: emilyspass)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable style={[styles.btn, loading && { opacity: 0.6 }]} onPress={onSubmit} disabled={loading}>
        <Text style={styles.btnText}>{loading ? 'Ingresando...' : 'Entrar'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  h1: { fontSize: 22, fontWeight: '800', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 10, padding: 12, marginBottom: 12 },
  btn: { backgroundColor: '#244b5d', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
});
