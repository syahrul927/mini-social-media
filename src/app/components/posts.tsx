"use client";

import { type RouterOutputs, api } from "~/trpc/react";
import { useCallback, useEffect, useRef, useState } from "react";
import CardPost from "./card-post";

type PostType = RouterOutputs["post"]["getAllPost"]["posts"];
interface PostsProps {
  userId?: string;
}
export default function Posts({ userId }: PostsProps) {
  const [page, setPage] = useState(0);
  const [stop, setStop] = useState(false);
  const [posts, setPosts] = useState<PostType>([]);
  const { isPending, refetch } = api.post.getAllPost.useQuery({
    userId,
    limit: 5,
    page,
  });
  const fetchData = useCallback(async () => {
    if (stop) return;
    const { data } = await refetch();
    if (data) {
      setPosts([...posts, ...data.posts]);
      setPage(page + 1);
      if (posts.length === data.total) setStop(true);
    }
  }, [page, userId]);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target?.isIntersecting) {
        void fetchData();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchData]);
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3 px-3 md:max-w-screen-lg">
      {posts?.map((post) => (
        <CardPost
          key={post.id}
          content={post.content ?? ""}
          email={post.createdBy.email ?? ""}
          username={post.createdBy.name ?? ""}
          statusLike={post.Likes.length && post.Likes[0]?.status ? true : false}
          id={post.id}
          like={post.counterLike}
        />
      ))}

      <div ref={loaderRef}>{isPending && "Loading..."}</div>
    </div>
  );
}
