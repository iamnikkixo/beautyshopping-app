import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import COLORS from '../assets/shared/colors/colors';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { Icon } from 'react-native-elements';
import CartCard from '../features/cart/CartCard';
import PromotionCode from '../features/cart/PromotionCode';
import TotalContainer from '../features/cart/TotalContainer';
import { clearCart, clearCartAsync } from '../features/cart/cartSlice';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartQty = useSelector((state) => state.cart.cartQty);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.headerContainer}>
        <Icon
          name="arrow-left"
          type="material-community"
          size={25}
          color={COLORS.green}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>My Cart</Text>
        <View style={{ widt: 25 }} />
      </View>

      {cartQty > 0 ? (
        <View style={{ flex: 1 }}>
          <ScrollView
            style={styles.infoContainer}
            showsVerticalScrollIndicator={false}
          >
            {cartItems.map((cartItem, index) => (
              <CartCard
                navigation={navigation}
                product={cartItem}
                key={index}
              />
            ))}
            <Pressable
              style={{
                marginLeft: 5,
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                dispatch(clearCart());
                dispatch(clearCartAsync());
              }}
            >
              <Icon type="ionicon" name="trash-outline" size={18} />
              <Text
                style={{
                  color: COLORS.grey,
                  marginLeft: 5,
                  fontFamily: 'Nunito-SemiBold',
                }}
              >
                Clear Cart
              </Text>
            </Pressable>

            {cartQty ? <PromotionCode /> : null}
          </ScrollView>
          <View style={{ paddingHorizontal: 18 }}>
            <TotalContainer navigation={navigation} />
          </View>
        </View>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Image
            source={{ uri: 'http://192.168.1.7:3000/api/images/emptycart.jpg' }}
            style={styles.image}
          />
          <Text style={styles.emptyCartText}>
            Time to fill up your beauty cart with some fabulous finds!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

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
    fontFamily: 'Nunito-SemiBold',
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    lineHeight: 25,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
  },
});
