import { notFound } from "next/navigation";
import { Suspense } from "react";
import PostDetailClient from "./PostDetailClient";
import { feedPosts } from "@/app/lib/mock-feed";

export const instant = false;

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  const post = feedPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <PostDetailClient post={post} />
    </Suspense>
  );
}
