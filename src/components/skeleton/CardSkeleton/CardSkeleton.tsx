import React from "react";

import ContentLoader from "react-content-loader";

const CardSkeleton = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={110}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="52" cy="55" r="40" />
    <rect x="104" y="23" rx="0" ry="0" width="40" height="16" />
    <rect x="104" y="49" rx="0" ry="0" width="48" height="14" />
    <rect x="104" y="73" rx="0" ry="0" width="20" height="14" />
    <rect x="142" y="73" rx="0" ry="0" width="80" height="14" />
  </ContentLoader>
);

export { CardSkeleton };
