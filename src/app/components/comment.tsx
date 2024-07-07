"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { api } from "~/trpc/react";

interface CommentsFormProps {
  postId: number;
}
const CommentForm = ({ postId }: CommentsFormProps) => {
  const [comment, setComment] = useState("");
  const router = useRouter();
  const { mutate } = api.comment.createComment.useMutation({
    onSuccess: () => {
      setComment("");
      router.refresh();
    },
  });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ comment, postId });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="bg-white-t sticky inset-x-0 bottom-0 flex w-full items-center justify-center rounded-md border border-t py-3">
        <div className="flex w-full max-w-md flex-col gap-3 px-3 md:max-w-screen-lg">
          <input
            placeholder="Comments..."
            className="w-full rounded-md border bg-neutral-100 px-3 py-1 text-xl"
            onChange={(e) => setComment(e.target.value)}
          />
          <div>
            <button className="rounded-md bg-black px-3 py-1 text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default CommentForm;
