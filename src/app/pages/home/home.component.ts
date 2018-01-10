import {Component, OnChanges, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

const Web3 = require('web3');
const contract = require('truffle-contract');
const Registry = contract(require('../../../../build/contracts/Registry.json'));
const Vehicle = contract(require('../../../../build/contracts/Vehicle.json'));
const ethNode = 'http://localhost:9545';

/*Registry.setProvider(new Web3.providers.HttpProvider(ethNode));*/
/*if (typeof Registry.currentProvider.sendAsync !== 'function') {
  Registry.currentProvider.sendAsync = function () {
    return Registry.currentProvider.send.apply(
      Registry.currentProvider, arguments
    );
  };
}
Vehicle.setProvider(new Web3.providers.HttpProvider(ethNode));
if (typeof Vehicle.currentProvider.sendAsync !== 'function') {
  Vehicle.currentProvider.sendAsync = function () {
    return Vehicle.currentProvider.send.apply(
      Vehicle.currentProvider, arguments
    );
  };
}*/
declare let window: any;

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
    if (typeof window.web3 !== 'undefined') {
      console.log ('using Metamask');
      this.web3 = new Web3(window.web3.currentProvider);
      Registry.setProvider(this.web3.currentProvider);
    } else {
      console.log('No web3? You should consider trying MetaMask!');
      Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      this.web3 = new Web3(new Web3.providers.HttpProvider(ethNode));
      Registry.setProvider(new Web3.providers.HttpProvider(ethNode));
    }

    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        alert('0 accounts found. Make sure your Ethereum client is configured correctly.');
        return;
      }
      this.accounts = accs;
      this.account = this.accounts[0];
    });
  }

  claimOwnership = () => {

      console.log('entering claimOwnership. account #' + this.account);
      let deployed;
      Registry.deployed()
        .then((instance) => {
          deployed = instance;
          console.log('deployed');
          console.log(deployed);
          console.log('----------');
          return deployed.registerVehicle(
            this.vin,
            this.account, // TODO: should be a registrant's address though
            {
              from: this.account
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
  }
}
