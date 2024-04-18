import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import COLORS from '../../assets/shared/colors/colors';

const TotalContainer = ({ navigation }) => {
  const cartTotalCost = useSelector((state) => state.cart.cartTotalCost);

  return (
    <View styles={styles.totalContainer}>
      <View style={{ marginTop: 20, marginBottom: 25 }}>
        <View style={styles.subTotalContainer}>
          <Text style={styles.labelText}>Subtotal</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.dollarText}> {'\u0024'}</Text>
            <Text style={styles.valueText}>{cartTotalCost}</Text>
          </View>
        </View>
        <View style={styles.subTotalContainer}>
          <Text style={styles.labelText}>Discount</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.dollarText}>- {'\u0024'}</Text>
            <Text style={styles.valueText}>0</Text>
          </View>
        </View>
        <View style={styles.subTotalContainer}>
          <Text style={styles.labelText}>Shipping</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.dollarText}> {'\u0024'}</Text>
            <Text style={styles.valueText}>0</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 0.75,
            borderBottomColor: COLORS.green,
            marginVertical: 10,
          }}
        />
        <View style={styles.subTotalContainer}>
          <Text style={styles.labelText}>Total</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.dollarText}> {'\u0024'}</Text>
            <Text style={styles.valueText}>{cartTotalCost}</Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
            titleStyle={{
              fontSize: 13,
              letterSpacing: 1.5,
              color: COLORS.white,
            }}
            title="Checkout"
            onPress={() => navigation.navigate('checkout')}
          />
        </View>
      </View>
    </View>
  );
};

export default TotalContainer;

const styles = StyleSheet.create({
  totalContainer: {
    flex: 1,
  },
  subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
  },
  dollarText: {
    color: COLORS.yellow,
  },
  valueText: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
  },
  buttonContainer: {
    borderRadius: 10,
  },
  buttonStyle: {
    paddingVertical: 12,
    backgroundColor: COLORS.green,
  },
});
