import React from 'react';
import sleep from 'sleep-promise';
import './style.css';

// Hey there!

// This is an introduction to the useDeferredValue hook.
// Start at the 1️⃣ and go from there :)

// This value controls the slowness.
// Increase it if you're on a faster machin and want to exaggurate the effect
let slowness = 1;

function PokemonSearch() {
  // 1️⃣
  // This is run-of-the-mill state
  let [searchTerm, updateSearchTerm] = React.useState('');

  // 4️⃣
  // useDeferredValue allows to separate low priority updates from high priority updates.
  // Here we establish that `deferredSearthTerm` can lag behind `searthTerm` to keep the input snappy.
  let deferredSearchTerm = React.useDeferredValue(searchTerm);

  return (
    <div>
      {/*
        2️⃣
        The `searchTerm` is both displayed and updated in this controlled input
      */}
      <input
        type="text"
        value={searchTerm}
        onChange={({ currentTarget }) => updateSearchTerm(currentTarget.value)}
      />
        {/*
          3️⃣
          If we use the `searthTerm` state for an a very expensive DOM update, *everything* slows down.
        */}
        {/* [...Array(slowness * 5000)].map(() => (
          <p>{searchTerm}</p>
        )) */}

        {/*
          5️⃣
          When we update the expensive update to use the deferred search term, the input stays snappy.
        */}
        {[...Array(slowness * 5000)].map(() => (
          <p>{deferredSearchTerm}</p>
        ))}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Pokedex memory game</h1>
      <ErrorBoundary>
        <React.Suspense fallback="loading pokemon…">
          <PokemonSearch />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

function suspensify(promise) {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
}

function fetchPokemon(id = 1) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then(sleep(500));
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
