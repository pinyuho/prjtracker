function parseRepoFullNameFromRepositoryUrl(repositoryUrl) {
  // 只要 repo 名就好，這裡直接回 repo
  // e.g. https://api.github.com/repos/pinyuho/prjtracker -> "prjtracker"
  if (!repositoryUrl) return "";
  const parts = repositoryUrl.split("/");
  return parts[parts.length - 1] || "";
}

export function normalizeIssue(issue, fallbackOwner, fallbackRepo) {
  const repo =
    issue?.repository?.name ||
    parseRepoFullNameFromRepositoryUrl(issue?.repository_url) ||
    fallbackRepo ||
    "";

  return { ...issue, repo };
}
