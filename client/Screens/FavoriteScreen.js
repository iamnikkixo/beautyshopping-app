import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import COLORS from '../assets/shared/colors/colors';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
const halfWidth = Dimensions.get('window').width / 2 - 10;
import * as Animatable from 'react-native-animatable';
import { baseURL } from '../assets/shared/baseURL';

const FavoriteScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const FAVORITES = useSelector((state) => state.favorites.favoritesArray);

  const renderItem = ({ item: product, index }) => {
    const delayStep = 250;

    return (
      <Animatable.View
        animation="bounceIn"
        duration={2500}
        delay={delayStep * index}
      >
        <Pressable onPress={() => navigation.navigate('details', { product })}>
          <View style={styles.container}>
            <View style={{ height: 200 }}>
              <Image
                source={{ uri: baseURL + 'images/' + product.img }}
                style={styles.image}
              />
              <Icon
                raised
                reverse
                name={'heart'}
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

  return FAVORITES.length > 0 ? (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 10, backgroundColor: 'white' }}
    >
      <View style={styles.headerContainer}>
        <Icon
          name="arrow-left"
          type="material-community"
          size={25}
          color={COLORS.green}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>My Favorites</Text>
        <View style={{ width: 25 }} />
      </View>

      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={FAVORITES}
        renderItem={renderItem}
      />
    </SafeAreaView>
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <View style={styles.headerContainer}>
        <Icon
          name="arrow-left"
          type="material-community"
          size={25}
          color={COLORS.green}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>My Favorites</Text>
        <View />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: 'http://192.168.1.7:3000/api/images/nofavsicon.jpg' }}
          style={{ width: 300, height: 300, borderRadius: 15 }}
        />
        <Text style={{ fontSize: 18 }}>
          Looks like we don't have anything yet!
        </Text>
      </View>
    </SafeAreaView>
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
});

export default FavoriteScreen;
