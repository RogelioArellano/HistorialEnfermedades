import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAB, IconButton } from 'react-native-paper'; // Importa el botón flotante

//Este componente es para mostrar y buscar los registros de enfermedades
const ListScreen = ({ navigation }) => {
    //Estados para almacenar registros y busqueda
    const [records, setRecords] = useState([]);
    const [search, setSearch] = useState('');

    // Cargar datos persistentes al iniciar
    useEffect(() => {
        const loadData = async () => {
            //TODO probar el async Storage
            const savedRecords = await AsyncStorage.getItem('records');
            if (savedRecords) {
                setRecords(JSON.parse(savedRecords)); // Cargar registros desde AsyncStorage
            } else {
                // Datos de prueba en caso de no haber registros XD
                const mockData = [
                    { 
                        id: '1', 
                        date: '2023-01-29', 
                        patient: 'Rogelio Arellano', 
                        doctor: 'DR. Simi', 
                        discomfort: 'Gripita', 
                        phone: '9987766543',
                        image: null
                    },
                    { 
                        id: '2', 
                        date: '2023-01-30', 
                        patient: 'Cruz Treviño de la Garza', 
                        doctor: 'Chapatin', 
                        discomfort: 'Mal de puerco',
                        phone: '1234567789',
                        image: null 
                    },
                ];
                setRecords(mockData);
                //Guardar datos en el asyncStorage TODO probar
                await AsyncStorage.setItem('records', JSON.stringify(mockData));
            }
        };
        loadData();
    }, []);

    // Función para eliminar un registro
  const handleDelete = (id) => {
    Alert.alert(
      'Eliminar Registro',
      '¿Estás seguro de que deseas eliminar este registro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            // Filtrar el registro a eliminar
            const updatedRecords = records.filter(record => record.id !== id);
            setRecords(updatedRecords);
            await AsyncStorage.setItem('records', JSON.stringify(updatedRecords));
          },
        },
      ],
      { cancelable: true }
    );
  };

    // Filtrar y ordenar registros
    const filteredRecords = records
        .filter((record) =>
            //Filtrar registros que coincidan con el termino en paciente, doctor o malestar
            record.patient.toLowerCase().includes(search.toLowerCase()) ||
            record.doctor.toLowerCase().includes(search.toLowerCase()) ||
            record.discomfort.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Orden descendente por fecha

    //Retornar la interfaz
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar"
                value={search}
                onChangeText={setSearch}
            />
            <FlatList
                data={filteredRecords}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image 
                            source={item.image ? { uri: item.image } : require('../default-image.png')}
                            style={styles.avatar}
                        />
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.patientName}>Paciente: {item.patient}</Text>
                            <Text style={styles.discomfort}>Malestar: {item.discomfort.substring(0, 50)}</Text>
                            <Text style={styles.doctor}>Doctor: {item.doctor}</Text>
                            <Text style={styles.phone}>Tél: {item.phone}</Text>
                        </View>
                        {/* Botón de eliminar */}
                        <IconButton
                        icon="delete"
                        color="#FF0000"
                        size={20}
                        onPress={() => handleDelete(item.id)}
                        />
                    </View>
                )}
            />
            {/* Botón flotante para nuevo registro */}
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    );
};

//Estilos del componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F8F9FA',
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
    },
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#007BFF', // Color del botón flotante
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    itemTextContainer: {
        flex: 1,
    },
    patientName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    discomfort: {
        fontSize: 14,
        color: '#666',
    },
    doctor: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    phone: {
        fontSize: 14,
        color: '#007BFF',
    },
});

export default ListScreen;