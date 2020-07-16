import { FellowDataQuery } from '../../graphql-types';

export type FellowType = {
  name: string;
  profilepic: string; // link or name of locally stored image
  description: string;
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
  description: string;
  github: string;
  lat: number;
  linkedin: string;
  long: number;
  name: string;
  private profilepic: string;
  twitter: string;
  body: string;
  // slug: string;

  profilePictureUrl?: string;

  constructor(
    {
      profilepic,
      name,
      lat,
      description,
      github,
      linkedin,
      long,
      twitter,
    }: FellowType,
    body: string,
    // slug: string,
    allImageSharp: FellowDataQuery['allImageSharp'],
  ) {
    this.description = description;
    this.github = github;
    this.lat = parseFloat(lat as string);
    this.linkedin = linkedin;
    this.long = parseFloat(long as string);
    this.name = name;
    this.profilepic = profilepic;
    this.twitter = twitter;
    this.body = body;
    // this.slug = slug;

    this.profilePictureUrl = allImageSharp.nodes.find((ele) => {
      if (!ele.fluid || !ele.fluid.originalName) return false;
      return ele.fluid.originalName === profilepic;
    })?.fluid?.src;
  }
}
