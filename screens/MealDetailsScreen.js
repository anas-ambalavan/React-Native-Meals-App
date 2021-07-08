import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MealDetailsScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>MealDetailsScreen</Text>
    </View>
  );
};

export default MealDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
