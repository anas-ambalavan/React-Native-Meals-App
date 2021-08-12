import React from "react";
import { View, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import DefaultText from "../components/DefaultText";
import HeaderButton from "../components/HeaderButton";
import MealList from "../components/MealList";

const FavouritesScreen = (props) => {
  const favouriteMeals = useSelector((state) => state.meals.favouriteMeals);

  if (favouriteMeals.length === 0 || !favouriteMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No faourite meals found. Start adding some!</DefaultText>
      </View>
    );
  }

  return <MealList listData={favouriteMeals} navigation={props.navigation} />;
};

FavouritesScreen.navigationOptions = (navData) => {
  return {
    title: "Your Favourites",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavouritesScreen;
