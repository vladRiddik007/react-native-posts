import * as React from "react";
import { Comment, User } from "../types";
import { getID } from "../utils/api";

export default function useUserComments({
  author,
  id,
  query = "post",
}: {
  author: string;
  id: string;
  query?: string;
}) {
  const [user, setUser] = React.useState<User>({ id: "", username: "" });
  const [comments, setComments] = React.useState<Array<Comment>>([]);

  const getUser = React.useCallback(async () => {
    const user = await getID(`users?id=${author}`);
    setUser(user[0]);
  }, [author]);

  const getComments = React.useCallback(async () => {
    const comments = await getID(`comments?${query}=${id}`);
    setComments(comments);
  }, [id]);

  React.useEffect(() => {
    getUser();
    getComments();
  }, [getUser, getComments]);

  return { user, comments };
}
