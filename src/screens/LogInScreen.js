import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


//Componente para manejar autenticación de usuarios
const LoginScreen = ({ navigation }) => {
    //Almacenar credneciales
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Verificar si el usuario ya inició sesión al cargar la pantalla
    useEffect(() => {
        const checkLoginStatus = async () => {
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if (isLoggedIn === 'true') {
                navigation.navigate('List'); // Redirigir a la pantalla de Listado
            }
        };
        checkLoginStatus();
    }, [navigation]);

    //Manejar el inicio de sesión
    const handleLogin = () => {
        if (email === 'jhon@mail.com' && password === '77@1$') {
            navigation.navigate('List');
        } else {
            Alert.alert('Error', 'Credenciales incorrectas');
        }
    };

    //Validaciones de credenciales
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isPasswordValid = password.length > 0;

    //Retornar la interfaz del user de acuerdo a lo asignado
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
            {!isEmailValid && email.length > 0 && (
                <Text style={styles.errorText}>Ingrese un email válido</Text>
            )}
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
    errorText: {
        color: 'red',
        marginBottom: 12,
    },
});

export default LoginScreen;