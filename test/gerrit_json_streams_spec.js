var support = require( './support' )
  , expect = support.expect
  , stub = support.stub
  , gjStreams = require( '../src/gerrit_json_streams' )

describe( "gerritJSONStreams", function() {

  beforeEach( function() {
    this.streamStub = stub()
    this.JSONStream = { parse: stub().returns( this.streamStub ) }
  })

  describe( "streamForType", function() {
    it( "returns a JSONStream that listens for responses where the `type` key's"+
       " value matches the given type", function() {
      var stream = gjStreams.streamForType( "foo", this.JSONStream )
      expect( this.JSONStream.parse ).calledWith( [ "type", "foo" ] )
      expect( stream ).equals( this.streamStub )
    })
  })

  describe( "utility functions", function() {

    beforeEach( function() {
      this.streamForTypeStub = stub( gjStreams, 'streamForType' )
    })

    afterEach( function() {
      this.streamForTypeStub.restore()
    })

    describe( "patchsetCreated", function() {

      it( "returns a JSONStream that listens for patchset-created events"
      , function() {
        var stream = stub()
        this.streamForTypeStub.withArgs( 'patchset-created' ).returns( stream )
        var patchsetCreatedStream = gjStreams.patchsetCreated()
        expect( patchsetCreatedStream ).equals( stream )
      })
    })

    describe( "changeAbandoned", function() {

      it( "returns a JSONStream that listens for change-abandoned events"
      , function() {
        var stream = stub()
        this.streamForTypeStub.withArgs( 'change-abandoned' ).returns( stream )
        var changeAbandonedStream = gjStreams.changeAbandoned()
        expect( changeAbandonedStream ).equals( stream )
      })

    })

    describe( "changeRestored", function() {

      it( "returns a JSONStream that listens for change-restored events"
      , function() {
        var stream = stub()
        this.streamForTypeStub.withArgs( 'change-restored' ).returns( stream )
        var changeRestored = gjStreams.changeRestored()
        expect( changeRestored ).equals( stream )
      })

    })

    describe( "changeMerged", function() {

      it( "returns a JSONStream that listens for change-merged events"
      , function() {
        var stream = stub()
        this.streamForTypeStub.withArgs( 'change-merged' ).returns( stream )
        var changeMergedStream = gjStreams.changeMerged()
        expect( changeMergedStream ).equals( stream )
      })

    })

    describe( "commentAdded", function() {

      it( "returns a JSONStream that listens for comment-added events"
      , function() {
        var stream = stub()
        this.streamForTypeStub.withArgs( 'comment-added' ).returns( stream )
        var commentAddedStream = gjStreams.commentAdded()
        expect( commentAddedStream ).equals( stream )
      })

    })

    describe( "refUpdated", function() {

      it( "returns a JSONStream that listens for comment-added events"
      , function() {
        var stream = stub()
        this.streamForTypeStub.withArgs( 'ref-updated' ).returns( stream )
        var refUpdatedStream = gjStreams.refUpdated()
        expect( refUpdatedStream ).equals( stream )
      })

    })

  })

})
