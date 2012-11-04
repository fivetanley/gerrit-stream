var Stream = require( 'stream' ).Stream
  , inherits = require( 'util' ).inherits

function GerritStream( stdout_pipe ) {
  Stream.call( this )
  this.writable = true
  this.subscribers = []
  stdout_pipe.pipe( this )
}

inherits( GerritStream, Stream )

GerritStream.prototype.subscribeStream = function( stream ) {
  this.subscribers.push( stream )
  return this
}

GerritStream.prototype.unsubscribeStream = function( stream ) {
  this.subscribers = this.subscribers.filter( function( subscriber ) {
    return subscriber !== stream
  })
  return this
}

GerritStream.prototype.write = function( data, opts ) {
  this.subscribers.forEach( function( stream ) { stream.write( data, opts ) })
  return true
}

GerritStream.prototype.end = function( data, opts ) {
  this.subscribers.forEach( function( stream ) { stream.end( data ) } )
}

module.exports = GerritStream
