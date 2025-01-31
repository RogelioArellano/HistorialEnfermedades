import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAB } from 'react-native-paper'; // Importa el botón flotante

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
                    { id: '1', date: '2023-01-29', patient: 'Rogelio Arellano', doctor: 'DR. Simi', discomfort: 'Gripita' },
                    { id: '2', date: '2023-01-30', patient: 'Cruz Treviño de la Garza', doctor: 'Chapatin', discomfort: 'Mal de puerco' },
                ];
                setRecords(mockData);
                //Guardar datos en el asyncStorage TODO probar
                await AsyncStorage.setItem('records', JSON.stringify(mockData));
            }
        };
        loadData();
    }, []);

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
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{item.date} - {item.patient}</Text>
                        <Text style={styles.itemText}>{item.discomfort.substring(0, 50)}</Text>
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
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
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
});

export default ListScreen;