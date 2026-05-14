// githubApi.js

/**
 * Helper to encode text to Base64 since GitHub API requires base64 encoded content.
 * Using btoa() with unescape and encodeURIComponent to support utf-8.
 */
function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

/**
 * Helper to decode Base64 to text.
 */
function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

/**
 * Validates the PAT token and returns user info.
 */
export async function validateToken(token, owner, repo) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error("Invalid credentials or repository not found.");
  }
  return response.json();
}

/**
 * Fetches file content and its SHA from the repository.
 * @param {string} token - GitHub PAT
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} path - Path to file (e.g., 'src/data/hero.json')
 */
export async function getFile(token, owner, repo, path) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      return { content: null, sha: null };
    }
    throw new Error(`Error fetching file: ${response.statusText}`);
  }

  const data = await response.json();
  const content = b64_to_utf8(data.content);
  return { content, sha: data.sha };
}

/**
 * Creates or updates a file in the repository.
 * @param {string} token - GitHub PAT
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} path - Path to file
 * @param {string} content - Raw content (e.g., JSON string)
 * @param {string} sha - Current SHA of the file (required for updates)
 * @param {string} commitMessage - Commit message
 */
export async function saveFile(token, owner, repo, path, content, sha, commitMessage = "Update via Admin Panel") {
  // Always fetch the latest SHA before saving to avoid conflicts, just in case.
  const current = await getFile(token, owner, repo, path).catch(() => ({ sha: null }));
  const latestSha = current.sha || sha;

  const body = {
    message: commitMessage,
    content: utf8_to_b64(content),
  };

  if (latestSha) {
    body.sha = latestSha;
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error saving file: ${errorData.message}`);
  }

  return response.json();
}
