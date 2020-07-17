import { FellowDataQuery } from '../../graphql-types';
import { GithubProfile } from '../lib/github';

export type FellowType = {
  name?: string | null;
  profilepic?: string | null; // link or name of locally stored image
  bio?: string | null;
  lat?: string | number | null;
  long?: string | number | null;
} & { [k in SocialType]?: string | null };

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
  twitter?: string;
  website?: string;
  company?: string;

  podName: string;
  podId: string;

  body?: string;

  // slug: string;

  profilePictureUrl?: string;

  constructor(
    githubProfile: GithubProfile,
    allImageSharp: FellowDataQuery['allImageSharp'],
    fellow?: FellowType | null,
    body?: string,
  ) {
    const { profilepic, name, lat, bio, linkedin, long, twitter } =
      fellow || {};

    if (!githubProfile) {
      console.log(fellow);
      throw new Error('No github profile given for ' + fellow?.github);
    }
    if (
      fellow?.github &&
      fellow.github.toLowerCase() !== githubProfile.username.toLowerCase()
    )
      throw new Error('Mismatch between given MDX fellow and Github Fellow!');

    this.name = name || githubProfile.name;
    this.bio = bio || githubProfile.bio || '';
    this.github = githubProfile.username;
    this.twitter = twitter || githubProfile.twitter_username;
    this.linkedin = linkedin || undefined;
    this.lat = parseFloat(lat as string) || 0;
    this.long = parseFloat(long as string) || 0;
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
