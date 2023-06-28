export interface ICreatePostRequest {
  title: string;
  desc: string;
  content: string;
  cateId: number;
  file: File | Blob | null;
}
export interface IGetPostRequest {
  id: string;
}
export interface IGetPostResponse {
  p_id: string;
  type: string;
  c_name: string;
  count_like: number;
  count_comment: number;
  p_content: string;
  p_thumbnail: string;
  u_avatar: string;
  u_email: string;
  p_desc: string;
  p_title: string;
  u_name: string;
  created_at: string;
}
export interface ICreatePostResponse {}

export interface ICardPost {
  p_id: string;
  type?: string;
  c_name: string;
  count_like: number;
  count_comment: number;
  p_thumbnail: string;
  p_content: string;
  p_desc: string;
  p_title: string;
  u_name: string;
  created_at: string;
}
export interface ICategories {
  c_id: number;
  c_name: string;
}
