import * as React from "react";
import { RouteProp } from "@react-navigation/native";
import { Text, View, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { Comment, RootStackParamList } from "../types";
import useUserComments from "../hooks/hookUserComments";
import { CommentRender } from "../components/FlatListComponents";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Post">;

type Props = {
  route: ProfileScreenRouteProp;
};

export function PostScreen({ route }: Props) {
  const { item } = route.params;
  const { user, comments } = useUserComments({
    author: item.author,
    id: item.id,
  });

  const renderItem = ({ item }: { item: Comment }) => (
    <View>
      <CommentRender comment={item} />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={styles.item}>
          <Text>{user.username}</Text>
          <Text>{item.title}</Text>
          <Text>{item.body}</Text>
        </View>
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
