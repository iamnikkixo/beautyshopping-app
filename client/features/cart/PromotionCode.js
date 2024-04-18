import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Input } from 'react-native-elements';
import COLORS from '../../assets/shared/colors/colors';

const PromotionCode = () => {
  const discount = 'discount';
  const [promocode, setPromocode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const applyPromoCode = () => {
    if (promocode !== discount) {
      setErrorMessage('Invalid promo code. Please try again.');
    } else {
      setErrorMessage('Discount applied successfully!');
    }
  };

  return (
    <View style={{ marginTop: 30 }}>
      <View>
        <Text style={{ fontSize: 16, fontFamily: 'Nunito-SemiBold' }}>
          Promotion Code
        </Text>
      </View>
      <View style={styles.promoContainer}>
        <Input
          placeholder="Enter promo code here"
          style={{
            fontSize: 14,
            alignItems: 'center',
            fontFamily: 'Nunito-Regular',
          }}
          value={promocode}
          onChangeText={setPromocode}
          containerStyle={styles.inputContainer}
          inputContainerStyle={{
            borderBottomWidth: 0,
            height: 50,
          }}
        />
        <Pressable onPress={applyPromoCode}>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.grey,
              fontFamily: 'Nunito-SemiBold',
            }}
          >
            APPLY
          </Text>
        </Pressable>
      </View>
      <View style={{ marginLeft: 20, marginTop: 5 }}>
        <Text
          style={{
            fontSize: 12,
            color: errorMessage.includes('successfully') ? 'green' : 'red',
          }}
        >
          {errorMessage}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  promoContainer: {
    marginTop: 15,
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: COLORS.grey,
  },
  inputContainer: {
    width: '80%',
    height: 50,
  },
});

export default PromotionCode;
