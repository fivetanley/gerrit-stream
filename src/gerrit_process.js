var childProcess = require( 'child_process' )

function gerritProcess( host, port, subCommand, childProcessLib ) {
  childProcessLib = childProcessLib || childProcess
  return childProcessLib.spawn( 'ssh',
    [
      '-p ' + ( port || 29418 )
    , host
    , 'gerrit'
    , subCommand || 'stream-events'
    ]
  )
}

module.exports = gerritProcess
