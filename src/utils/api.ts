import { BASE_URL, HEADER_API_KEY } from "@config/constants";
import { GithubCardType } from "@store/models/gitHub/repoItem";
import {
  GetRepositoriesType,
  GetRepositoryType,
  GetRepositoriesCountType,
} from "@utils/types";
import axios from "axios";

const getRepositories: GetRepositoriesType = async (
  pageNumber,
  perPageCount,
  organization = "ktsstudio"
) => {
  if (HEADER_API_KEY === undefined) {
    throw new Error("Cannot find HEADER_API_KEY");
  }
  try {
    const request = await axios.get<GithubCardType[]>(
      `${BASE_URL}/orgs/${organization}/repos?page=${pageNumber}&per_page=${perPageCount}`,
      HEADER_API_KEY
    );
    const data = await request.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("unexpected");
    }
  }
};

const getRepository: GetRepositoryType = async (org, repoName) => {
  if (HEADER_API_KEY === undefined) {
    throw new Error("Cannot find HEADER_API_KEY");
  }
  try {
    const request = await axios.get<GithubCardType>(
      `${BASE_URL}/repos/${org}/${repoName}`,
      HEADER_API_KEY
    );
    const data = await request.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("unexpected");
    }
  }
};

const config = {
  headers: {
    Authorization: HEADER_API_KEY,
    Accept: "application/vnd.github.raw",
  },
};
const getRepositoryReadme: GetRepositoryType = async (org, repoName) => {
  if (HEADER_API_KEY === undefined) {
    throw new Error("Cannot find HEADER_API_KEY");
  }
  try {
    const request = await axios.get<GithubCardType>(
      `${BASE_URL}/repos/${org}/${repoName}/readme`,
      config
    );
    const data = await request.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("unexpected");
    }
  }
};

const getRepositoriesCount: GetRepositoriesCountType = async (
  organizationName
) => {
  if (HEADER_API_KEY === undefined) {
    throw new Error("Cannot find HEADER_API_KEY");
  }
  try {
    const request = await axios.get(
      `${BASE_URL}/orgs/${organizationName}`,
      HEADER_API_KEY
    );
    const data = await request.data;
    return data.public_repos;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("unexpected");
    }
  }
};

export {
  getRepositories,
  getRepository,
  getRepositoriesCount,
  getRepositoryReadme,
};
