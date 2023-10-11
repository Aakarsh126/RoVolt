import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';
import { Feather } from 'react-native-vector-icons'
import commonStyles from './../../../styles';

const ChartModal = ({ visible, xData, yData, closeModal }) => {
  const step = Math.ceil(xData.length / 5); // calculate step between X values
  const xLabels = xData.filter((_, index) => index % step === 0); // create new array of X labels
  return (                                    
    <Modal visible={visible} animationType="slide">

    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'black',
    flex: 1,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    padding: 10,
  },
  modalBody: {
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default ChartModal;
