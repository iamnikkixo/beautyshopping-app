import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import COLORS from '../assets/shared/colors/colors';
import { View } from 'react-native';
import { Badge, Icon } from 'react-native-elements';

// Screens
import HomeScreen from './HomeScreen';
import FavoriteScreen from './FavoriteScreen';
import CartScreen from './CartScreen';
import UserScreen from './UserScreen';

//Screen names
const home = 'Home';
const favorite = 'Favourite';
const cart = 'Cart';
const user = 'User';

const MainContainer = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRoute={home}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let rn = route.name;

          if (rn === home) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === favorite) {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (rn === cart) {
            iconName = focused ? 'basket' : 'basket-outline';
          } else if (rn === user) {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          if (rn === cart && cartItems.cartTotalQty > 0) {
            return (
              <View>
                <Icon name={iconName} type="ionicon" size={20} color={color} />
                <Badge
                  value={cartItems.cartTotalQty}
                  containerStyle={{ position: 'absolute', top: -5, right: -10 }}
                  badgeStyle={{ backgroundColor: COLORS.yellow }}
                  textStyle={{ fontSize: 10 }}
                />
              </View>
            );
          }
          return (
            <Icon name={iconName} type="ionicon" size={20} color={color} />
          );
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: COLORS.yellow,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: { height: 70 },
      })}
    >
      <Tab.Screen name={home} component={HomeScreen} />
      <Tab.Screen name={favorite} component={FavoriteScreen} />
      <Tab.Screen name={cart} component={CartScreen} />
      <Tab.Screen name={user} component={UserScreen} />
    </Tab.Navigator>
  );
};

export default MainContainer;
