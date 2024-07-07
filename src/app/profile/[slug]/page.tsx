"use client";
import { useSession } from "next-auth/react";
import Posts from "~/app/components/posts";

const ProfilePage = () => {
  const { data } = useSession();
  return (
    <div className="grid w-full gap-6 px-3 py-6 md:max-w-screen-lg md:grid-cols-3">
      <div className="h-fit min-h-48 w-full rounded-lg border px-6 py-3">
        <div className="h-16 w-16 rounded-full bg-neutral-300"></div>
        <div className="flex flex-col bg-white py-3">
          <p className="text-3xl">{data?.user.name}</p>
          <p className="text-neutral-400">{data?.user.email}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:col-span-2">
        <p className="text-xl font-semibold">My Post</p>
        <Posts userId={data?.user.id} />
      </div>
    </div>
  );
};
export default ProfilePage;
