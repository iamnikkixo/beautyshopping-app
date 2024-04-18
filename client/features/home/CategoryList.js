import { StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCategory } from './categoriesSlice';
import { selectProductsByCategory } from '../products/productsSlice';
import COLORS from '../../assets/shared/colors/colors';

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );

  const renderCategoriesButton = ({ item: category }) => {
    const isActive = category.name === selectedCategory;

    const handlePress = (category) => {
      dispatch(selectCategory(category.name));
      dispatch(selectProductsByCategory(category.name));
    };

    return (
      <Button
        title={category.name}
        titleStyle={
          isActive
            ? { color: '#fff', fontFamily: 'Nunito-SemiBold' }
            : { color: COLORS.grey, fontFamily: 'Nunito-SemiBold' }
        }
        type={isActive ? 'solid' : 'outline'}
        buttonStyle={isActive ? styles.activeButtonStyle : styles.buttonStyle}
        onPress={() => handlePress(category)}
      />
    );
  };

  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      data={categories}
      renderItem={renderCategoriesButton}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  activeButtonStyle: {
    backgroundColor: COLORS.green,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  buttonStyle: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
    borderColor: COLORS.grey,
    borderWidth: 1,
  },
});
