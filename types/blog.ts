export interface BlogType {
  id: number,
  imageUrl: string,
  title: string,
  content: string,
  author: string,
  createdAt: string,
  likes: number,
  isLiked: boolean
}

export interface BlogPayload {
  imageUrl: string;
  title: string;
  content: string;
  userId: number;
}

export interface BlogDataType {
  id: number,
  user_id: number,
  title: string,
  image_url: string,
  content: string,
  created_at: string
}