import React, { useCallback, useEffect } from "react";

import { BlockType } from "@components/blockType";
import { GitHubError } from "@components/gitHubError/GitHubError";
import { Loader } from "@components/loader/Loader";
import { InitialPage } from "@components/repositories/initialPage/InitialPage";
import { RepositoryCard } from "@components/repositories/repositoryCard/RepositoryCard";
import { Search } from "@components/search";
import { GitHubRepoItemModel } from "@store/models/gitHub";
import RepositoriesStore from "@store/RepositoriesStore";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

import styles from "./Repositories.module.scss";
import RootStore from "@store/RootStore";

const Repositories: React.FC = observer(() => {
  const repositoriesStore = React.useMemo(() => new RootStore(), []).queryRepositories;
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if (search.get("repo") && search.get("repo") !== null) {
      repositoriesStore
        .getOrganizationReposCount(search.get("repo") as string)
        .then();
      repositoriesStore.setSearchValue(search.get("repo") as string);
      repositoriesStore
        .getOrganizationReposList({
          pageNumber: 1,
          perPageCount: 20,
          organizationName: search.get("repo") as string,
        })
        .then();
    }
  }, [repositoriesStore, search]);

  const handleSearchButton = useCallback(
    (organization: string) => {
      setSearch({ repo: organization });
      repositoriesStore.setSearchValue(organization);
      repositoriesStore
        .getOrganizationReposCount(repositoriesStore.searchValue)
        .then();
      repositoriesStore
        .getOrganizationReposList({
          pageNumber: 1,
          perPageCount: 20,
          organizationName: repositoriesStore.searchValue,
        })
        .then();
    },
    [repositoriesStore, setSearch]
  );

  if (repositoriesStore.meta === Meta.loading) {
    return (
      <div className={styles.loader_position}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.repositories_block}>
      <Search handleSearchButton={handleSearchButton} />
      {repositoriesStore.meta === Meta.error ? (
        <GitHubError errorMessage={repositoriesStore.errorMessage} />
      ) : repositoriesStore.meta === Meta.initial ? (
        <InitialPage />
      ) : (
        <InfiniteScroll
          dataLength={repositoriesStore.list.length}
          next={() => repositoriesStore.fetchOrganizationReposList()}
          hasMore={repositoriesStore.hasMore}
          loader={
            <div className={styles.loader_position}>
              <Loader />
            </div>
          }
          endMessage={<h2 className={styles.loader_position}>End</h2>}
        >
          <BlockType disabled={false} />
          {repositoriesStore.list.map(
            (repo: GitHubRepoItemModel) =>
              !repo.private && (
                <div key={repo.id}>
                  <RepositoryCard
                    avatar={repo.owner.avatar_url}
                    title={repo.name}
                    link={repo.html_url}
                    starCount={repo.stargazers_count}
                    lastUpdated={repo.updated_at}
                    owner={repo.owner.login}
                    id={repo.id}
                  />
                </div>
              )
          )}
        </InfiniteScroll>
      )}
    </div>
  );
});

export default Repositories;
