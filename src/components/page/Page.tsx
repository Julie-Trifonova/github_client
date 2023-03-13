import React from "react";

import {Loader} from "components/loader";
import {BlockType} from "components/blockType";
import {gitHubRepoItemModel} from "store/models/gitHub/gitHubRepoItemApi";
import {RepositoryCard} from "components/repositories/repositoryCard";

import InfiniteScroll from "react-infinite-scroll-component";

import styles from "components/repositories/Repositories.module.scss";


type PageInterface = {
    dataLength: number,
    next: () => Promise<void>,
    hasMore: boolean,
    list: gitHubRepoItemModel[],
}

const Page: React.FC<PageInterface> = (props) => {
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
                <BlockType disabled={false} />
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
    )
}
export {Page}