export type GetRepositoriesType = {
  (pageNumber: number, perPageCount: number, organization?: string): Promise<
    Array<GithubCardType>
  >;
};

export type GetRepositoryType = {
  (org: string, repoName: string): Promise<GithubCardType>;
};

export type GetRepositoriesCountType = {
  (): Promise<never | any>;
};

export type DataType = {
  month: "short";
  day: "numeric";
};

export type GithubCardType = {
  id: number;
  node_id: string;
  name: string;
  owner: OwnerType;
  full_name: string;
  html_url: string;
  updated_at: string;
  private: boolean;
  visibility: string;
  watchers_count: string;
  stargazers_count: number;
  forks_count: number;
  git_tags_url: string;
  topics: Array<string>;
  content: string;
};

export type OwnerType = {
  avatar_url: string;
  login: string;
};
