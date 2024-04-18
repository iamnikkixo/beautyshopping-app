import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import COLORS from '../../assets/shared/colors/colors';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  Pressable,
} from 'react-native';
import { Icon } from 'react-native-elements';
const halfWidth = Dimensions.get('window').width / 2 - 10;
import { toggleFavorite } from '../favorites/favoritesSlice';
import * as Animatable from 'react-native-animatable';
import RecentProductCard from './RecentProductCard';
import { baseURL } from '../../assets/shared/baseURL';

const ProductCard = ({ products, navigation }) => {
  const dispatch = useDispatch();
  const FAVORITES = useSelector((state) => state.favorites.favoritesArray);
  const recentProducts = useSelector((state) => state.products.recentProducts);
  const delayStep = 250;

  const renderItem = ({ item: product, index }) => {
    const isFavorite = FAVORITES.includes(product);
    const delayStep = 250;

    return (
      <Animatable.View
        animation="fadeInRight"
        duration={1500}
        delay={index * delayStep}
      >
        <Pressable onPress={() => navigation.navigate('details', { product })}>
          <View style={styles.container}>
            <View style={{ height: 200 }}>
              <Image
                source={{
                  uri: baseURL + 'images/' + product.img,
                }}
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
            <View style={{ paddingHorizontal: 5 }}>
              <Text style={styles.productNameText}>{product.name}</Text>
              <Text style={styles.priceText}>
                {'\u0024'}
                {product.price}
              </Text>
            </View>
          </View>
        </Pressable>
      </Animatable.View>
    );
  };

  return (
    <>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />
      <View style={{ marginTop: 20 }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={styles.headerText}>Recent Products</Text>
        </View>
        {recentProducts.map((product, index) => (
          <Animatable.View
            animation="bounceInRight"
            duration={3500}
            delay={index * delayStep}
            key={product._id}
          >
            <RecentProductCard navigation={navigation} product={product} />
          </Animatable.View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 250,
    width: halfWidth,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: 20,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 8,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    color: COLORS.white,
    width: 20,
    height: 20,
  },
  productNameText: {
    fontSize: 16,
    marginTop: 8,
    fontFamily: 'Nunito-SemiBold',
  },
  priceText: {
    color: COLORS.yellow,
  },
  headerText: {
    fontSize: 23,
    color: COLORS.green,
    fontFamily: 'Nunito-SemiBold',
  },
});

export default ProductCard;
