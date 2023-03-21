import React from "react";

import { BlockType } from "components/blockType";
import { Loader } from "components/loader";
import styles from "components/repositories/Repositories.module.scss";
import { RepositoryCard } from "components/repositories/repositoryCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { RectShape, TextBlock } from "react-placeholder/lib/placeholders";
import { gitHubRepoItemModel } from "store/models/gitHub/gitHubRepoItemApi";
import { RootStore } from "store/RootStore";
import { Meta } from "utils/meta";
import { useLocalStore } from "utils/UseLocalStore";
import {logger} from "utils/logger";
let gif = require("styles/giphy_3.gif");

type PageInterface = {
  dataLength: number;
  next: () => Promise<void>;
  hasMore: boolean;
  list: gitHubRepoItemModel[];
  handleSortByNameType: () => void;
  handleSortByUpdatingDateType: () => void;
  handleSortByStarsType: () => void;
  handleSortByCreatingDateType: () => void;
};

const RepositoriesPage: React.FC<PageInterface> = (props) => {

  return (
    <div>
      <InfiniteScroll
        dataLength={props.dataLength}
        next={() => props.next()}
        hasMore={props.hasMore}
        loader={
          <div className={styles.skeleton_position}>
            <Loader />
          </div>
        }
        endMessage={<img className={styles.end_gif} src={gif} alt="gif" />}
      >
        <BlockType
          disabled={false}
          handleSortByUpdatingDateType={props.handleSortByUpdatingDateType}
          handleSortByNameType={props.handleSortByNameType}
          handleSortByStarsType={props.handleSortByStarsType}
          handleSortByCreatingDateType={props.handleSortByCreatingDateType}
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
