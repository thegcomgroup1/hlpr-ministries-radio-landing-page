import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { PostLayout } from "@/components/landing/PostLayout";
import NotFound from "./NotFound";
import { getPost } from "@/lib/posts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  if (!post) return <NotFound />;

  return (
    <>
      <Helmet>
        <title>{post.title} | HLPR Ministries</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content={post.description} />
      </Helmet>
      <PostLayout
        title={post.title}
        description={post.description}
        date={post.date}
        readMinutes={post.readMinutes}
        category={post.category}
      >
        {post.content}
      </PostLayout>
    </>
  );
};

export default BlogPost;
