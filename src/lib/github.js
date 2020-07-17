export function githubParser(githubData) {
  const users = [];

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
        name: user.name,
        profilepic: user.avatarUrl || undefined,
        bio: user.bio || undefined,
        email: user.email,
        followers: user.followers?.totalCount,
        following: user.following?.totalCount,
        location: user.location || undefined,
        username: user.login,
        twitter_username: user.twitterUsername || undefined,
        website_url: user.websiteUrl || undefined,
        company: user.company || undefined,
        pod: getPodName(team.name, team.description),
        pod_id: team.name,
        podLogoUrl: team.avatarUrl || undefined,
      });
    });
  });

  return users;
}

const getPodName = (name, description) => {
  // 'name' is ID; 'description' is name
  if (name.startsWith('Pod')) {
    return description === '' ? name : description;
  } else {
    return name;
  }
};
