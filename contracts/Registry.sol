pragma solidity ^0.4.18;

import "./rbac/RBAC.sol";
import "./Vehicle.sol";

contract Registry {
  address public creator;
  string public vin;
  mapping(bytes32 => address) VinForAddress;

    function Registry() public {
      creator = msg.sender;
    }

  event ClaimedVehicleRecord(
    address indexed _registrant,
    bytes32 indexed _vin,
    string _strVin,
    address indexed _vehicle
  );

  function registerVehicle(bytes32 _vin, string _strVin) public payable {
    address vehicle = new Vehicle(_strVin, creator);
    VinForAddress[_vin] = vehicle;
    addVehicleClaim(creator, _vin, _strVin, vehicle);
  }

  function addVehicleClaim(address registrant, bytes32 _vin, string _strVin, address _vehicleContract) public {
    ClaimedVehicleRecord(registrant, _vin, _strVin, _vehicleContract);
  }
}
