# unisender-ts

Typescript Interface for Unisender GO web API. 

Based on [Unisender API documentation](https://godocs.unisender.ru/web-api-ref#web-api).

## Features

-  Uses the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
-  Tree-shakable
-  No dependencies
-  Typescript support
-  100% test coverage

## Installation

```bash
npm install unisender-ts
```

## Usage

### Basic usage

```typescript
import { Unisender } from 'unisender-ts';

const unisender = new Unisender(
    "https://go1.unisender.ru/ru/transactional/api/v1",
    "<your api key>"
);

await unisender.send({
    message: {
        recipients: [
            { email: 'example@mail.com' },
        ],
        subject: "Hello, world!",
        body: {
            plaintext: "This is a test email",
        },
        global_language: "en",
        from_name: "John Doe",
        from_email: "j.doe@company.com",
    },
});
```

### Import only the functions you need

To reduce the size of the bundle, you can import only the functions you need:

```typescript

import { send } from 'unisender-ts';

await send(
    "https://go1.unisender.ru/ru/transactional/api/v1", 
    "<your api key>",
    {
        message: {
            recipients: [
                { email: 'example@mail.com' },
            ],
            subject: "Hello, world!",
            body: {
                plaintext: "This is a test email",
            },
            global_language: "en",
            from_name: "John Doe",
            from_email: "j.doe@company.com",
        },
    },
);
```

## Development

This project uses the [bun](https://bun.sh/) runtime for development tasks.
Linting and formatting is done using [biome](https://biomejs.dev/).
Building is done using [tsc](https://www.typescriptlang.org/).

```bash
# install dependencies:
bun install
# run tests
bun test
# run linter
bun run lint
# run code formatter
bun run format
# build project
bun run build
```