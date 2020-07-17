import { FellowDataQuery } from '../../graphql-types';

type ArrayType<T extends Array<unknown>> = T extends Array<infer U> ? U : never;

declare type GithubProfile = {
  name: string;
  email: string;
  followers: number;
  following: number;
  username: string;

  twitter_username?: string;
  website_url?: string;
  company?: string;
  profilepic?: string;
  bio?: string;
  location?: string;

  pod: string;
  pod_id: string;
  podLogoUrl?: string;
};

declare function githubParser(
  githubData: ArrayType<FellowDataQuery['allGithubData']['nodes']>['data'],
): GithubProfile[];
