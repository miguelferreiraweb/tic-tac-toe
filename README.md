This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

## SonarQube

[https://sonarcloud.io/project/overview?id=miguelferreiraweb_tic-tac-toe](https://sonarcloud.io/project/overview?id=miguelferreiraweb_tic-tac-toe)

## Preview

<img src="/screenshots/player_turn.png" width="50%" height="50%" />
<img src="/screenshots/victory.png" width="50%" height="50%" />
