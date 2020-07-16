import { FellowDataQuery } from '../../graphql-types';

type ArrayType<T extends Array<unknown>> = T extends Array<infer U> ? U : never;

export type GithubProfile = {
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
};

export function githubParser(
  githubData: ArrayType<FellowDataQuery['allGithubData']['nodes']>['data'],
) {
  const users: GithubProfile[] = [];

  githubData?.organization?.teams?.edges?.forEach((obj) => {
    if (!obj || !obj.node) return;
    const team = obj.node;
    if (!team.name || !team.members) return;

    // Skip the parent teams; CTF would include people in other pods, so ignore that too
    if (
      [
        'TTP Fellows (Summer 2020)',
        'CTF',
        'MLH Fellows (Summer 2020)',
      ].includes(team.name)
    )
      return;

    const members = team.members.nodes;
    if (!members) return;
    members.forEach((user) => {
      if (!user) return;
      users.push({
        name: user.name as string,
        profilepic: user.avatarUrl || undefined,
        bio: user.bio || undefined,
        email: user.email as string,
        followers: user.followers?.totalCount as number,
        following: user.following?.totalCount as number,
        location: user.location || undefined,
        username: user.login as string,
        twitter_username: user.twitterUsername || undefined,
        website_url: user.websiteUrl || undefined,
        company: user.company || undefined,
        pod: getPodName(team.name as string, team.description as string),
        pod_id: team.name as string,
      });
    });
  });

  return users;
}

const getPodName = (name: string, description: string) => {
  // 'name' is ID; 'description' is name
  if (name.startsWith('Pod')) {
    return description === '' ? name : description;
  } else {
    return name;
  }
};
