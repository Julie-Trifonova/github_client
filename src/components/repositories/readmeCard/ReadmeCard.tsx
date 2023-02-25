import React, { ReactNode } from "react";

import Markdown from "markdown-to-jsx";

const ReadmeCard: React.FC<string> = (readme) => {
  return <Markdown>{readme}</Markdown>;
};

export { ReadmeCard };
