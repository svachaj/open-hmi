# Moved to a new repo:
[official eli eric hmi repository](https://github.com/eli-eric/eli-hmi)


# OpenHMI

[![Tests](https://github.com/svachaj/open-hmi/actions/workflows/test.yml/badge.svg)](https://github.com/svachaj/open-hmi/actions/workflows/test.yml)

**OpenHMI** is an open-source library of pure web components written in TypeScript. It provides lightweight, standards-based custom elements for building human-machine interface (HMI) web applications. OpenHMI is framework-agnostic and is built using modern tooling with Vite for a fast development experience and optimized production builds.

> 🚧 **Under Construction!**
>
> **Development Status:**  
> We have officially started development, and our first production-ready version of the components is scheduled for release by the end of April.
>
> Stay tuned for updates!

## Features

- **Pure Web Components:** Uses the native Custom Elements API.
- **TypeScript Powered:** Benefits from type safety and improved developer experience.
- **Lightweight & Minimal:** Easy to integrate and extend.
- **Built with Vite:** Enjoy fast HMR and efficient production bundling.
- **Open Source:** Released under the MIT License.

## Installation

Install OpenHMI:

Using npm:

```bash
npm install open-hmi
```

Using yarn:

```bash
yarn add open-hmi
```

## Development

Clone the repository:

```bash
git clone https://github.com/yourusername/open-hmi.git
```

Navigate to the project directory:

```bash
cd open-hmi
```

Install the dependencies:

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn
```

Start the development server:

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

## Testing

The project uses Vitest for unit testing and Husky for git hooks.

Running tests:

Using npm:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

Using yarn:

```bash
# Run tests once
yarn test

# Run tests in watch mode
yarn test:watch
```

### Git Hooks

Husky is configured to run tests before each commit, ensuring that only working code is committed. If you need to bypass the pre-commit hook for any reason, you can use:

```bash
git commit -m "Your message" --no-verify
```

### React

```tsx
// Import the library with React support
import 'open-hmi/react';

function App() {
  return <hmi-counter></hmi-counter>;
}
```
