import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import COLORS from '../../assets/shared/colors/colors';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { toggleFavorite } from '../favorites/favoritesSlice';
const width = Dimensions.get('screen').width - 33;
import * as Animatable from 'react-native-animatable';
import { baseURL } from '../../assets/shared/baseURL';

const RecentProductCard = ({ navigation, product }) => {
  const dispatch = useDispatch();
  const FAVORITES = useSelector((state) => state.favorites.favoritesArray);

  const isFavorite = FAVORITES.includes(product);

  return (
    <Pressable onPress={() => navigation.navigate('details', { product })}>
      <View style={styles.container}>
        <View style={{ width: width / 3 }}>
          <Image
            source={{ uri: baseURL + 'images/' + product.img }}
            style={styles.image}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={styles.productNameText} ellipsizeMode="tail">
              {product.name}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <Icon
                name="star"
                type="ionicon"
                size={17}
                color={COLORS.yellow}
              />
              <Text style={{ marginHorizontal: 5 }}>{product.rating}</Text>
              <Text style={{ color: COLORS.grey }}>
                ( {product.reviews} reviews )
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.priceText}>
              {'\u0024'}
              {product.price}
            </Text>
          </View>
        </View>
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
    </Pressable>
  );
};

export default RecentProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cream,
    flexDirection: 'row',
    borderRadius: 20,
    width: width,
    height: 150,
    marginVertical: 10,
    padding: 15,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: 20,
    padding: 30,
  },
  productNameText: {
    fontSize: 16,
    marginBottom: 3,
    fontFamily: 'Nunito-SemiBold',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    color: COLORS.yellow,
    fontSize: 20,
  },
});
