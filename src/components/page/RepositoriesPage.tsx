import React from "react";

import { BlockType } from "components/blockType";
import { Loader } from "components/loader";
import { RepositoryCard } from "components/repositories/repositoryCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { gitHubRepoItemModel } from "store/models/gitHub/gitHubRepoItemApi";

import styles from "components/repositories/Repositories.module.scss";

// @ts-ignore
import gigI from 'styles/giphy_22.gif'

type PageInterface = {
  dataLength: number;
  next: () => Promise<void>;
  hasMore: boolean;
  list: gitHubRepoItemModel[];
  handleSortByNameType: any;
  handleSortByUpdatingDateType: any;
  handleSortByStarsType: any;
  handleSortByCreatingDateType: any;
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
        endMessage={
            <img className={styles.gif} src={gigI} alt='jj'/>
      }
      >
        <BlockType
          disabled={false}
          handleSortByUpdatingDateType={props.handleSortByUpdatingDateType}
          handleSortByNameType={props.handleSortByNameType}
          handleSortByStarsType={props.handleSortByStarsType}
          handleSortByCreatingDateType={props.handleSortByCreatingDateType}
        />
          <img className={styles.gif} src={gigI} alt='jj'/>
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
