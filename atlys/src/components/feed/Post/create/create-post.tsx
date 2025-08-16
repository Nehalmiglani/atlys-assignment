import {
  Send,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Code,
  AttachFile,
  Add,
  Delete,
  EmojiEmotionsOutlined,
} from "@mui/icons-material";
import styles from "./create-post.module.css";
import { useState } from "react";
import { useAuth } from "../../../../context/auth-context";

interface PostEditorProps {
  addPost: (a: string, b: any) => void;
  onInteraction: () => void;
}

const toolbarIcons = [
  { Icon: FormatBold, label: "Bold" },
  { Icon: FormatItalic, label: "Italic" },
  { Icon: FormatUnderlined, label: "Underline" },
  { Icon: FormatListNumbered, label: "Numbered List" },
  { Icon: FormatListBulleted, label: "List" },
  { Icon: FormatQuote, label: "Quote" },
  { Icon: Code, label: "Code" },
];

export default function PostEditor({
  addPost,
  onInteraction,
}: PostEditorProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user) return onInteraction();
    if (!content.trim()) return;

    setIsSubmitting(true);

    try {
      addPost(content.trim(), { name: user.name, email: user.email });
      setContent("");
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.toolbar}>
          <div className={styles.formattingButtons}>
            {toolbarIcons.map((Icon, i) => (
              <button
                key={i}
                className={styles.iconButton}
                onClick={onInteraction}
                type="button"
              >
                <Icon.Icon sx={{ fontSize: "1.2rem" }} />
              </button>
            ))}
          </div>
          <button
            className={styles.deleteButton}
            onClick={onInteraction}
            type="button"
          >
            <Delete />
          </button>
        </div>

        <div className={styles.contentArea}>
          <span className={styles.emoji}>😊</span>
          <textarea
            className={styles.textarea}
            placeholder="How are you feeling today?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.actionButtons}>
            <button
              className={styles.iconButton}
              onClick={onInteraction}
              type="button"
            >
              <Add sx={{ fontSize: "1.2rem" }} />
            </button>
            <button
              className={styles.iconButton}
              onClick={onInteraction}
              type="button"
            >
              <AttachFile sx={{ fontSize: "1.2rem" }} />
            </button>
            <button
              className={styles.iconButton}
              onClick={onInteraction}
              type="button"
            >
              <EmojiEmotionsOutlined sx={{ fontSize: "1.2rem" }} />
            </button>
          </div>

          <button
            className={`${styles.submitButton} ${
              content.trim() ? styles.enabled : styles.disabled
            }`}
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
            type="button"
          >
            <Send
              className={`${styles.submitButton} ${
                content.trim() ? styles.enabled : styles.disabled
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
