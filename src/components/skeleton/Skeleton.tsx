import React from "react";

import { CardSkeleton } from "components/skeleton/CardSkeleton";
import { TopSkeleton } from "components/skeleton/TopSkeleton";

import styles from "./Skeleton.module.scss";

const Skeleton = () => {
  const arr = Array.from(Array(100).keys());
  return (
    <div className={styles.skeleton}>
      <TopSkeleton />
      <CardSkeleton />
      {arr.map((a: number) => (
        <CardSkeleton />
      ))}
    </div>
  );
};
export { Skeleton };
