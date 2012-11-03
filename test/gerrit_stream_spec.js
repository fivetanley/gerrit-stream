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

  beforeEach( function() {
    this.pipeStub = stub()
    this.gerritProcess = { pipe: this.pipeStub, on: stub()  }
  })

  it( "pipes the gerrit process into itself", function() {
    var gstream = new GerritStream( this.gerritProcess )
    expect( this.pipeStub ).to.have.been.calledWith( gstream )
  })

  describe( "adding a stream #addStream", function() {

    beforeEach( function() {
      this.gerritProcess = writableStream()
      this.gstream = new GerritStream( this.gerritProcess )
    })

    it( "passes data from the process into the passed stream", function() {
      var listenerStream = { write: stub() }
      this.gstream.addStream( listenerStream )
      this.gerritProcess.emit( 'data', 'foo' )
      expect( listenerStream.write ).to.have.been.calledWith( 'foo' )
    })

  })

  describe( "removing a stream #removeStream", function() {

    it( "removes the listener stream from the list of listeners", function() {
      var listenerStream = stub()
        , notRemoved = stub()
      this.gstream.addStream( notRemoved )
      this.gstream.addStream( listenerStream )
      this.gstream.addStream( listenerStream )
      this.gstream.removeStream( listenerStream )
      expect( this.gstream.listeners ).not.to.contain( listenerStream )
      expect( this.gstream.listeners ).to.contain( notRemoved )
    })

  })

})
