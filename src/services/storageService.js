import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveRecord = async (record) => {
  try {
    const savedRecords = await AsyncStorage.getItem('records');
    const records = savedRecords ? JSON.parse(savedRecords) : [];
    records.push(record);
    await AsyncStorage.setItem('records', JSON.stringify(records));
    return true;
  } catch (error) {
    console.error('Error saving record:', error);
    return false;
  }
};

export const getRecords = async () => {
  try {
    const savedRecords = await AsyncStorage.getItem('records');
    return savedRecords ? JSON.parse(savedRecords) : [];
  } catch (error) {
    console.error('Error fetching records:', error);
    return [];
  }
};