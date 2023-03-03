import { ReactNode } from "react";

// import { GithubCardType } from "@store/models/gitHub/repoItem";
import { GithubCardType } from "../store/models/gitHub/repoItem";

export type GetRepositoriesType = {
  (pageNumber: number, perPageCount: number, organization?: string): Promise<
    Array<GithubCardType>
  >;
};

export type GetOrganizationReposListParams = {
  pageNumber: number;
  perPageCount: number;
  organizationName: string;
};

export type GetRepoItemParams = {
  owner: string;
  repo: string;
};

export type GetRepositoryType = {
  (owner: string, repo: string): Promise<GithubCardType>;
};

export type GetRepositoriesCountType = {
  (organizationName: string): Promise<never | number>;
};

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void>;
  getOrganizationReposCount(organizationName: string): Promise<void>;
  getRepoItem(params: GetRepoItemParams): Promise<void>;
  fetchOrganizationReposList(): Promise<void>;
  setSearchValue(e: string): void;
}

// export blockType GetRepositoriesType = {
//   (pageNumber: number, perPageCount: number, organization?: string): Promise<
//     Array<GithubCardType>
//   >;
// };
//
// export blockType GetRepositoryType = {
//   (org: string, repoName: string): Promise<GithubCardType>;
// };
//
// export blockType GetRepositoriesCountType = {
//   (): Promise<never | any>;
// };
//
// export blockType DataType = {
//   month: "short";
//   day: "numeric";
// };
//
// export blockType GithubCardType = {
//   id: number;
//   node_id: string;
//   name: string;
//   owner: OwnerType;
//   full_name: string;
//   html_url: string;
//   updated_at: string;
//   private: boolean;
//   visibility: string;
//   watchers_count: string;
//   stargazers_count: number;
//   forks_count: number;
//   git_tags_url: string;
//   topics: Array<string>;
//   content: string;
// };
//
// export blockType OwnerType = {
//   avatar_url: string;
//   login: string;
// };
