import {
  CommentOutlined,
  FavoriteBorderOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import type { Post } from "../../../../types";
import styles from "./post-card.module.css";

interface PostCardProps {
  post: Post;
  onInteraction: () => void;
}

export default function PostCard({ post, onInteraction }: PostCardProps) {
  const handleLike = () => {
    onInteraction();
  };

  const handleComment = () => {
    onInteraction();
  };

  const handleShare = () => {
    onInteraction();
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {/* Author section */}
        <div className={styles.authorSection}>
            {/* This will be image  */}
          <div className={styles.avatar}> 
            {post.author.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className={styles.authorName}>{post.author.name}</p>
            <p className={styles.authorTime}>{/* add date here */}</p>
          </div>
        </div>

        {/* Content section */}
        <div className={styles.contentSection}>
          <span className={styles.emoji}>
            🥴 {/* dynamic emoji from what post is made */}
          </span>
          <p className={styles.contentText}>{post.content}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className={styles.actionButtons}>
        <button onClick={handleLike} className={styles.actionButton}>
          <FavoriteBorderOutlined
            sx={{ color: "#2F384C", fontSize: "1.2rem" }}
          />
        </button>

        <button onClick={handleComment} className={styles.actionButton}>
          <CommentOutlined sx={{ color: "#2F384C", fontSize: "1.2rem" }} />
        </button>

        <button onClick={handleShare} className={styles.actionButton}>
          <ShareOutlined sx={{ color: "#2F384C", fontSize: "1.2rem" }} />
        </button>
      </div>
    </div>
  );
}
