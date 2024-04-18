import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import COLORS from '../assets/shared/colors/colors';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import { Badge, Icon, Button } from 'react-native-elements';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { addToCartAsync } from '../features/cart/cartSlice';
import { baseURL } from '../assets/shared/baseURL';

const DetailsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
  };

  const handleAddToCart = () => {
    dispatch(addToCartAsync({ productId: _id, quantity: qty }));

    if (Platform.OS === 'android') {
      ToastAndroid.show('Item added to cart', ToastAndroid.SHORT);
    } else {
      Alert.alert('Cart Update', 'Item added to cart');
    }

    setQty(1);
  };

  const cartQty = useSelector((state) => state.cart.cartQty);
  const { product } = route.params;
  const { _id, img, name, about, price, rating, reviews, volume } = product;

  const FAVORITES = useSelector((state) => state.favorites.favoritesArray);
  const isFavorite = FAVORITES.includes(product);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Icon
          name="arrow-left"
          type="material-community"
          size={25}
          color={COLORS.green}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Details</Text>
        <View>
          <Icon
            name="basket-outline"
            type="ionicon"
            size={28}
            color={COLORS.green}
            onPress={() => navigation.navigate('cart')}
          />
          <Badge
            value={cartQty}
            containerStyle={{ position: 'absolute', top: -2, right: -7 }}
            badgeStyle={{ backgroundColor: COLORS.yellow }}
            textStyle={{ fontSize: 10 }}
          />
        </View>
      </View>
      <View style={{ height: '50%' }}>
        <Image
          source={{ uri: baseURL + 'images/' + img }}
          style={styles.image}
        />
        <Icon
          raised
          reverse
          name={isFavorite ? 'heart' : 'heart-outline'}
          type="material-community"
          size={20}
          containerStyle={styles.iconContainer}
          iconStyle={styles.iconStyle}
          color={COLORS.yellow}
          onPress={() => dispatch(toggleFavorite(product))}
        />
      </View>

      <View style={styles.infoContainer}>
        <View>
          <View style={styles.subInfoContainerOne}>
            <Text style={styles.productNameText}>{name}</Text>
            <Text style={styles.priceText}>
              {'\u0024'}
              {price}
            </Text>
          </View>
          <View style={styles.subInfoContainerTwo}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                name="star"
                type="ionicon"
                size={17}
                color={COLORS.yellow}
              />
              <Text style={{ paddingHorizontal: 5 }}>{rating}</Text>
              <Text style={{ color: COLORS.grey, marginLeft: 3 }}>
                {reviews} reviews
              </Text>
            </View>
            <View>
              <Text style={{ color: COLORS.grey }}>{volume} ml</Text>
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 10,
              fontFamily: 'Nunito-SemiBold',
            }}
          >
            Product Details
          </Text>
          <Text>{about}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.qtyContainer}>
            <Icon
              name="remove-outline"
              type="ionicon"
              size={18}
              onPress={() => decreaseQty()}
            />
            <Text style={{ paddingHorizontal: 3 }}>{qty}</Text>
            <Icon
              name="add-outline"
              type="ionicon"
              size={18}
              onPress={() => increaseQty()}
            />
          </View>
          <Button
            title="Add to Cart"
            buttonStyle={styles.addButtonStyle}
            containerStyle={styles.cartButtonContainer}
            icon={
              <Icon
                name="basket"
                type="ionicon"
                size={25}
                color="white"
                style={{ marginRight: 10 }}
              />
            }
            onPress={handleAddToCart}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailsScreen;

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
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
    justifyContent: 'space-between',
  },
  subInfoContainerOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  subInfoContainerTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productNameText: {
    fontSize: 20,
    fontFamily: 'Nunito-SemiBold',
  },
  priceText: {
    fontSize: 20,
    color: COLORS.yellow,
  },
  addButtonStyle: {
    backgroundColor: COLORS.green,
    paddingVertical: 12,
    fontSize: 16,
  },
  cartButtonContainer: {
    borderRadius: 15,
    width: '66%',
  },
  qtyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: COLORS.grey,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    width: '30%',
  },
});
