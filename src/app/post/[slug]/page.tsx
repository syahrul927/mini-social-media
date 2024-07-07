import { redirect } from "next/navigation";
import CardPost from "~/app/components/card-post";
import CommentForm from "~/app/components/comment";
import { api } from "~/trpc/server";

const PostDetailPage = async ({ params }: { params: { slug: string } }) => {
  const postId = parseInt(params.slug);
  const post = await api.post.getById(postId);
  if (!post) {
    redirect("/");
  }
  return (
    <div className="flex w-full max-w-md flex-col md:max-w-screen-lg">
      <CardPost
        userId={post.createdById}
        key={post.id}
        content={post.content ?? ""}
        email={post.createdBy.email ?? ""}
        username={post.createdBy.name ?? ""}
        statusLike={post.Likes.length && post.Likes[0]?.status ? true : false}
        id={post.id}
        like={post.counterLike}
      />
      <div className="flex flex-col gap-3 border p-3">
        <p className="font-semibold">Comments in this post:</p>
        {post.Comments.map((comment) => (
          <div className="flex flex-col" key={comment.id}>
            <p className="font-semibold">{comment.user.name}</p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      <CommentForm postId={post.id} />
    </div>
  );
};
export default PostDetailPage;
