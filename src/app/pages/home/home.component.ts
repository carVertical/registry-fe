import {Component, OnChanges, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

const Web3 = require('web3');
const contract = require('truffle-contract');
const Registry = contract(require('../../../../build/contracts/Registry.json'));
const Vehicle = contract(require('../../../../build/contracts/Vehicle.json'));

Registry.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));
if (typeof Registry.currentProvider.sendAsync !== 'function') {
  Registry.currentProvider.sendAsync = function () {
    return Registry.currentProvider.send.apply(
      Registry.currentProvider, arguments
    );
  };
}
Vehicle.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));
if (typeof Vehicle.currentProvider.sendAsync !== 'function') {
  Vehicle.currentProvider.sendAsync = function () {
    return Vehicle.currentProvider.send.apply(
      Vehicle.currentProvider, arguments
    );
  };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  vin = '';
  name = '';

  web3: any;
  accounts: any;
  account: any;
  constructor() {
    this.instantiateWeb3();
  }

  ngOnInit() {
  }


  ngOnChanges(): void {
  }

  instantiateWeb3 = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    // we should go for our own geth node with geth --rpc --rpcapi account eth
    this.web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545')
    );
  }

  claimOwnership = () => {
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
        return;
      }
      this.accounts = accs;
      this.account = this.accounts[0];

      let deployed;
      Registry.deployed()
        .then((instance) => {
          deployed = instance;
          console.log('deployed');
          console.log(deployed);
          console.log('----------')
          return deployed.registerVehicle(
            this.vin,
            this.vin,
            {
              from: this.account,
              gas: 4712388,
              gasPrice: 100000000000
            });
        })
        .then((result) => {
          return result;
        })
        .then((value) => {
          console.log(value);
        })
        .catch((e) => {
          console.log(e);
        });

      console.log(this.accounts);
    });
  }
}
