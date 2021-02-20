import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import * as React from "react";
import { Button, ColorSchemeName, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { postsGet } from "../redux/Posts/actions";
import { RootState } from "../redux/rootReducer";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

function HomeScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Home">) {
  const dispatch = useDispatch();
  const {
    postsReducer: { posts },
  } = useSelector((state: RootState) => state);
  console.log("posts", posts);

  React.useEffect(() => {
    dispatch(postsGet());
  }, [dispatch]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen 123</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button title="Go to Post" onPress={() => navigation.push("Post")} />
    </View>
  );
}

function PostScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Post">) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>post Screen</Text>
    </View>
  );
}

function ProfileScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Profile">) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>profile Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
