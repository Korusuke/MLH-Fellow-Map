# Developer Guide

To start FellowMap locally, you can follow these steps: 
1. Clone the repository
1. Create a github personal access token by following the [docs here](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token). This github token will be required for fetching and organizing public information about fellows. 
1. Get an open cage API key by [signing up here](https://opencagedata.com/). This API key is used for geocoding (translating names of places to coordinates and vice versa)
1. Create a `.env` file with the following contents and fill in your token and API key that you received from step 2 and 3.
```
GITHUB_TOKEN=
OPEN_CAGE_API_KEY=
```
5. We're good to go! Run the following commands to start your development server.
```
yarn install
yarn start
```
