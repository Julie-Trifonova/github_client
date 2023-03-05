import { GithubCardType } from "@store/models/gitHub/repoItem";

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
  setErrorMessage(e: string): void;
}

export interface IRepositoryStore {
  getRepoItem(params: GetRepoItemParams): Promise<void>;
  setErrorMessage(e: string): void;
}
export interface IRepositoriesStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void>;
  getOrganizationReposCount(organizationName: string): Promise<void>;
  getRepoItem(params: GetRepoItemParams): Promise<void>;
  fetchOrganizationReposList(): Promise<void>;
  setSearchValue(e: string): void;
  setErrorMessage(e: string): void;
}
