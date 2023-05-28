export interface ICreatePostRequest {
  title: string;
  desc: string;
  content: string;
  cateId: number;
  file: File | Blob | null;
}
export interface ICreatePostResponse {}
