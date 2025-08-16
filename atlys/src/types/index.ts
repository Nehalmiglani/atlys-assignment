export interface User {
    id: string
    email: string
    name: string
    avatar?: string
  }
  
  export interface Author {
    name: string
    email: string
    avatar?: string
  }
  
  export interface Post {
    id: string
    author: Author
    content: string
    timestamp: Date
    likes: number
    comments: number
    isLiked: boolean
  }
  
  export interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string, name: string) => Promise<boolean>;
    logout: () => void
    isLoading: boolean
  }
  
  export interface PostContextType {
    posts: Post[]
    addPost: (content: string, author: Author) => void
    toggleLike: (postId: string) => void
  }
  
  export type AuthMode = "signin" | "signup"
  
  
  export interface MockUser {
    id: string
    email: string
    password: string
    name: string
  }
  