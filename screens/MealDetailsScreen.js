import React, { useEffect, useCallback } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import DefaultText from "../components/DefaultText";
import CustomHeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";

import { MEALS } from "../data/dummy-data";
import { toggleFavourite } from "../store/actions/meals";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailsScreen = (props) => {
  const mealId = props.navigation.getParam("mealId");

  const currentMealIsFavourite = useSelector((state) =>
    state.meals.favouriteMeals.some((meal) => meal.id === mealId)
  );

  const availableMeals = useSelector((state) => state.meals.meals);

  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavouriteHandler });
  }, [toggleFavouriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavourite });
  }, [currentMealIsFavourite]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

export default MealDetailsScreen;

MealDetailsScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam("mealId");

  const toggleFavourite = navigationData.navigation.getParam("toggleFav");

  const mealTitle = navigationData.navigation.getParam("mealTitle");

  const isFavourite = navigationData.navigation.getParam("isFav");

  // const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavourite ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavourite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 15,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
