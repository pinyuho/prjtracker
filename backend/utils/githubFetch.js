export const githubFetch = (req, url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${req.githubAccessToken}`,
      ...(options.headers || {}),
    },
  });
};
