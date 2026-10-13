"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { PostMock, Comentario } from "@/app/lib/mock-feed";
import { feedPosts } from "@/app/lib/mock-feed";
import CreatePostModal from "@/components/CreatePostModal";

type PostContextType = {
  posts: PostMock[];
  addPost: (post: PostMock) => void;
  addComment: (postId: string, comment: Comentario) => void;
  toggleMeEncanta: (postId: string) => void;
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
};

const PostContext = createContext<PostContextType | null>(null);

export function usePosts() {
  const ctx = useContext(PostContext);
  if (!ctx) throw new Error("usePosts must be used within PostProvider");
  return ctx;
}

export default function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<PostMock[]>(feedPosts);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const addPost = useCallback((post: PostMock) => {
    setPosts((prev) => [post, ...prev]);
  }, []);

  const addComment = useCallback((postId: string, comment: Comentario) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comentarios: [...p.comentarios, comment] }
          : p
      )
    );
  }, []);

  const toggleMeEncanta = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, meEncanta: p.meEncanta + 1 } : p
      )
    );
  }, []);

  const openCreateModal = useCallback(() => setIsCreateModalOpen(true), []);
  const closeCreateModal = useCallback(() => setIsCreateModalOpen(false), []);

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        addComment,
        toggleMeEncanta,
        isCreateModalOpen,
        openCreateModal,
        closeCreateModal,
      }}
    >
      {children}
      {isCreateModalOpen && <CreatePostModal />}
    </PostContext.Provider>
  );
}
