import { User, Repository, DirectoryContent, FileContent } from './types';
const MOCK_USER: User = {
  login: 'octocat',
  avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
  name: 'The Octocat',
  bio: 'GitHub\'s mascot',
  followers: 9999,
  following: 9,
  public_repos: 8,
};
const MOCK_REPOS: Repository[] = [
  {
    id: 1,
    name: 'Spoon-Knife',
    full_name: 'octocat/Spoon-Knife',
    description: 'This repo is for demonstration purposes only.',
    language: 'HTML',
    stargazers_count: 11500,
    forks_count: 8000,
    updated_at: '2024-07-20T12:00:00Z',
    owner: { login: 'octocat' },
  },
  {
    id: 2,
    name: 'hello-world',
    full_name: 'octocat/hello-world',
    description: 'My first repository on GitHub!',
    language: 'JavaScript',
    stargazers_count: 2500,
    forks_count: 1800,
    updated_at: '2024-07-19T10:30:00Z',
    owner: { login: 'octocat' },
  },
  {
    id: 3,
    name: 'git-flight-rules',
    full_name: 'octocat/git-flight-rules',
    description: 'Flight rules for git.',
    language: 'Markdown',
    stargazers_count: 35000,
    forks_count: 5000,
    updated_at: '2024-07-21T08:00:00Z',
    owner: { login: 'octocat' },
  },
  {
    id: 4,
    name: 'octocat.github.io',
    full_name: 'octocat/octocat.github.io',
    description: 'The Octocat\'s personal website.',
    language: 'CSS',
    stargazers_count: 500,
    forks_count: 200,
    updated_at: '2024-06-15T18:45:00Z',
    owner: { login: 'octocat' },
  },
];
const MOCK_REPO_TREE: DirectoryContent[] = [
    { type: 'dir', name: '.github', path: '.github' },
    { type: 'file', name: 'README.md', path: 'README.md' },
    { type: 'file', name: 'index.html', path: 'index.html' },
    { type: 'file', name: 'style.css', path: 'style.css' },
];
const MOCK_README_CONTENT: FileContent = {
    type: 'file',
    name: 'README.md',
    path: 'README.md',
    content: `
# Spoon-Knife
This is the first repository ever created on GitHub! It's used for testing and demonstration purposes.
## Usage
Feel free to fork this repository and play around with it.
\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>Hello World</title>
</head>
<body>
  <h1>Hello, GitHub!</h1>
</body>
</html>
\`\`\`
`,
};
const MOCK_FILE_CONTENT: FileContent = {
    type: 'file',
    name: 'index.html',
    path: 'index.html',
    content: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spoon-Knife</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Hello from Spoon-Knife!</h1>
    <p>This is a demonstration file.</p>
</body>
</html>
`.trim(),
};
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
export const getUser = async (username: string): Promise<User> => {
  await delay(500);
  if (username.toLowerCase() === 'octocat') {
    return MOCK_USER;
  }
  throw new Error('User not found');
};
export const getUserRepos = async (username: string): Promise<Repository[]> => {
  await delay(800);
  if (username.toLowerCase() === 'octocat') {
    return MOCK_REPOS;
  }
  return [];
};
export const getRepo = async (owner: string, repo: string): Promise<Repository> => {
    await delay(500);
    if (owner.toLowerCase() === 'octocat') {
        const foundRepo = MOCK_REPOS.find(r => r.name.toLowerCase() === repo.toLowerCase());
        if (foundRepo) return foundRepo;
    }
    throw new Error('Repository not found');
}
export const getRepoContents = async (owner: string, repo: string, path: string): Promise<DirectoryContent[] | FileContent> => {
    await delay(700);
    if (owner.toLowerCase() !== 'octocat' || repo.toLowerCase() !== 'spoon-knife') {
        throw new Error('Not found');
    }
    if (path === '') {
        return MOCK_REPO_TREE;
    }
    if (path === 'README.md') {
        return MOCK_README_CONTENT;
    }
    if (path === 'index.html') {
        return MOCK_FILE_CONTENT;
    }
    if (path === 'style.css') {
        return {
            type: 'file',
            name: 'style.css',
            path: 'style.css',
            content: 'body { font-family: sans-serif; }'
        }
    }
    if (path === '.github') {
        return [{ type: 'file', name: 'workflows', path: '.github/workflows' }];
    }
    throw new Error('File or directory not found');
}