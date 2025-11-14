export interface User {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
}
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  owner: {
    login: string;
  };
}
export type FileContent = {
  type: 'file';
  name: string;
  path: string;
  content: string;
};
export type DirectoryContent = {
  type: 'dir' | 'file';
  name: string;
  path: string;
};
export type RepoContent = FileContent | DirectoryContent[];