// generator practice, inspire by:
// https://www.youtube.com/watch?v=ategZqxHkz4

import fetch from 'isomorphic-fetch';
// import co from 'co';

const uri =  'http://jsonplaceholder.typicode.com/posts/1';

// fetch(uri)
//   .then(res => res.json())
//   .then(console.log);

function keepIterating(iterator, iteration) {
  const promise = Promise.resolve(iteration.value);

  // if we're done, promise is a value
  if (iteration.done) return promise;

  // resolve promise, then pass the result back to the next iterator
  // take the result, and recursively call keepIteratingIfPromise
  return promise.then((result) => {
    const nextIteration = iterator.next(result);
    return keepIterating(iterator, nextIteration);
  });
}

function myco(generator) {
  // invoking the generator, returns an iterator
  const iterator = generator();
  return keepIterating(iterator, iterator.next());
}

myco(function* () {
  const res = yield fetch(uri);
  const json = yield res.json();
  console.log(json);
});
