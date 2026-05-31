import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const githubPagesBasePath =
  process.env.GITHUB_ACTIONS === "true" && repositoryName
    ? `/${repositoryName}`
    : "";

const nextConfig: NextConfig = {
  assetPrefix: githubPagesBasePath || undefined,
  basePath: githubPagesBasePath || undefined,
  devIndicators: false,
  output: "export",
  trailingSlash: true
};

export default nextConfig;
