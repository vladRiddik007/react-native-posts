import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  ItemSeparatorView,
  PostRender,
} from "../components/FlatListComponents";
import { postsGet } from "../redux/Posts/actions";
import { RootState } from "../redux/rootReducer";
import { Post, RootStackParamList } from "../types";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Home">;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

export function HomeScreen({ navigation, route }: Props) {
  const dispatch = useDispatch();
  const [postsState, setPostsState] = React.useState<Array<Post>>([]);
  const [offset, setOffset] = React.useState(1);

  const getPosts = React.useCallback(() => {
    dispatch(postsGet(`posts?offset=${offset}`));
    setOffset(offset + 1);
  }, [dispatch]);

  const {
    postsReducer: { posts, loading, error },
  } = useSelector((state: RootState) => state);

  React.useEffect(() => {
    getPosts();
  }, [getPosts]);

  React.useEffect(() => {
    setPostsState(posts);
  }, [posts]);

  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Post", { item })}>
      <PostRender post={item} />
    </TouchableOpacity>
  );

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getPosts}
          style={styles.loadMoreBtn}
        >
          <Text style={styles.btnText}>Load More Posts</Text>
          {loading ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  if (error) {
    <View style={styles.container}>
      <View>
        <Text> Something went wrong: </Text>
      </View>
    </View>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={postsState}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderFooter}
          ItemSeparatorComponent={ItemSeparatorView}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: "center",
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#800000",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
});
