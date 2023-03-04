import React, { useCallback, useEffect } from "react";

import { BlockType } from "@components/blockType";
import { GitHubError } from "@components/gitHubError/GitHubError";
import { Loader } from "@components/loader/Loader";
import { InitialPage } from "@components/repositories/initialPage/InitialPage";
import { RepositoryCard } from "@components/repositories/repositoryCard/RepositoryCard";
import { Search } from "@components/search";
import GitHubStore from "@store/gitHubStore";
import { GitHubRepoItemModel } from "@store/models/gitHub";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

import styles from "./Repositories.module.scss";

const Repositories: React.FC = observer(() => {
  const gitHubStore = React.useMemo(() => new GitHubStore(), []);
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if (search.get("repo") && search.get("repo") !== null) {
      gitHubStore
        .getOrganizationReposCount(search.get("repo") as string)
        .then();
      gitHubStore.setSearchValue(search.get("repo") as string);
      gitHubStore
        .getOrganizationReposList({
          pageNumber: 1,
          perPageCount: 20,
          organizationName: search.get("repo") as string,
        })
        .then();
    }
  }, [gitHubStore, search]);

  const handleSearchButton = useCallback(
    (organization: string) => {
      setSearch({ repo: organization });
      gitHubStore.setSearchValue(organization);
      gitHubStore.getOrganizationReposCount(gitHubStore.searchValue).then();
      gitHubStore
        .getOrganizationReposList({
          pageNumber: 1,
          perPageCount: 20,
          organizationName: gitHubStore.searchValue,
        })
        .then();
    },
    [gitHubStore, setSearch]
  );

  if (gitHubStore.meta === Meta.loading) {
    return (
      <div className={styles.loader_position}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.repositories_block}>
      <Search handleSearchButton={handleSearchButton} />
      {gitHubStore.meta === Meta.error ? (
        <GitHubError errorMessage={gitHubStore.errorMessage} />
      ) : gitHubStore.meta === Meta.initial ? (
        <InitialPage />
      ) : (
        <InfiniteScroll
          dataLength={gitHubStore.list.length}
          next={() => gitHubStore.fetchOrganizationReposList()}
          hasMore={gitHubStore.hasMore}
          loader={
            <div className={styles.loader_position}>
              <Loader />
            </div>
          }
          endMessage={<h2 className={styles.loader_position}>End</h2>}
        >
          <BlockType disabled={false} />
          {gitHubStore.list.map(
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
