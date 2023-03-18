import React from "react";

import { BlockType } from "components/blockType";
import { Loader } from "components/loader";
import styles from "components/repositories/Repositories.module.scss";
import { RepositoryCard } from "components/repositories/repositoryCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { gitHubRepoItemModel } from "store/models/gitHub/gitHubRepoItemApi";

type PageInterface = {
  dataLength: number;
  next: () => Promise<void>;
  hasMore: boolean;
  list: gitHubRepoItemModel[];
    handleSortByNameType: any;
    handleSortByDateType: any;
    handleSortByStarsType: any;
};

const RepositoriesPage: React.FC<PageInterface> = (props) => {
  return (
    <div>
      <InfiniteScroll
        dataLength={props.dataLength}
        next={() => props.next()}
        hasMore={props.hasMore}
        loader={
          <div className={styles.loader_position}>
            <Loader />
          </div>
        }
        endMessage={<h2 className={styles.loader_position}>End</h2>}
      >
        <BlockType disabled={false}
                   handleSortByDateType={props.handleSortByDateType}
                   handleSortByNameType={props.handleSortByNameType}
                   handleSortByStarsType={props.handleSortByStarsType}
        />
        {props.list.map(
          (repo: gitHubRepoItemModel) =>
            !repo.private && (
              <div key={repo.id}>
                <RepositoryCard
                  avatar={repo.owner.avatarUrl}
                  title={repo.name}
                  link={repo.htmlUrl}
                  starCount={repo.stargazersCount}
                  lastUpdated={repo.updatedAt}
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
export { RepositoriesPage };
