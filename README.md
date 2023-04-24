# Spotify Track Visualizer - WIP


## Installation

run ``cp .env.example .env.local`` inside project root and edit the .env.local file.

```bash
  yarn install
  # or
  npm install
```

Installs the dependencies.


## Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local files

| Variable | Description |
|--|--|
| `SPOTIFY_CLIENT_ID`  | your spotify client id |
| `SPOTIFY_CLIENT_SECRET` | your spotify client secret |
| `SPOTIFY_REDIRECT_URI` | your spotify redirect uri|
| `PROJECT_ROOT` |  e.g. http://localhost:3000 |
