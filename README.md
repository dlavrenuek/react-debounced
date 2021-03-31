# Universal debounce hook for React

![CI](https://github.com/dlavrenuek/react-debounced/workflows/ci/badge.svg)
[![CodeQL](https://github.com/dlavrenuek/react-debounced/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/dlavrenuek/react-debounced/actions/workflows/codeql-analysis.yml)
[![npm version](https://badge.fury.io/js/react-debounced.svg)](http://badge.fury.io/js/react-debounced)

![react-debounced](docs/logo.png)

Universal `useDebounce` hook which can be used for any debounced action. Only
the last provided callback will be executed after a given timeout.

## Installation

Install with yarn

```bash
yarn add react-debounced
```

Install with npm

```bash
npm install react-debounced
```

## Example usage

Import the hook first

```typescript
import useDebounce from 'react-debounced';
```

Use it in your functional components:

```typescript jsx
const Test = () => {
  const debounce = useDebounce();
  const [value, setValue] = useState('');
  const [debounced, setDebounced] = useState('');

  const handleInput = (e) => {
    const { value } = e.target;
    setValue(value);
    debounce(() => {
      // any functionality, like triggering api calls or setting a state, can be used here
      console.log('Debounced');
      setDebounced(value);
    });
  };

  return (
    <>
      <p>Value: {value}</p>
      <p>Debounced: {debounced}</p>
      <input placeholder="Fill me out" value={value} onChange={handleInput} />
    </>
  );
};
```

### Options

`useDebounce` has only one optional parameter `timeout`, which is set to 250ms per default.

#### Example with a 100 milliseconds timeout

```typescript jsx
const debounce = useDebounce(100);
```

### Multiple debounce in one component

Each call of `useDebounce` inside a component will return a `debounce` function with its own timeout.
If you need to debounce multiple input fields, just use:

```typescript jsx
const debounceOne = useDebounce();
const debounceTwo = useDebounce();
```
