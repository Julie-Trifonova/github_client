export type GitHubRepoOwnerApi = {
  avatar_url: string;
  login: string;
};

export type GitHubRepoOwnerModel = {
  avatar_url: string;
  login: string;
};

export const normalizeGitHubRepoOwner = (
  from: GitHubRepoOwnerApi
): GitHubRepoOwnerModel => ({
  avatar_url: from.avatar_url,
  login: from.login,
});
