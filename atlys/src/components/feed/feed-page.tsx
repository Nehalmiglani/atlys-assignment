import { useState } from "react";
import type { AuthMode, Author, Post } from "../../types";
import { useAuth } from "../../context/auth-context";
import PostEditor from "./Post/create/create-post";
import PostCard from "./Post/view/post-card";
import { INITIAL_POSTS } from "../../constant/data";

interface FeedPageProps {
  onAuthRequired: (mode?: AuthMode) => void;
}

export default function FeedPage({ onAuthRequired }: FeedPageProps) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const addPost = (content: string, author: Author): void => {
    const newPost: Post = {
      id: `post_${Date.now()}`,
      author,
      content: content.trim(),
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      isLiked: false,
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleInteraction = () => {
    if (!user) {
      onAuthRequired("signin");
    } else {
      alert("This functionality is not implemented yet.");
    }
  };

  return (
      <div style={{ maxWidth: "568px", width: "100%", margin: "auto", padding: "4rem 0" }}>
        <PostEditor addPost={addPost} onInteraction={handleInteraction} />
        <div
          style={{
            width: "100%",
          }}
        >
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onInteraction={handleInteraction}
            />
          ))}
        </div>
      </div>
  );
}
