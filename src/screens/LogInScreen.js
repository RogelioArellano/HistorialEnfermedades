import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

//Componente para manejar autenticación de usuarios
const LoginScreen = ({ navigation }) => {
    //Almacenar credneciales
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Manejar el inicio de sesión
    const handleLogin = () => {
        if (email === 'jhon@mail.com' && password === '77@15') {
            navigation.navigate('List');
        } else {
            Alert.alert('Error', 'Credenciales incorrectas');
        }
    };

    //Validaciones de credenciales
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isPasswordValid = password.length > 0;

    //Retornar la interfaz del usser con de acuerdo a lo asignado
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                maxLength={100}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                maxLength={100}
            />
            <Button
                title="Iniciar Sesión"
                onPress={handleLogin}
                disabled={!isEmailValid || !isPasswordValid}
            />
        </View>
    );
};

//Estilos del componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default LoginScreen;