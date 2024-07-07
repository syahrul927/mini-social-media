"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { api } from "~/trpc/react";

const NewPostPage = () => {
  const router = useRouter();
  const { mutate } = api.post.create.useMutation({
    onSuccess: () => {
      void router.push("/");
    },
  });
  const [content, setContent] = useState("");
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ content });
  };
  return (
    <div className="flex w-full flex-col px-3 py-6 md:max-w-screen-lg">
      <form onSubmit={onSubmit}>
        <textarea
          placeholder="Write your content here.."
          className="min-h-96 w-full border p-3"
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="rounded-md bg-black px-6 py-2 text-white hover:bg-black/90">
          Post
        </button>
      </form>
    </div>
  );
};
export default NewPostPage;
