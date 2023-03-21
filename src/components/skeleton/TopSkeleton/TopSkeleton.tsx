import React from "react";

import ContentLoader from "react-content-loader";

const TopSkeleton = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={165}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="20" rx="6" ry="6" width="calc(98% - 50px)" height="50" />
    <rect x="calc(100% - 50px)" y="20" rx="6" ry="6" width="50" height="50" />
    <rect x="0" y="103" rx="0" ry="0" width="calc(92% - 160px)" height="24" />
    <rect x="calc(100% - 160px)" y="90" rx="6" ry="6" width="160" height="50" />
  </ContentLoader>
);

export { TopSkeleton };
