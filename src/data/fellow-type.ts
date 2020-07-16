import { FellowDataQuery } from '../../graphql-types';
import { GithubProfile } from '../lib/github';

export type FellowType = {
  name: string;
  profilepic: string; // link or name of locally stored image
  bio: string;
  lat: string | number;
  long: string | number;
} & { [k in SocialType]?: string };

export const SocialLinks = {
  github: 'https://github.com',
  linkedin: 'https://www.linkedin.com/in',
  twitter: 'https://twitter.com',
};
export type SocialType = keyof typeof SocialLinks;

export class Fellow implements FellowType {
  bio: string;
  github: string;
  lat: number;
  linkedin?: string;
  long: number;
  name: string;
  profilepic: string;
  twitter?: string;
  website?: string;
  company?: string;

  podName: string;
  podId: string;

  body: string;

  // slug: string;

  profilePictureUrl?: string;

  constructor(
    { profilepic, name, lat, bio, github, linkedin, long, twitter }: FellowType,
    body: string,
    // slug: string,
    allImageSharp: FellowDataQuery['allImageSharp'],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    githubProfiles: GithubProfile[],
  ) {
    const githubProfile = githubProfiles.find((ele) => {
      return ele.username.toLowerCase() === github?.toLowerCase();
    });

    if (!githubProfile)
      throw new Error("Can't find github profile for: " + name);

    this.name = name || githubProfile.name;
    this.profilepic = profilepic;
    this.bio = bio || githubProfile.bio || '';
    this.github = github as string;
    this.twitter = twitter || githubProfile.twitter_username;
    this.linkedin = linkedin;
    this.lat = parseFloat(lat as string);
    this.long = parseFloat(long as string);
    this.website = githubProfile.website_url;
    this.company = githubProfile.company;

    this.podName = githubProfile.pod; // more like teamname, includes mentors and mlh staff
    this.podId = githubProfile.pod_id;

    this.body = body;
    // this.slug = slug;

    this.profilePictureUrl =
      allImageSharp.nodes.find((ele) => {
        if (!ele.fluid || !ele.fluid.originalName) return false;
        return ele.fluid.originalName === profilepic;
      })?.fluid?.src || githubProfile?.profilepic;
  }
}
