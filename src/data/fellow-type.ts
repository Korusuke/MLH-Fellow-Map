import { FellowDataQuery } from '../../graphql-types';

export type FellowType = {
  name: string;
  profilepic: string; // link or name of locally stored image
  bio: string;
  lat: string;
  long: string;
} & { [k in SocialType]: string };

export const SocialLinks = {
  github: 'https://github.com',
  linkedin: 'https://www.linkedin.com/in',
  twitter: 'https://twitter.com',
};
export type SocialType = keyof typeof SocialLinks;

export class Fellow {
  bio: string;
  github: string;
  lat: number;
  linkedin: string;
  long: number;
  name: string;
  private profilepic: string;
  twitter: string;
  website: string;
  company: string;
  podName: string;
  podId: string;
  body: string;
  // slug: string;

  profilePictureUrl: string;

  constructor(
    { profilepic, name, lat, bio, github, linkedin, long, twitter }: FellowType,
    body: string,
    // slug: string,
    allImageSharp: FellowDataQuery['allImageSharp'],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    githubProfiles: [any],
  ) {
    const githubProfile = githubProfiles.find((ele) => {
      return ele.username.toLowerCase() === github.toLowerCase();
    });

    this.name = name || githubProfile.name;
    this.profilepic = profilepic;
    this.bio = bio || githubProfile.bio;
    this.github = github;
    this.twitter = twitter || githubProfile.twitter_username;
    this.linkedin = linkedin;
    this.lat = parseFloat(lat as string);
    this.long = parseFloat(long as string);
    this.website = githubProfile.website_url;
    this.company = githubProfile.company;
    this.podName = githubProfile.pod;
    this.podId = githubProfile.pod_id;
    // this.slug = slug;

    this.profilePictureUrl =
      allImageSharp.nodes.find((ele) => {
        if (!ele.fluid || !ele.fluid.originalName) return false;
        return ele.fluid.originalName === profilepic;
      })?.fluid?.src || githubProfile.profilepic;
  }
}
