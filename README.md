# GerritStream

A minimal wrapper for getting information out of gerrit's `stream-events` SSH
hook.

## API

First, you'll need a `GerritProcess` to work with:

### GerritProcess

#### constructor( host, [,port], [,gerritCommand] )

`port` defaults to gerrit's default (29418 ) if not provided.

`gerritCommand` defaults to `stream-events` if not provided.

```
var GerritProcess = require( 'gerrit-stream' ).GerritProcess
  , gerritProcess = new GerritProcess( host )
```

### GerritStream

A `GerritStream` can have many "subscribers", or writable `Streams` listen
to data passed into it from the `GerritProcess`. If you pass in a
subscribing `Stream`, note you'll be getting the raw `Buffer` back from the
process.

You'll need to pass `gerritProcess.stdout` to the `GerritStream` constructor.
If you use `stderror` or `stdin` for some reason, just pass that in instead.

#### constructor( gerritProcess )

`var gerritStream = new GerritStream( gerritProcess.stdout )`

#### addSubscriber( stream )

Adds a subscriber stream to listen for data events on the `GerritStream`.

`gerritStream.addSubscriberStream`

### removeSubscriber( stream )

Removes a subscriber `Stream`. Stops the `GerritStream` instance from calling
`write` on the subscriber `Stream`.

### Utility Functions

This library includes a few helper functions that generate `JSONStream`s.

`var stream = require( 'gerrit-process' ).JSONStreams.eventName`

Any of the JSONStreams sort based on the `type` key in the root of the JSON
document. `{ "type": "changeset-restored" }` maps to 
`JSONStreams.changesetRestored`

List of `JSONStreams` available on `JSONStreams`:

* `patchsetCreated`
* `changeAbandoned`
* `changeRestored`
* `changeAbandoned`
* `changeRestored`
* `changeMerged`
* `commentAdded`
* `refUpdated`
