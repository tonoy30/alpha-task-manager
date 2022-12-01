# Brikl backend engineer assignment

## Introducing the Alpha

Alpha is the new startup company we are developing a cutting edge task management system with modern technology.

You will be getting involved on this! We have setting up user service to manage user in our system but we still missing our core business logic which is the task management.

## Functionality

### Task management

- [x] Create a new list
- [x] Create a new task in a list (the task should be prepended to the list and the
      status should indicate it has not been completed)
- [x] Update a task (title and status)
- [ ] Delete a task or list `(not mentioned in the shared pdf)`
- [x] Move a task to a specific position in the list
- [x] Retrieve all lists and their tasks

## Getting start

- [Prerequisites](#prerequisites)
- [Setup](#setup)

### Prerequisites

Make sure you have these tools installed

- Docker
- Node.js
- Node package manager, preferably `pnpm`

### Setup

This is the instruction to setup this project and run in your local machine. Note that this instruction uses `pnpm` as a package manager. You may replace these commands corresponding to your package manager.

1. Copy `.env.example` file and rename it to `.env`. You can modified `.env` file according to your requirement.
2. Run `pnpm i` to install dependencies.
3. Run `docker compose up --build -d` to start docker containers in background.
4. Run `pnpm db:migrate` to initiate database.
5. Run `pnpm codegen` to generate `TypeScript` definition for `GraphQL` and `Prisma` client.
6. Run `pnpm db:seed` to seeding the database using `datasources/list.ts`
7. Run `pnpm start` to start the project or `pnpm dev` to start the project in watch mode.
8. Go to `http://localhost:4000`, you should see Apollo Playground with four queries `lists`, `pagedLists`, `users` and `user`. You may change the port according to `GATEWAY_PORT` in your `.env` file.
9. Run `pnpm test` to start testing or `pnpm test:watch` to start testing in watch mode
