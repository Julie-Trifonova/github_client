import {
  GithubCardType,
  GitHubRepoItemModel,
  normalizeGitHubRepoItem,
} from "@store/models/gitHub/repoItem";
import {
  CollectionModel,
  getInitialCollectionModel,
  normalizeCollection,
} from "@store/models/shared/collection";
import {
  getRepository,
  getRepositories,
  getRepositoriesCount,
  getRepositoryReadme,
} from "@utils/api";
import { getMoreFetch } from "@utils/helpers";
import { logger } from "@utils/logger";
import { Meta } from "@utils/meta";
import {
  GetOrganizationReposListParams,
  GetRepoItemParams,
  IGitHubStore,
} from "@utils/types";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields =
  | "_list"
  | "_meta"
  | "_count"
  | "_hasMore"
  | "_repoItem"
  | "_repoReadme"
  | "_searchValue"
  | "_errorMessage";

class GitHubStore implements IGitHubStore {
  private _list: CollectionModel<number, GitHubRepoItemModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _count = 0;
  private _hasMore = true;
  private _page = 2;
  private _repoItem: GitHubRepoItemModel | null = null;
  private _repoReadme: string | GithubCardType | null = null;
  private _searchValue = "";
  private _errorMessage = "";
  private _sortType = false;

  constructor() {
    makeObservable<GitHubStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _count: observable,
      _hasMore: observable,
      _repoItem: observable,
      _repoReadme: observable,
      _searchValue: observable,
      _errorMessage: observable,
      list: computed,
      meta: computed,
      getOrganizationReposList: action,
      getOrganizationReposCount: action,
      getRepoItem: action,
      fetchOrganizationReposList: action,
      setSearchValue: action,
      setErrorMessage: action,
      sortByTypes: action,
    });
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  get searchValue(): string {
    return this._searchValue;
  }

  get repoItem(): GitHubRepoItemModel | null {
    return this._repoItem;
  }
  get repoReadme(): string | GithubCardType | null {
    return this._repoReadme;
  }

  get hasMore(): boolean {
    return this._hasMore;
  }

  get list(): GitHubRepoItemModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  sortByTypes = (type: string) => {
    this._sortType = !this._sortType;
    const list = linearizeCollection(this._list);
    if (this._sortType) {
      if (type === "archive") {
        list.sort((a: GitHubRepoItemModel, b: GitHubRepoItemModel) => {
          if (a.archive > b.archive) {
            return 1;
          }
          if (a.archive < b.archive) {
            return -1;
          }
          return 0;
        });
      } else if (type === "mirror") {
        list.sort((a: GitHubRepoItemModel, b: GitHubRepoItemModel) => {
          if (a.mirror > b.mirror) {
            return 1;
          }
          if (a.mirror < b.mirror) {
            return -1;
          }
          return 0;
        });
      } else if (type === "mirror") {
        list.sort((a: GitHubRepoItemModel, b: GitHubRepoItemModel) => {
          if (a.fork > b.fork) {
            return 1;
          }
          if (a.fork < b.fork) {
            return -1;
          }
          return 0;
        });
      } else if (type === "mirror") {
        list.sort((a: GitHubRepoItemModel, b: GitHubRepoItemModel) => {
          if (a.template > b.template) {
            return 1;
          }
          if (a.template < b.template) {
            return -1;
          }
          return 0;
        });
      }
    }
    this._list = normalizeCollection(list, (listItem) => listItem.id);
  };

  setSearchValue = (e: string) => {
    this._searchValue = e;
  };

  setErrorMessage = (e: string) => {
    this._errorMessage = e;
  };

  async getRepoItem(params: GetRepoItemParams) {
    this._repoItem = null;
    this._meta = Meta.loading;
    this.setErrorMessage("");
    const data = await getRepository(params.owner, params.repo);

    runInAction(() => {
      if (data) {
        try {
          this._repoItem = normalizeGitHubRepoItem(data);
          this._meta = Meta.success;
          return;
        } catch (e) {
          this._meta = Meta.error;
        }
      }
      this._meta = Meta.error;
    });
  }

  async getRepoReadme(params: GetRepoItemParams) {
    this._repoReadme = null;
    this._meta = Meta.loading;
    this.setErrorMessage("");
    const data = await getRepositoryReadme(params.owner, params.repo);

    runInAction(() => {
      if (data) {
        try {
          this._repoReadme = data;
          this._meta = Meta.success;
          return;
        } catch (e) {
          this._meta = Meta.error;
        }
      }
      this._meta = Meta.error;
    });
  }

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void> {
    this.setErrorMessage("");
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();
    this._hasMore = true;
    this._page = 2;
    if (params.organizationName !== "") {
      try {
        const data = await getRepositories(
          params.pageNumber,
          params.perPageCount,
          params.organizationName
        );

        runInAction(() => {
          if (data) {
            try {
              const list: GitHubRepoItemModel[] = data.map(
                normalizeGitHubRepoItem
              );
              this._list = normalizeCollection(list, (listItem) => listItem.id);
              this._meta = Meta.success;
              return;
            } catch (e) {
              logger(e);
              this._meta = Meta.error;
              this._list = getInitialCollectionModel();
            }
          }
          this._meta = Meta.error;
        });
      } catch (e) {
        runInAction(() => {
          if (axios.isAxiosError(e)) {
            this.setErrorMessage(e.message);
            this._meta = Meta.error;
          }
          this._meta = Meta.error;
        });
      }
    }
  }

  async getOrganizationReposCount(organizationName: string): Promise<void> {
    this.setErrorMessage("");
    this._count = 0;
    this.setSearchValue(organizationName);
    this._meta = Meta.loading;
    try {
      const data = await getRepositoriesCount(organizationName);
      runInAction(() => {
        if (data) {
          this._count = data;
          this._meta = Meta.success;
          this._repoItem = null;
          return;
        }
        this._meta = Meta.error;
      });
    } catch (e) {
      runInAction(() => {
        this._meta = Meta.error;
        if (axios.isAxiosError(e)) {
          this.setErrorMessage(e.message);
          this._meta = Meta.error;
        }
      });
    }
  }

  async fetchOrganizationReposList(): Promise<void> {
    const data = await getRepositories(this._page, 20, this.searchValue);
    this.setErrorMessage("");
    runInAction(() => {
      if (data) {
        try {
          let list = data.map(normalizeGitHubRepoItem);
          const prevList = Object.values(this._list.entities).map(
            (item) => this._list.entities[item.id]
          );
          list = prevList.concat(list);
          this._list = normalizeCollection(list, (listItem) => listItem.id);
          this._hasMore = getMoreFetch(this._list.order.length, this._count);
          this._page += 1;
          return;
        } catch (e) {
          logger(e);
        }
      }
    });
    runInAction(() => {
      this._hasMore = getMoreFetch(this._list.order.length, this._count);
    });
  }
}
export default GitHubStore;
export const linearizeCollection = <K extends string | number, T>(
  elements: CollectionModel<K, T>
): T[] => elements.order.map((el) => elements.entities[el]);
