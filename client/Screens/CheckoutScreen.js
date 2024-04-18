import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import COLORS from '../assets/shared/colors/colors';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Pressable,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
const halfWidth = Dimensions.get('window').width / 2 - 35;
import { clearCart } from '../features/cart/cartSlice';
import { checkoutAsync } from '../features/actions/checkoutSlice';
import * as Animatable from 'react-native-animatable';
import { baseURL } from '../assets/shared/baseURL';

const CheckoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [modalVisible, setModalVisible] = useState(false);

  const cartTotalCost = useSelector((state) => state.cart.cartTotalCost);

  const handleOrder = () => {
    setModalVisible((prevmodalVisible) => !prevmodalVisible);
    dispatch(checkoutAsync());
    dispatch(clearCart());
  };

  const Card = ({ product }) => {
    const { img, name, price } = product.product;
    return (
      <Animatable.View animation="bounceIn" duration={2500} delay={500}>
        <Pressable onPress={() => navigation.navigate('details', product)}>
          <View style={styles.card}>
            <View style={{ height: 200 }}>
              <Image
                source={{ uri: baseURL + 'images/' + img }}
                style={styles.image}
              />
            </View>
            <View style={{ paddingHorizontal: 5 }}>
              <Text
                style={styles.productNameText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {name}
              </Text>
              <Text style={styles.priceText}>
                {'\u0024'}
                {price}
              </Text>
            </View>
          </View>
        </Pressable>
      </Animatable.View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ' white' }}>
      <View style={styles.headerContainer}>
        <Icon
          name="arrow-left"
          type="material-community"
          size={25}
          color={COLORS.green}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Checkout</Text>
        <View style={{ width: 25 }} />
      </View>

      <View style={{ flex: 1, padding: 18 }}>
        <View style={{ flex: 1, paddingBottom: 55 }}>
          <Text style={styles.subHeaderText}>Delivery Address</Text>

          <View
            style={{
              justifyContent: 'space-between',
              paddingVertical: 17,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  name="map-marker-outline"
                  type="material-community"
                  size={25}
                  color="black"
                  containerStyle={styles.iconContainer}
                />
                <View style={{ marginLeft: 16 }}>
                  <Text style={styles.mainText}>2084 Mapleridge Avenue</Text>
                  <Text style={styles.secondaryText}>
                    Toronto, Ontario M6N 16A
                  </Text>
                </View>
              </View>
              <View>
                <Icon
                  name="chevron-right"
                  type="material-community"
                  size={25}
                  onPress={() => console.log('Address button pressed')}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, paddingBottom: 60 }}>
          <Text style={styles.subHeaderText}>Payment</Text>

          <View
            style={{
              justifyContent: 'space-between',
              paddingVertical: 17,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  name="credit-card-outline"
                  type="material-community"
                  size={25}
                  color="black"
                  containerStyle={styles.iconContainer}
                />
                <View style={{ marginLeft: 16 }}>
                  <Text style={styles.mainText}>VISA Classic</Text>
                  <Text style={styles.secondaryText}>**** - 3542</Text>
                </View>
              </View>
              <View>
                <Icon
                  name="chevron-right"
                  type="material-community"
                  size={25}
                  onPress={() => console.log('Address button pressed')}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexGrow: 1 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={styles.subHeaderText}>My Cart</Text>
            <Icon
              name="chevron-right"
              type="material-community"
              size={25}
              onPress={() => navigation.navigate('cart')}
            />
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={cartItems}
            renderItem={({ item }) => <Card product={item} />}
          />
        </View>

        <View style={{ flex: 1, paddingBottom: 40 }}>
          <View style={styles.subTotalContainer}>
            <Text style={styles.labelText}>Total</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.dollarText}> {'\u0024'}</Text>
              <Text style={styles.valueText}>{cartTotalCost}</Text>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Button
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.buttonStyle}
              titleStyle={{
                fontSize: 13,
                letterSpacing: 1.5,
                color: COLORS.white,
              }}
              title="Pay Now"
              onPress={handleOrder}
            />
          </View>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Icon
              name="check-circle"
              type="material-community"
              size={100}
              color="#198754"
            />
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 25,
                  textAlign: 'center',
                }}
              >
                Payment confirmed!
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  paddingVertical: 20,
                  paddingHorizontal: 15,
                }}
              >
                Your beauty products are on their way!
              </Text>
              <Button
                title="View Order"
                type="outline"
                titleStyle={{ color: '#198754' }}
                containerStyle={{
                  width: 200,
                  marginHorizontal: 50,
                  marginVertical: 10,
                }}
                buttonStyle={styles.modalBtnStyle}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('main');
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  headerText: {
    fontSize: 17,
    letterSpacing: 2,
  },
  subHeaderText: {
    fontSize: 16,
    letterSpacing: 1,
    fontFamily: 'Nunito-SemiBold',
  },
  subInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 17,
    alignItems: 'center',
  },
  iconContainer: {
    height: 45,
    width: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
  },
  mainText: {
    paddingBottom: 4,
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
  },
  secondaryText: {
    color: COLORS.grey,
    fontSize: 14,
  },
  subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
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
  card: {
    marginVertical: 15,
    width: halfWidth,
    marginHorizontal: 7,
    justifyContent: 'center',
  },
  productNameText: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Nunito-SemiBold',
  },
  priceText: {
    color: COLORS.yellow,
    fontSize: 16,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: 20,
    padding: 30,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    height: undefined,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 35,
    borderRadius: 20,
    elevation: 20,
  },
  modalBtnStyle: {
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#198754',
    paddingVertical: 13,
  },
});

export default CheckoutScreen;
