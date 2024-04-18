import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import ProductListCard from './ProductListCard';

const ProductList = ({ products, navigation }) => {
  const delayStep = 250;

  return (
    <View style={styles.container}>
      {products.map((product, index) => (
        <View key={index} style={styles.itemContainer}>
          <Animatable.View
            animation="fadeInRight"
            duration={1500}
            delay={index * delayStep}
          >
            <ProductListCard
              navigation={navigation}
              product={product}
              key={product.id}
            />
          </Animatable.View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  itemContainer: {
    width: '50%', // 50% -> 2 columns | 33% -> 3 columns | 25% -> 4 columns
    height: '100px',
  },
  item: {
    padding: '8px',
    margin: '8px',
    backgroundColor: '#EEEEEE',
    height: 'calc(100% - 16px)', // Adjusted to account for both padding and margin
  },
});

export default ProductList;
