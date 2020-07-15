export function githubParser(teams) {
  const users: {
    name: string;
    profilepic: string;
    bio: string;
    email: string;
    followers: unknown;
    following: unknown;
    location: string;
    username: string;
    username_original: string;
    twitter_username: string;
    website_url: string;
    company: string;
    pod: string;
    pod_id: string;
  }[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  teams.forEach((obj: { node: any }) => {
    const team = obj.node;

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
    members.forEach((user) => {
      users.push({
        name: user.name,
        profilepic: user.avatarUrl,
        bio: user.bio,
        email: user.email,
        followers: user.followers.totalCount,
        following: user.following.totalCount,
        location: user.location,
        username: user.login,
        username_original: user.login,
        twitter_username: user.twitterUsername,
        website_url: user.websiteUrl,
        company: user.company,
        pod: getPodName(team.name, team.description),
        pod_id: team.name,
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
