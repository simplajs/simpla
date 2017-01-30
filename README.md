# Simpla 2.0 (pre-release)

This is a pre-release branch for Simpla v2. It is under active development - breaking changes, bugs, and instability should be expected. It should be used for **testing only**, it should _not_ be used in production.

## Goals
The overriding goal of v2.0 is to lay the foundation required to open up the Simpla ecosystem. To achieve this we've focussed on a few areas:

- **Create a single source of truth across the ecosystem.** The v2 SDK introduces states (eg: `editable`, `authenticated`) and a data buffer, which mediates all data in a Simpla app. This makes interacting with Simpla's API significantly more straightforward, both for element authors and end-users

- **Streamline element authorship.** V2 introduces new mechanisms (eg: observers) that make creating elements for the Simpla ecosystem trivial

- **Structured data and content models.** All UIDs now have a consistent data schema, which both element authors and users can depend on. This paves the way for advanced content modelling with Simpla (as opposed to just 'editable HTML'), as well as more powerful data management (querying, filtering, metadata, etc)

- **Non-destructive data management.** The introduction of a data buffer means that previously destructive methods (eg: `set()`) now operate on the local buffer, and aren't persisted to the API until a new `save()` method is called. This allows elements to react to changes safely, without waiting for a user to set data to the API

- **Make fewer assumptions.** We made many assumptions in v1 under the guise of 'ease of use'. In reality most of these were unecessary and just made it harder to open up Simpla's ecosystem. V2 is a lower-level, more powerful SDK (eg: elements are no longer imported automatically via the SDK)

- **Seamless migration from v1.** While there are several breaking changes introduced v2 (see below), it's important that users of Simpla don't have to migrate their existing codebases. We have created a [compatibility layer](https://github.com/simplaio/simpla-v2-compat) for existing v1 elements to use the v2 SDK, and will migrate v1 data safely to a new endpoint for v2 once it's live

## Breaking changes from 1.0
There are several breaking changes introduced in the v2.0 SDK:

- Initialisation has been moved to an `init()` method, ie: `Simpla.init('project-id')`

- Elements are no longer imported (automatically or otherwise) via the SDK, use [HTML imports](https://www.webcomponents.org/community/articles/introduction-to-html-imports) directly instead

- Every piece of data (ie: UID) has a predefined data schema, with several computed properties (eg: `createdAt`, `updatedAt`) and two mutable properties: `data : Object` and `type : String`. Trying to `set()` data outside of these properties will fail

- The `set()` method no longer directly PUTs data to the API, it sets it to the local buffer, after which calling `save()` persists all changes in the buffer to the API

- Calling `get()` on the UID of a `simpla-block` no longer returns an array of its children, but rather its data (normally `null`). Use the new `find()` method instead

## Installing
The v2.0 preview can be installed either via Bower or NPM/Yarn

```bash
bower install simplaio/simpla#v2.0.0-preview --save
```

```bash
npm install simpla@2.0.0-preview --save
```

Once installed, include the SDK in the `<head>` of your document:

```html
<script src="/bower_components/simpla/simpla.js"></script>
```

You will also need to install and import Simpla elements manually, currently only Bower is supported (Yarn support coming):

```bash
bower install simpla-text simpla-img simpla-block --save
```

```html
<link rel="import" href="/bower_components/simpla-text/simpla-text.html">
<link rel="import" href="/bower_components/simpla-img/simpla-img.html">
<link rel="import" href="/bower_components/simpla-block/simpla-block.html">
```

**NOTE:** You MUST create a new project to use with the v2 SDK, as it is not yet compatible with v1 projects, and you risk corrupting data by using it with existing v1 content

## API

### Initialising Simpla
You must initialise your Simpla project before using the SDK, with the `init()` method

```js
// TODO: replace 'project-key' with your project's ID
Simpla.init('project-id')
```

### Authentication
Authentication methods remain unchanged from v1, use `login` to log a user into Simpla, and `logout` to clear their token and log them out

```js
Simpla.login({
  username: '',
  password: ''
}).then(function() {
  // User logged in
});

Simpla.logout()
  .then(function() {
    // User logged out
  });
```

### Data operations
Data methods now operate on a local data buffer, and are persisted to Simpla's API by calling the new `save()` method.

#### Get
Fetch data from Simpla's API with the `get()` method, which takes the UID to fetch as a single argument

```js
Simpla.get('some.uid')
  .then(function(data) {
    // data = {
    //  uid: 'some.uid',
    //  type: 'text',
    //  data: {...},
    //  createdAt: ...
    // }
    });
```

#### Set
Change data in the local buffer by calling `set()`, which takes two arguments - the UID to operate on, and the new data

```js
Simpla.set('some.uid', { data: {...} })
  .then(function() {
    // data set
    });
```

**Note:** All element data should be inside the `data` property, and all elements should set a `type`, which is an arbitrary hint for what kind of content this UID contains

#### Remove
Delete a UID with the `remove` method. Remember, deleted data will not be persisted until `save` is called

```js
Simpla.remove('some.uid')
  .then(function() {
    // UID deleted
  });
```

#### Find
Query Simpla's API with the `find` method. Currently it only takes a single parameter, `parent`, which is used to list the children of a block. More querying methods (sort, filter, etc) will be added soon

```js
Simpla.find({ parent: 'some' })
  .then(function(data) {
    // data = {
    //  items: [
    //    { uid: 'some.uid', ...}
    //  ],
    //  metadata: {}
    // }
    });
```

#### Save
The save performs a diff between the local buffer and remote data, and persists all changes to Simpla's API. It takes no arguments

```js
Simpla.save()
  .then(function() {
    // Changes saved
    });
```

### States
States manage the global state of Simpla and its components in a session. Currently there are two states managed by Simpla:

- `authenticated : Boolean`, whether the user is logged in
- `editable : Boolean`, whether Simpla is in edit mode

#### Getting a state
You can get the current value of a state using the `getState()` method

```js
Simpla.getState('editable') // Returns true/false
```

### Observers
React to changes in a Simpla app by using observers

#### Observing changes to data
Use the `observe()` method to create an observer for a UID. It takes two arguments, the UID to observe, and the callback to execute when the data in the UID changes. It returns an object containing an `unobserve()` method used to destroy the observer

```js
// Create observer
var observer = Simpla.observe('some.uid', function(item) { ... });

// Destroy observer
observer.unobserve();
```

#### Observing changes to state
Use the `observeState()` method to create an observer for a part of the Simpla state. It has the same syntax as `observe`

```js
// Create observer
var observer = Simpla.observeState('editable', function(value) { ... });

// Destroy observer
observer.unobserve();
```

## Upcoming changes
We expect further breaking changes to the API and SDK before final release, primarily in regard to data schema. We plan to replace UIDs with Paths, ie: `some.uid` becomes `/some/path`. This will make data much easier to reason about, and make querying more straightforward. 

## Testing and feedback
Please test out the SDK and give us feedback! File issues for any bugs you find, or with interface problems/missing use-cases. It should be largely stable enough for ongoing testing, and we're in the process of converting the current Simpla elements (and simpla.io itself) to run on it before launching live.

