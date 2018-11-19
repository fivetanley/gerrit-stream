var JSONStream = require( 'JSONStream' )
  , Streams

module.exports = Streams = {

  streamForType: function ( type, jsonStream ) {
    jsonStream = jsonStream || JSONStream
    return jsonStream.parse( [ "type", type ] )
  }

, patchsetCreated: function() {
    return Streams.streamForType( 'patchset-created' )
  }

, changeAbandoned: function() {
    return Streams.streamForType( 'change-abandoned' )
  }

, changeRestored: function() {
    return Streams.streamForType( 'change-restored' )
  }

, changeMerged: function() {
    return Streams.streamForType( 'change-merged' )
  }

, commentAdded: function() {
    return Streams.streamForType( 'comment-added' )
  }

, refUpdated: function() {
    return Streams.streamForType( 'ref-updated' )
  }

, wipStateChanged: function() {
    return Streams.streamForType( 'wip-state-changed' )
  }

, privateStateChanged: function() {
    return Streams.streamForType( 'private-state-changed' )
  }

}
