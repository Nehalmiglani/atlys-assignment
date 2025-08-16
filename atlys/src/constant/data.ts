import type { MockUser, Post } from "../types";

export const MOCK_USERS: MockUser[] = [
  {
    id: "1",
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
  },
  { id: "2", email: "test@user.com", password: "testpass", name: "Test User" },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    author: { name: "Theresa Webb", email: "theresa@example.com" },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 24,
    comments: 8,
    isLiked: false,
  },
  {
    id: "2",
    author: { name: "John Doe", email: "john@example.com" },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt egant solution is the simplest one. Less is more! 🚀",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 42,
    comments: 15,
    isLiked: true,
  },
  {
    id: "3",
    author: { name: "Jane Doe", email: "jane@example.com" },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt condition that only happened under specific circumstances. The satisfaction of solving these puzzles never gets old!",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    likes: 18,
    comments: 6,
    isLiked: false,
  },
];
