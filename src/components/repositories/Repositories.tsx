import React, { useCallback, useEffect } from "react";

import { GitHubError } from "components/gitHubError/GitHubError";
import { Loader } from "components/loader/Loader";
import { Search } from "components/search";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import { RootStore } from "store/RootStore";
import { Meta } from "utils/meta";

import styles from "./Repositories.module.scss";
import {Page} from "components/page/Page";

const Repositories: React.FC = observer(() => {
  const repositoriesStore = React.useMemo(
    () => new RootStore(),
    []
  ).queryRepositories;
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if (search.get("repo") && search.get("repo") !== null) {
      repositoriesStore.getOrganizationReposCount(search.get("repo") as string);
      repositoriesStore.setSearchValue(search.get("repo") as string);
      repositoriesStore.getOrganizationReposList({
        pageNumber: 1,
        perPageCount: 20,
        organizationName: search.get("repo") as string,
      });
    } else {
      repositoriesStore.getOrganizationReposList({
        pageNumber: 1,
        perPageCount: 20,
        organizationName: "ktsstudio",
      });
    }
  }, [repositoriesStore, search]);

  const handleSearchButton = useCallback(
    (organization: string) => {
      setSearch({ repo: organization });
      repositoriesStore.setSearchValue(organization);
      repositoriesStore.getOrganizationReposCount(
        repositoriesStore.searchValue
      );
      repositoriesStore.getOrganizationReposList({
        pageNumber: 1,
        perPageCount: 20,
        organizationName: repositoriesStore.searchValue,
      });
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
      ) : <Page
          dataLength={repositoriesStore.list.length}
          next={() => repositoriesStore.fetchOrganizationReposList()}
          hasMore={repositoriesStore.hasMore}
          list={repositoriesStore.list}
      />
      }
    </div>
  );
});

export { Repositories };
