var support = require( './support' )
  , expect = support.expect
  , stub = support.stub
  , gerritProcess = require( '../src/gerrit_process' )

describe( 'gerritProcess', function() {

  it( 'returns a spawned gerrit process with the passed arguments', function(){
    var shellCommand = 'ssh'
      , port = 29418
      , host = 'gerrit.instructure.com'
      , command = 'gerrit'
      , subCommand = 'stream-events'
      , processStub = stub()
      , childProcess = { spawn: stub().returns( processStub ) }
      , process = gerritProcess(host, port, subCommand, childProcess )
    expect( childProcess.spawn ).to.have.been.calledWith(
      shellCommand,
      [
        '-p ' + port
      , host
      , command
      , subCommand
      ]
    )
    expect( process ).to.equal( processStub )
  })

})
