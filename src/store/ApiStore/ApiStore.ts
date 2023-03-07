import {GetOrganizationReposListParams, GetRepoItemParams, IRepositoriesStore} from "@utils/types";
import {Meta} from "@utils/meta";
import {getRepositories, getRepositoriesCount, getRepository} from "@utils/api";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {GitHubRepoItemModel, normalizeGitHubRepoItem} from "@store/models/gitHub";
import {CollectionModel, getInitialCollectionModel, normalizeCollection} from "@store/models/shared/collection";
import {logger} from "@utils/logger";
import axios from "axios";
import {getMoreFetch} from "@utils/helpers";
import {linearizeCollection} from "@store/RepositoriesStore/RepositoriesStore";

export interface IApiStore {

}

class ApiStore implements IApiStore {
    list: CollectionModel<number, GitHubRepoItemModel> =
        getInitialCollectionModel();
    meta: Meta = Meta.initial;
    count = 0;
    hasMore = true;
    page = 2;
    repoItem: GitHubRepoItemModel | null = null;
    search = "";
    errorMessage = "";

    constructor() {
        makeObservable<ApiStore | any>(this, {
            list: observable.ref,
            meta: observable,
            count: observable,
            hasMore: observable,
            repoItem: observable,
            searchValue: computed,
            errorMessage: observable.ref,
            getOrganizationReposList: action.bound,
            getOrganizationReposCount: action.bound,
            getRepoItem: action.bound,
            fetchOrganizationReposList: action.bound,
            setSearchValue: action,
            setErrorMessage: action,
            values: computed,
        });
    }

    setErrorMessage = (e: string) => {
        this.errorMessage = e;
    };
    setSearchValue = (e: string) => {
        this.search = e;
    };

    get values () {
        return {
            meta: this.meta,
            count: this.count,
            hasMore: this.hasMore,
            page: this.page,
            repoItem: this.repoItem,
            search: this.search,
            errorMessage: this.errorMessage,
            list: this.list,
            searchValue: this.searchValue,

        }
    }
    get searchValue(): string {
        return this.search;
    }

    async getRepoItem(params: GetRepoItemParams) {
        this.repoItem = null;
        this.meta = Meta.loading;
        this.setErrorMessage("");
        const data = await getRepository(params.owner, params.repo);

        runInAction(() => {
            if (data) {
                try {
                    this.repoItem = normalizeGitHubRepoItem(data);
                    this.meta = Meta.success;
                    return;
                } catch (e) {
                    this.meta = Meta.error;
                }
            }
            this.meta = Meta.error;
        });
    }

    async getOrganizationReposList(
        params: GetOrganizationReposListParams
    ): Promise<void> {
        this.setErrorMessage("");
        this.meta = Meta.loading;
        this.list = getInitialCollectionModel();
        this.hasMore = true;
        this.page = 2;
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
                            this.list = normalizeCollection(list, (listItem) => listItem.id);
                            this.meta = Meta.success;
                            return;
                        } catch (e) {
                            logger(e);
                            this.meta = Meta.error;
                            this.list = getInitialCollectionModel();
                        }
                    }
                    this.meta = Meta.error;
                });
            } catch (e) {
                runInAction(() => {
                    if (axios.isAxiosError(e)) {
                        this.setErrorMessage(e.message);
                        this.meta = Meta.error;
                    }
                    this.meta = Meta.error;
                });
            }
        }
    }

    async getOrganizationReposCount (organizationName: string): Promise<void> {
        this.setErrorMessage("");
        this.count = 0;
        this.setSearchValue(organizationName);
        this.meta = Meta.loading;
        try {
            const data = await getRepositoriesCount(organizationName);
            runInAction(() => {
                if (data) {
                    this.count = data;
                    this.meta = Meta.success;
                    this.repoItem = null;
                    return;
                }
                this.meta = Meta.error;
            });
        } catch (e) {
            runInAction(() => {
                this.meta = Meta.error;
                if (axios.isAxiosError(e)) {
                    this.setErrorMessage(e.message);
                    this.meta = Meta.error;
                }
            });
        }
    }

    async fetchOrganizationReposList(): Promise<void> {
        const data = await getRepositories(this.page, 20, this.searchValue);
        this.setErrorMessage("");
        runInAction(() => {
            if (data) {
                try {
                    let list = data.map(normalizeGitHubRepoItem);
                    const prevList = Object.values(this.list.entities).map(
                        (item) => this.list.entities[item.id]
                    );
                    list = prevList.concat(list);
                    this.list = normalizeCollection(list, (listItem) => listItem.id);
                    this.hasMore = getMoreFetch(this.list.order.length, this.count);
                    this.page += 1;
                    return;
                } catch (e) {
                    logger(e);
                }
            }
        });
        runInAction(() => {
            this.hasMore = getMoreFetch(this.list.order.length, this.count);
        });
    }
}
export default ApiStore;