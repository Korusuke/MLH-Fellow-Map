import { FellowDataQuery } from '../../graphql-types';

export interface FellowType {
  name: string;
  profilepic: string; // link or name of locally stored image
  description: string;
  github: string;
  linkedin: string;
  twitter: string;
  lat: string;
  long: string;
}

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
