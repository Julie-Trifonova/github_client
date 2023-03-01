import React, { useCallback, useEffect, useState } from "react";

import { Loader } from "@components/loader/Loader";
import { RepositoryCard } from "@components/repositories/repositoryCard/RepositoryCard";
import { Search } from "@components/search";
import { BlockType } from "@components/type";
import { getRepositories, getRepositoriesCount } from "@utils/api";
import { logger } from "@utils/logger";
import { GithubCardType } from "@utils/types";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "./Repositories.module.scss";

const Repositories: React.FC = () => {
  const [repos, setRepos] = useState<GithubCardType[]>();
  const [countRepos, setCountRepos] = useState(0);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  // const [valueType, setValueType] = useState('common');

  useEffect(() => {
    getRepositories(1, 10)
      .then((response) => {
        if (response) {
          setRepos(response);
        }
      })
      .catch((error) => logger(error));
    getRepositoriesCount()
      .then((response) => setCountRepos(response))
      .catch((error) => logger(error));
  }, []);

  const fetchData = useCallback(() => {
    getRepositories(page, 10)
      .then((response) => {
        if (response && repos !== undefined) {
          setRepos([...repos, ...response]);
        }
      })
      .then(() =>
        setHasMore(
          repos !== undefined &&
            repos.length !== 0 &&
            repos.length !== countRepos
        )
      )
      .then(() => setPage(page + 1))
      .catch((err) => logger(err));
  }, [page, repos, countRepos]);

  if (repos === undefined || repos.length === 0) {
    return (
      <div className={styles.loader_position}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.repositories_block}>
      <Search />
      <InfiniteScroll
        dataLength={repos.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <div className={styles.loader_position}>
            <Loader />
          </div>
        }
        endMessage={<h2 className={styles.loader_position}>End</h2>}
      >
        <BlockType repos={repos} disabled={false} />
        {repos.map(
          (repo) =>
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
    </div>
  );
};

export { Repositories };
