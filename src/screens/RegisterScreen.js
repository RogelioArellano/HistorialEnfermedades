import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, Image, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Componente para capturar y guardar registros de enfermedades
const RegisterScreen = ({ navigation }) => {
    //Estados para manejar los datos del formulario
  const [date, setDate] = useState(new Date());
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [phone, setPhone] = useState('');
  const [discomfort, setDiscomfort] = useState('');
  const [image, setImage] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  //Función para abrir camara y capturar la imagen de referencia acorde a las anotaciones
  const takePhoto = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && response.assets) {
        //Aqui se guarda la imagen
        setImage(response.assets[0].uri);
      }
    });
  };

  //Función que valida y guarda el registro
  const handleSave = async () => {
    if (!patient || !doctor || !phone || !discomfort || !image) {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }

    if (!/^\d+$/.test(phone)) {
      Alert.alert('Error', 'El teléfono debe contener solo números');
      return;
    }

    //Crear el registro con los datos del formulario
    const newRecord = {
      id: Date.now().toString(),
      date: date.toISOString().split('T')[0],
      patient,
      doctor,
      phone,
      discomfort,
      image,
    };

    try {
        //Obtener registros del asyncStorage
      const savedRecords = await AsyncStorage.getItem('records');
      const records = savedRecords ? JSON.parse(savedRecords) : [];
      records.push(newRecord);
      await AsyncStorage.setItem('records', JSON.stringify(records));
      navigation.navigate('List');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el registro');
    }
  };

  //Retorna interfaz
  return (
    <View style={styles.container}>
      <Button title="Seleccionar fecha" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            setDate(selectedDate || date);
          }}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Paciente"
        value={patient}
        onChangeText={setPatient}
        maxLength={150}
      />
      <TextInput
        style={styles.input}
        placeholder="Doctor"
        value={doctor}
        onChangeText={setDoctor}
        maxLength={150}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        maxLength={10}
      />
      <TextInput
        style={styles.input}
        placeholder="Malestar"
        value={discomfort}
        onChangeText={setDiscomfort}
        multiline
        maxLength={1024}
      />
      <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
        <Text style={styles.imageButtonText}>Tomar foto</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  imageButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 12,
  },
  imageButtonText: {
    color: 'white',
    fontSize: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
});

export default RegisterScreen;