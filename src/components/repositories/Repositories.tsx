import React, { useCallback, useEffect } from "react";

import {Skeleton} from "components/skeleton/Skeleton";
import { GitHubError } from "components/gitHubError/GitHubError";
import { RepositoriesPage } from "components/page/RepositoriesPage";
import ScrollButton from "components/scrollButton/ScrollButton";
import { Search } from "components/search";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import { RootStore } from "store/RootStore";
import { Meta } from "utils/meta";
import { useLocalStore } from "utils/UseLocalStore";

import styles from "./Repositories.module.scss";

const Repositories: React.FC = observer(() => {
  const repositoriesStore = useLocalStore(
    () => new RootStore()
  ).queryRepositories;
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
    } else {
      repositoriesStore
        .getOrganizationReposList({
          pageNumber: 1,
          perPageCount: 20,
          organizationName: "ktsstudio",
        })
        .then();
    }
  }, [repositoriesStore, search]);

  const handleSearchButton = useCallback(
    (organization: string) => {
      setSearch({ repo: organization });
      repositoriesStore.setSearchValue(organization);
      repositoriesStore
        .getOrganizationReposCount(repositoriesStore.searchValue())
        .then();
      repositoriesStore
        .getOrganizationReposList({
          pageNumber: 1,
          perPageCount: 20,
          organizationName: repositoriesStore.searchValue(),
        })
        .then();
    },
    [repositoriesStore, setSearch]
  );

  const handleSortByStarsType = () => {
    repositoriesStore.sortByStarsType();
  };
  const handleSortByNameType = () => {
    repositoriesStore.sortByNameType();
  };
  const handleSortByUpdatingDateType = () => {
    repositoriesStore.sortByDateUpdatingType();
  };
  const handleSortByCreatingDateType = () => {
    repositoriesStore.sortByCreatingDateType();
  };

    if (repositoriesStore.meta === Meta.loading) {
    return (
      <div className={styles.skeleton_position}>
        <Skeleton />
      </div>
    );
  }

  return (
    <section className={`${styles.repositories} ${styles.repositories_media}`}>
        <ScrollButton />
      <Search handleSearchButton={handleSearchButton} />
      {repositoriesStore.meta === Meta.error ? (
        <GitHubError errorMessage={repositoriesStore.errorMessage} />
      ) : (
        <RepositoriesPage
          handleSortByUpdatingDateType={handleSortByUpdatingDateType}
          handleSortByNameType={handleSortByNameType}
          handleSortByStarsType={handleSortByStarsType}
          handleSortByCreatingDateType={handleSortByCreatingDateType}
          dataLength={repositoriesStore.list.length}
          next={() => repositoriesStore.fetchOrganizationReposList()}
          hasMore={repositoriesStore.hasMore}
          list={repositoriesStore.list}
        />
      )}
    </section>
  );
});

export { Repositories };
