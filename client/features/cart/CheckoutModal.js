import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CheckoutModal = () => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Icon
            name="check-circle"
            type="material-community"
            size={100}
            color="#198754"
          />

          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
            }}
          >
            Payment confirmed!
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 7 }}>
            Your beauty products are on their way!
          </Text>
          <Button
            title="View Order"
            buttonContainer={styles.modalBtnContainer}
            buttonStyle={styles.modalBtnStyle}
            onPress={handleClose()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CheckoutModal;

const styles = StyleSheet.create({});
