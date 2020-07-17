<center>
<img src="https://imgur.com/7aGHaWN.png" width="400"/>
</center>


![GitHub Workflow Status](https://img.shields.io/github/workflow/status/korusuke/MLH-Fellow-Map/Gatsby%20Publish) ![GitHub license](https://img.shields.io/github/license/Korusuke/MLH-Fellow-Map) [![GitHub contributors](https://img.shields.io/github/contributors/Korusuke/MLH-Fellow-Map)](https://GitHub.com/Korusuke/MLH-Fellow-Map/graphs/contributors/)


## Where is FellowMap?

Current deployment can be found at [fellowmap.space](https://fellowmap.space)

v1.0 can be found at [mlh-fellows.surge.sh](https://mlh-fellows.surge.sh/)

## What is FellowMap

Just a really cool world map that shows all the MLH Fellows, Mentors and MLH Staff. It's a place for fellows to show off their work and describe their journey to the world.

## Why is FellowMap?

Being the inaugural batch of MLH Fellowship we had no idea of what to expect or what is expected of us. This is effort to make the on-boarding process easier for future fellows by having experiences and journey of all past fellows in one place. 

## How to FellowMap?

### Basic Profile
If you want to add content such as your socials, website or even just a detailed bio, try adding/updating your own mdx file with your github profile username. 
###### Instruction: `Profile Details`
- MDX file location: `src/profiles` 
- Filename: [`github_username.mdx`](https://github.com/Korusuke/MLH-Fellow-map/new/master/src/profiles/)
- Profile Template: 
```markdown
---
name: John Doe (Optional, if not provided will be sourced from github)
lat: '25.0000' (Sourced from geocoding 'Location' on your Github profile. If this is not accurate, set it here)
long: '71.0000' (Sourced from geocoding 'Location' on your Github profile. If this is not accurate, set it here)
profilepic: john.png (Optional, if not provided will be sourced from github)
github: john (Required)
twitter: jdoe (Optional, if not provided will be sourced from github)
linkedin: johndoe (Optional)
bio: I am John Doe, thats all you need to know. (Optional, if not provided will be sourced from github)
---
Anything typed here will be part of your page. You can use *full* MDX capabilities!
```
**Note**: The `---` are necessary at the start and end of `.md` file. LatLong should be in quotes.

###### Instruction: `Profile Image`
- Profile image file location: `src/profiles/images` 
- Image name: `github_username.png`


### Advanced profile

If you want to add more content like a blog post, special links or a lengthy memoir, you can always edit the `mdx` file and put the content below the basic profile description.
Full MDX capabilites are provided, go crazy!
