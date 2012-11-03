var chai = require( 'chai' )
  , sinonChai = require( 'sinon-chai' )
  , sinon = require( 'sinon' )

chai.use(sinonChai)

module.exports = {
  expect: chai.expect,
  stub: sinon.stub
}
