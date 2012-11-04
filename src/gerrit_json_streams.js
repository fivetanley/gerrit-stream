var JSONStream = require( 'JSONStream' )
  , Streams

function streamForType( type, jsonStream ) {
  jsonStream = jsonStream || JSONStream
  return jsonStream.parse( [ "type", type ] )
}

module.exports = Streams = {

  streamForType: streamForType

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

}
