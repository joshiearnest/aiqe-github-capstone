import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

type EnvironmentVariableName =
  | 'BASE_URL'
  | 'GITHUB_BASE_URL'
  | 'GITHUB_API_BASE_URL'
  | 'GITHUB_OWNER'
  | 'GITHUB_REPO'
  | 'GITHUB_FILTER_REPO'
  | 'GITHUB_TOKEN'
  | 'GITHUB_USERNAME'
  | 'NODE_ENV';

const readEnv = (key: EnvironmentVariableName, fallback = ''): string => {
  return String(process.env[key] ?? fallback).trim();
};

const readBooleanEnv = (key: 'CI', fallback = false): boolean => {
  const value = process.env[key];

  if (value === undefined) {
    return fallback;
  }

  return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
};

export const getRequiredEnv = (key: EnvironmentVariableName): string => {
  const value = readEnv(key);

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const env = {
  nodeEnv: readEnv('NODE_ENV', 'development'),
  isCi: readBooleanEnv('CI', false),
  baseUrl: readEnv('BASE_URL', readEnv('GITHUB_BASE_URL', 'https://github.com')),
  apiBaseUrl: readEnv('GITHUB_API_BASE_URL', 'https://api.github.com'),
  owner: readEnv('GITHUB_OWNER', 'microsoft'),
  repo: readEnv('GITHUB_REPO', 'playwright'),
  filterRepo: readEnv('GITHUB_FILTER_REPO', 'winget-pkgs'),
  token: readEnv('GITHUB_TOKEN'),
  username: readEnv('GITHUB_USERNAME'),
};

export const githubConfig = {
  baseUrl: env.baseUrl,
  apiBaseUrl: env.apiBaseUrl,
  owner: env.owner,
  repo: env.repo,
  filterRepo: env.filterRepo,
  token: env.token,
  username: env.username,
};
