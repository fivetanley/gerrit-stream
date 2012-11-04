var GerritStream = require( "../src/gerrit_stream" )
  , support = require( "./support" )
  , expect = support.expect
  , stub = support.stub
  , Stream = require( "stream" ).Stream

function writableStream() {
  var stream = new Stream()
  stream.writable = true
  stream.write = function( data ) {
    return true
  }
  return stream
}

describe( "GerritStream", function() {

  describe( "constructor", function() {

    beforeEach( function() {
      this.pipeStub = stub()
      this.gerritProcess = { pipe: this.pipeStub, on: stub()  }
    })

    it( "pipes the gerrit process into itself", function() {
      var gstream = new GerritStream( this.gerritProcess )
      expect( this.pipeStub ).calledWith( gstream )
    })

  })

  beforeEach( function() {
    this.gerritProcess = writableStream()
    this.gstream = new GerritStream( this.gerritProcess )
  })


  describe( "adding a subscriber stream #subscribeStream", function() {

    it( "passes data from the process into the passed stream", function() {
      var listenerStream = { write: stub() }
      this.gstream.subscribeStream( listenerStream )
      this.gerritProcess.emit( 'data', 'foo' )
      expect( listenerStream.write ).calledWith( 'foo' )
    })

  })

  describe( "removing a subscriber stream #removeStream", function() {

    it( "removes the listener stream from the list of listeners", function() {
      var listenerStream = stub()
        , notRemoved = stub()
      this.gstream.subscribeStream( notRemoved )
      this.gstream.subscribeStream( listenerStream )
      this.gstream.unsubscribeStream( listenerStream )
      expect( this.gstream.subscribers ).not.contain( listenerStream )
      expect( this.gstream.subscribers ).to.contain( notRemoved )
    })

  })

  describe( "writing to subscribers #write", function() {

    it( "writes the passed message to each subscriber", function() {
      var stream1 = { write: stub() }
        , stream2 = { write: stub() }
      this.gstream.subscribeStream( stream1 ).subscribeStream( stream2 )
      this.gstream.write( 'foo' )
      expect( stream1.write ).calledWith( 'foo' )
    })

  })

  describe( "ending the stream #end", function() {

    it( "writes the end message to each subscriber", function() {
      var stream1 = { end: stub() }
        , stream2 = { end: stub() }
      this.gstream.subscribeStream( stream1 ).subscribeStream( stream2 )
      this.gstream.end( 'foo' )
      expect( stream1.end ).calledWith( 'foo' )
    })

  })

})
