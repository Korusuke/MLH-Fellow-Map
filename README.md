# MLH Fellow Locator

Link to [Map](https://mlh-fellows.surge.sh)

## Add yourself

To add yourself to the map follow the following steps;

- Add a Profile Pic to `static/images`. (example name: `korusuke.png`)
- Add a `.md` file of preferred name to `src/profiles`.
- Copy the below template into the file created in above step.
- Fill out your details.

## Template

```markdown
---
name: John Doe
profilepic: john.png
github: john
twitter: jdoe
linkedin: johndoe
bio: I am John Doe, that's all you need to know.
lat: '25.0000'
long: '71.0000'
---
```

**Note**: The `---` are necessary at the start and end of `.md` file. LatLong should be in quotes.

## Development

To work on MLH Fellowmap and test your addition to the map, you need to add your GitHub Token to a `.env` file in the root directory

e.g 
```
GITHUB_TOKEN=your_token_here
```

then run `yarn develop`
TS definitions for GraphQL are only generated after running yarn gatsby for the first time.