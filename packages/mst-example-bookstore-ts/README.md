# Bookshop typescript example

## Best practices / style

The Model (of Book): BookModel
An Instance (of Book): `interface Book extends Instance<typeof BookModel>`

## Features

-   Implemented in Typescript, and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Change log
- CRA installed
- Added jest.config.js to be able to run jest
- Added .env to force ignore this projects jest babel version mismatch vst MST
- Converted the /store from the js example to /model, including first testers


## TODO: convert things the JS version of the example also has

-   Routing as part of state
-   True separation of concerns: state and view
-   References
-   Built-in devtools: recording / replaying snapshots, patches or actions
-   Unit tests, testing full application flow

Related talks using this project:

-   [React Amsterdam 2017 talk: Divide and Conquer](https://www.youtube.com/watch?v=3J9EJrvqOiM)
-   [React Europe 2017 talk: Next generation state managament](https://www.youtube.com/watch?v=rwqwwn_46kA)

Based on create-react-app

## Install

```
yarn install
yarn start
yarn test
```


