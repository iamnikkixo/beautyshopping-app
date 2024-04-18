import React from 'react';
import { useDispatch } from 'react-redux';
import COLORS from '../../assets/shared/colors/colors';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { removeFromCartAsync, updateCartQuantityAsync } from './cartSlice';
import { SwipeRow } from 'react-native-swipe-list-view';
const width = Dimensions.get('screen').width;
import { baseURL } from '../../assets/shared/baseURL';

const CartCard = ({ navigation, product }) => {
  const { _id, img, name, price, volume } = product.product;

  const dispatch = useDispatch();

  return (
    <SwipeRow rightOpenValue={-100}>
      <View style={styles.deleteView}>
        <TouchableOpacity
          style={styles.deleteTouchable}
          onPress={() => {
            dispatch(removeFromCartAsync({ productId: _id }));
          }}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Pressable
          onPress={() =>
            navigation.navigate('details', { product: product.product })
          }
        >
          <View style={styles.card}>
            <View
              style={{
                height: 150,
                padding: 5,
                width: width / 3 + 15,
              }}
            >
              <Image
                source={{ uri: baseURL + 'images/' + img }}
                style={styles.image}
              />
            </View>
            <View
              style={{
                paddingHorizontal: 5,
                marginLeft: 8,
                paddingVertical: 8,
                flex: 1,
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text
                  style={styles.productNameText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {name}
                </Text>
                <Text style={{ color: COLORS.grey, paddingVertical: 2 }}>
                  {volume} mL
                </Text>
                <Text style={{ color: COLORS.yellow }}>
                  {'\u0024'}
                  {price}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={styles.qtyContainer}>
                  <Icon
                    name="remove-outline"
                    type="ionicon"
                    size={13}
                    color="#D8D8D8"
                    reverseColor="black"
                    reverse
                    containerStyle={{ marginLeft: -2 }}
                    onPress={() => {
                      dispatch(
                        updateCartQuantityAsync({
                          productId: _id,
                          action: 'decrement',
                        })
                      );
                    }}
                  />
                  <Text style={{ paddingHorizontal: 5 }}>
                    {product.quantity}
                  </Text>
                  <Icon
                    name="add-outline"
                    type="ionicon"
                    size={13}
                    color="#D8D8D8"
                    reverseColor="black"
                    reverse
                    onPress={() => {
                      dispatch(
                        updateCartQuantityAsync({
                          productId: _id,
                          action: 'increment',
                        })
                      );
                    }}
                  />
                </View>
                <View>
                  <Icon
                    name="delete"
                    type="material-community"
                    size={13}
                    color="#D8D8D8"
                    reverseColor="black"
                    reverse
                    onPress={() => {
                      dispatch(removeFromCartAsync({ productId: _id }));
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </SwipeRow>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    height: 160,
    backgroundColor: 'white',
    paddingVertical: 5,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: 20,
  },
  productNameText: {
    fontSize: 16,
    letterSpacing: 1,
    fontFamily: 'Nunito-SemiBold',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  deleteTouchable: {
    height: '90%',
    backgroundColor: '#F44336',
    justifyContent: 'center',
  },
  deleteText: {
    color: COLORS.white,
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
    width: 100,
  },
});
