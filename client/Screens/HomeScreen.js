import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import COLORS from '../assets/shared/colors/colors';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { Badge, Icon, Input } from 'react-native-elements';
import CategoryList from '../features/home/CategoryList';
import ProductCard from '../features/products/ProductCard';
import ProductList from '../features/products/ProductsList';
import {
  searchProducts,
  clearSearch,
} from '../features/products/productsSlice';
import { fetchProducts } from '../features/products/productsSlice';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [seeAll, setSeeAll] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const products = useSelector((state) => state.products.filteredProductsArray);
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );
  const cartQty = useSelector((state) => state.cart.cartQty);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const handleSearch = (text) => {
    if (isSearchActive) {
      dispatch(searchProducts(text));
    }
  };

  useEffect(() => {
    if (!isSearchActive) {
      dispatch(clearSearch());
    }
  }, [isSearchActive, dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <Text>Loading ... </Text>;
  }

  if (error) {
    return <Text>Error.apply.apply. {error} </Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Icon
            name="search-outline"
            type="ionicon"
            size={28}
            color={COLORS.green}
            onPress={() => {
              setIsSearchActive((previsSearchActive) => !previsSearchActive);
            }}
          />
        </View>

        {isSearchActive ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingRight: 20,
              paddingLeft: 15,
            }}
          >
            <Input
              placeholder="search"
              onChangeText={handleSearch}
              inputStyle={{ fontFamily: 'Nunito-Regular', fontSize: 16 }}
              inputContainerStyle={{
                borderBottomWidth: 0,
                paddingHorizontal: 5,
              }}
              containerStyle={{
                backgroundColor: '#f0f0f0',
                borderRadius: 10,
                height: 45,
                paddingVertical: 2,
                paddingHorizontal: 15,
              }}
            />
          </View>
        ) : (
          <Text style={styles.logoText}>Athena</Text>
        )}

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
      {isSearchActive ? (
        <View style={{ paddingBottom: 35 }}>
          <ProductList navigation={navigation} products={products} />
        </View>
      ) : (
        <>
          <CategoryList />
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>{selectedCategory}</Text>
              <Pressable onPress={() => setSeeAll((prevSee) => !prevSee)}>
                <Text style={{ fontFamily: 'Nunito-SemiBold' }}>
                  {seeAll ? 'See Less' : 'See All'}
                </Text>
              </Pressable>
            </View>
            {seeAll ? (
              <View style={{ paddingBottom: 35 }}>
                <ProductList products={products} navigation={navigation} />
              </View>
            ) : (
              <View style={{ paddingBottom: 40 }}>
                <ProductCard products={products} navigation={navigation} />
              </View>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 30,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  logoText: {
    fontSize: 16,
    letterSpacing: 2,
    fontFamily: 'Nunito-SemiBold',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 23,
    color: COLORS.green,
    fontFamily: 'Nunito-SemiBold',
  },
});

export default HomeScreen;
