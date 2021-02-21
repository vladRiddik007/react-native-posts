import * as React from "react";
import { Text, View, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { Post, User } from "../types";
import { PostRender } from "../components/FlatListComponents";
import { getID } from "../utils/api";

export function ProfileScreen() {
  const author = 'bb495996-f02d-4185-9895-2cf887ea78c0'
  const [user, setUser] = React.useState<User>({ id: "", username: "" });
  const [posts, setPosts] = React.useState<Array<Post>>([]);

  const getUser = React.useCallback(async () => {
    const user = await getID(`users?id=${author}`);
    setUser(user[0]);
  }, [author]);

  const getPosts = React.useCallback(async () => {
    const comments = await getID(`posts?author=${author}`);
    setPosts(comments);
  }, [author]);

  React.useEffect(() => {
    getUser();
    getPosts();
  }, [getUser, getPosts]);

  const renderItem = ({ item }: { item: Post }) => (
    <View>
      <PostRender post={item} />
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 100 }}>
      <View>
        <View style={styles.item}>
          <Text>{user.username}</Text>
        </View>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#dbd389",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
