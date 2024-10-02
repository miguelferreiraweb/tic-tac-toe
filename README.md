## Live App Urls

PROD:

[https://tic-tac-toe-miguelferreirawebs-projects.vercel.app/](https://tic-tac-toe-miguelferreirawebs-projects.vercel.app/)

~~https://tic-tac-toe-prod.fly.dev~~

DEV:

~~https://tic-tac-toe-dev.fly.dev~~
(deployment to DEV discontinued due to "free version" billing costs blocking deployment on fly.io website. The idea of having two environments was just for practice purposes).

## App Preview

<img src="/screenshots/player_turn.png" width="50%" height="50%" />
<img src="/screenshots/victory.png" width="50%" height="50%" />

## Getting Started

First, run the development server:

```
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Docker

### To build and run a local docker image follow the next steps

- Install Docker in your machine.
- **Docker build command**:

```
docker build -t tic-tac-toe .
```

- **Docker run command**:

```
docker run -p 3000:3000 tic-tac-toe
```

## SonarCloud

[https://sonarcloud.io/project/overview?id=miguelferreiraweb_tic-tac-toe](https://sonarcloud.io/project/overview?id=miguelferreiraweb_tic-tac-toe)
