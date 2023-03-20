import React from "react";

import { BlockType } from "components/blockType";
import { Loader } from "components/loader";
import styles from "components/repositories/Repositories.module.scss";
import { RepositoryCard } from "components/repositories/repositoryCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { RectShape, TextBlock } from "react-placeholder/lib/placeholders";
import { gitHubRepoItemModel } from "store/models/gitHub/gitHubRepoItemApi";
import { RootStore } from "store/RootStore";
// @ts-ignore
import gif from "styles/giphy_2.gif";
import { Meta } from "utils/meta";
import { useLocalStore } from "utils/UseLocalStore";

type PageInterface = {
  dataLength: number;
  next: () => Promise<void>;
  hasMore: boolean;
  list: gitHubRepoItemModel[];
  meta: string;
  handleSortByNameType: any;
  handleSortByUpdatingDateType: any;
  handleSortByStarsType: any;
  handleSortByCreatingDateType: any;
};

const RepositoriesPage: React.FC<PageInterface> = (props) => {
  const repositoriesStore = useLocalStore(
    () => new RootStore()
  ).queryRepositories;

  const GhostPlaceholder = () => (
    <div className={styles.placeholder}>
      <RectShape color="gray" style={{ width: 25, height: 70 }} />
      <TextBlock rows={6} color="blue" />
    </div>
  );

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
                {/*<ReactPlaceholder ready={props.meta === Meta.loading} customPlaceholder={<GhostPlaceholder />}>*/}
                {repositoriesStore.meta === Meta.loading ? (
                  <GhostPlaceholder />
                ) : (
                  <RepositoryCard
                    avatar={repo.owner.avatarUrl}
                    title={repo.name}
                    link={repo.htmlUrl}
                    starCount={repo.stargazersCount}
                    lastUpdated={repo.updatedAt}
                    owner={repo.owner.login}
                    id={repo.id}
                  />
                )}
                {/*</ReactPlaceholder>*/}
              </div>
            )
        )}
      </InfiniteScroll>
    </div>
  );
};
export { RepositoriesPage };
