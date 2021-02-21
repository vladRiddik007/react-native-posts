export type RootStackParamList = {
  Home: undefined;
  Post: { item: Post };
  Profile: undefined;
  NotFound: undefined;
};

export type Comment = {
  id: string;
  body: string;
  author: string;
  post: string;
}

export type Post = {
  id: string;
  title: string;
  body: string;
  author: string;
}

export type User = {
  id: string;
  username: string;
}
