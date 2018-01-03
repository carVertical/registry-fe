pragma solidity ^0.4.4;

contract Vehicle {
  address public registrant;
  string public vin;

  mapping(string => uint) latestRecordIds;

  event OdometerRecord(
    string _hash,
    uint256  indexed _timestamp,
    uint256 indexed _event_time
  );
  event RegistrationRecord(
    string _hash,
    uint256 indexed _timestamp,
    uint256 indexed _event_time
  );
  event ImagesRecord(
    string _hash,
    uint256 indexed _timestamp,
    uint256 indexed _event_time
  );
  event DamageRecord(
    string _hash,
    uint256 indexed _timestamp,
    uint256 indexed _event_time
  );
  event SpecsRecord(
    string _hash,
    uint256 indexed _timestamp,
    uint256 indexed _event_time
  );

  function Vehicle(string _vin, address _registrant) public payable {
    registrant = _registrant;
    vin = _vin;
  }

  function addOdometerRecord(string recordHash, uint256 timestamp) public {
    OdometerRecord(recordHash, timestamp, now);
  }

  function addRegistrationRecord(string recordHash, uint256 timestamp) public {
    RegistrationRecord(recordHash, timestamp, now);
  }

  function addImagesRecord(string recordHash, uint256 timestamp) public {
    ImagesRecord(recordHash, timestamp, now);
  }

  function addDamageRecord(string recordHash, uint256 timestamp) public {
    DamageRecord(recordHash, timestamp, now);
  }

  function addSpecsRecord(string recordHash, uint256 timestamp) public {
    SpecsRecord(recordHash, timestamp, now);
  }
}
