var Stream = require( 'stream' ).Stream
  , inherits = require( 'util' ).inherits

function GerritStream( process ) {
  Stream.call( this )
  this.writable = true
  this.listeners = []
  process.pipe( this )
}

inherits( GerritStream, Stream )

GerritStream.prototype.addStream = function( stream ) {
  this.listeners.push( stream ); return this
}

GerritStream.prototype.removeStream = function( stream ) {
  this.listeners = this.listeners.filter( function( strm ) {
    return strm != stream
  })
  return this
}

GerritStream.prototype.write = function( data ) {
  this.listeners.forEach( function( stream ) {
    stream.write( data )
  })
  return true
}

module.exports = GerritStream
