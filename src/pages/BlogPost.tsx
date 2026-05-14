import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { PostLayout } from "@/components/landing/PostLayout";
import NotFound from "./NotFound";
import { getPost } from "@/lib/posts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  if (!post) return <NotFound />;

  const url = `https://ministries.hlpr.io/blog/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "HLPR for Ministries" },
    publisher: {
      "@type": "Organization",
      name: "HLPR for Ministries",
      logo: {
        "@type": "ImageObject",
        url: "https://ministries.hlpr.io/favicon.png",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ministries.hlpr.io/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://ministries.hlpr.io/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

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
