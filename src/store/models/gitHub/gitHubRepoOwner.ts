export type gitHubRepoOwnerApi = {
  avatar_url: string;
  login: string;
};

export type gitHubRepoOwnerModel = {
  avatar_url: string;
  login: string;
};

export const normalizeGitHubRepoOwner = (
  from: gitHubRepoOwnerApi
): gitHubRepoOwnerModel => ({
  avatar_url: from.avatar_url,
  login: from.login,
});
