# Using OpenHMI with React

OpenHMI is designed to work seamlessly with React. The custom elements are automatically typed,
so you don't need to create any additional type declaration files.

## Basic Usage

```tsx
// Import the package
import 'open-hmi';

function MyComponent() {
  return <hmi-counter></hmi-counter>;
}
```

## Usage with Next.js (or other SSR frameworks)

For frameworks with server-side rendering, use dynamic imports:

```tsx
import dynamic from 'next/dynamic';

// Import components dynamically with ssr: false
const HmiComponents = dynamic(
  () => import('open-hmi'),
  { ssr: false }
);

function MyNextComponent() {
  return (
    <>
      {/* This loads the component script only on client-side */}
      <HmiComponents />
      <hmi-counter></hmi-counter>
    </>
  );
}
```
