var childProcess = require( 'child_process' )

function gerritProcess( host, port, subCommand, childProcessLib ) {
  childProcessLib = childProcessLib || childProcess
  return childProcessLib.spawn( 'ssh',
    [
      '-p ' + port
    , host
    , 'gerrit'
    , subCommand
    ]
  )
}

module.exports = gerritProcess
