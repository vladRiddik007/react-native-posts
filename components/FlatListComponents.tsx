import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import useUserComments from "../hooks/hookUserComments";

import { Comment, Post, User } from "../types";
import { getID } from "../utils/api";

export function PostRender({ post }: { post: Post }) {
  const { user, comments } = useUserComments({
    author: post.author,
    id: post.id,
  });

  return (
    <View style={styles.item}>
      <Text style={styles.name}>{user.username}</Text>
      <Text style={styles.title}>{post.title}</Text>
      <Text>{post.body}</Text>
      <Text>Comments: {comments.length}</Text>
    </View>
  );
}

export function CommentRender({ comment }: { comment: Comment }) {
  const [user, setUser] = React.useState<User>({ id: "", username: "" });

  const getUser = React.useCallback(async () => {
    const user = await getID(`users?id=${comment.author}`);
    setUser(user[0]);
  }, [comment]);

  React.useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <View style={styles.comment}>
      <Text>{user.username}</Text>
      <Text>{comment.body}</Text>
    </View>
  );
}

export function ItemSeparatorView() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  comment: {
    backgroundColor: "#c2fff7",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#C8C8C8",
  },
  name: {
    fontSize: 30,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
