import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecordCard = ({ date, patient, discomfort }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.patient}>{patient}</Text>
      <Text style={styles.discomfort}>{discomfort.substring(0, 50)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  patient: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  discomfort: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
});

export default RecordCard;