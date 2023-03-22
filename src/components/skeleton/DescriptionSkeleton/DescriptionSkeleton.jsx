import React from "react";

import ContentLoader from "react-content-loader";

import styles from "./DescriptionSkeleton.module.scss";

const DescriptionSkeleton = () => (
  <ContentLoader
    className={styles.skeleton_description}
    speed={2}
    width="100%"
    height="2000"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="20" rx="6" ry="6" width="20" height="30" />
    <rect x="38" y="25" rx="0" ry="0" width="200" height="20" />
    <rect x="0" y="74" rx="2" ry="2" width="16" height="16" />
    <rect x="20" y="75" rx="0" ry="0" width="90" height="14" />
    <rect x="0" y="112" rx="14" ry="14" width="90" height="22" />
    <rect x="95" y="112" rx="14" ry="14" width="90" height="22" />
    <rect x="0" y="152" rx="2" ry="2" width="14" height="14" />
    <rect x="21" y="152" rx="0" ry="0" width="45" height="14" />
    <rect x="0" y="174" rx="2" ry="2" width="14" height="14" />
    <rect x="21" y="174" rx="0" ry="0" width="65" height="14" />
    <rect x="0" y="196" rx="2" ry="2" width="14" height="14" />
    <rect x="21" y="196" rx="0" ry="0" width="35" height="14" />
    <rect x="0" y="235" rx="6" ry="6" width="100%" height="100%" />
  </ContentLoader>
);

export { DescriptionSkeleton };
