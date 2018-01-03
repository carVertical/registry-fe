const Registry = artifacts.require('./Registry.sol');
const Vehicle = artifacts.require('./Vehicle.sol');
const RBAC = artifacts.require('./rbac/RBAC.sol');
const Roles = artifacts.require('./rbac/Roles.sol');

module.exports = function (deployer) {
  deployer.deploy(Roles);
  deployer.link(Roles, RBAC);
  deployer.deploy(RBAC);
  deployer.link(RBAC, Registry);
  deployer.deploy(
    Vehicle,
    'VINXXX1234134',
    '0x79f17ef469eff7fd51a28de840cc6bab2e4b5b0d'
  );
  deployer.link(Vehicle, Registry);
  deployer.deploy(Registry);
};
