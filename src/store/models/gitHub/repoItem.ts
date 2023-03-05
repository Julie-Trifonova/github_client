import {
  gitHubRepoOwnerModel,
  normalizeGitHubRepoOwner,
} from "./gitHubRepoOwner";

export type GithubCardType = {
  name: string;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
  id: number;
  owner: gitHubRepoOwnerModel;
  private: boolean;
  full_name: string;
  topics: Array<string>;
  watchers_count: string;
  forks_count: string;
  fork: boolean;
  archive: boolean;
  mirror: boolean;
  template: boolean;
};

export type GitHubRepoItemModel = {
  name: string;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
  id: number;
  owner: gitHubRepoOwnerModel;
  private: boolean;
  full_name: string;
  topics: Array<string>;
  watchers_count: string;
  forks_count: string;
  fork: boolean;
  archive: boolean;
  mirror: boolean;
  template: boolean;
};

export const dateOptionsType: DateType = { month: "short", day: "numeric" };
export type DateType = {
  month: "short";
  day: "numeric";
};

export const normalizeGitHubRepoItem = (
  from: GithubCardType
): GitHubRepoItemModel => ({
  html_url: from.html_url,
  name: from.name,
  stargazers_count: from.stargazers_count,
  updated_at: new Date(from.updated_at).toLocaleDateString(
    "en-GB",
    dateOptionsType
  ),
  id: from.id,
  owner: normalizeGitHubRepoOwner(from.owner),
  private: from.private,
  full_name: from.full_name,
  topics: from.topics,
  watchers_count: from.watchers_count,
  forks_count: from.forks_count,
  fork: from.fork,
  archive: from.archive,
  mirror: from.mirror,
  template: from.template,
});
