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
        <meta name="robots" content="index,follow" />
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`https://ministries.hlpr.io/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={`https://ministries.hlpr.io/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://ministries.hlpr.io/og-home.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://ministries.hlpr.io/og-home.jpg" />
        <meta property="article:published_time" content={post.date} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: { "@type": "Organization", name: "HLPR Ministries" },
          publisher: {
            "@type": "Organization",
            name: "HLPR Ministries",
            url: "https://ministries.hlpr.io",
          },
          mainEntityOfPage: `https://ministries.hlpr.io/blog/${post.slug}`,
        })}</script>
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
