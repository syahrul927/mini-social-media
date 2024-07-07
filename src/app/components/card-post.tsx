"use client";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/trpc/react";

interface CardPostProps {
  id: number;
  userId: string;
  email: string;
  username: string;
  content: string;
  like: number;
  statusLike?: boolean;
}
const CardPost = (props: CardPostProps) => {
  const [like, setLike] = useState(props.like);
  const [statusLike, setStatusLike] = useState(props.statusLike ?? false);
  const { mutate, isPending } = api.post.like.useMutation({
    onSuccess: (data) => {
      setStatusLike(!statusLike);
      setLike(data.like);
    },
  });
  return (
    <div className="flex w-full flex-col rounded-lg border">
      <div className="flex items-center gap-3 border-b px-3 py-6">
        <div className="h-8 w-8 rounded-full bg-neutral-300"></div>
        <div>
          <Link href={`/profile/${props.userId}`}>
            <p className="text-lg">{props.username}</p>
          </Link>
          <p className="text-sm text-neutral-400">{props.email}</p>
        </div>
      </div>
      <div className="px-3 py-6">
        <p>{props.content}</p>
      </div>
      <div className="flex gap-3 px-3 py-6">
        <button
          className={`hover:text-pink-600 ${statusLike ? "font-semibold text-pink-600" : ""}`}
          onClick={() => {
            if (isPending) return;
            mutate(props.id);
          }}
        >
          {like} like ❤
        </button>
        <Link href={`/post/${props.id}`}>
          <button className="hover:text-pink-600">comment</button>
        </Link>
      </div>
    </div>
  );
};
export default CardPost;
