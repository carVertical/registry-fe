import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';

const Web3 = require('web3');
const contract = require('truffle-contract');
const CarVerticalRegistry = contract(require('../../../../build/contracts/Vehicle.json'));
const ethNode = 'http://localhost:4200/localgeth';

CarVerticalRegistry.setProvider(new Web3.providers.HttpProvider(ethNode));
if (typeof CarVerticalRegistry.currentProvider.sendAsync !== 'function') {
  CarVerticalRegistry.currentProvider.sendAsync = function () {
    return CarVerticalRegistry.currentProvider.send.apply(
      CarVerticalRegistry.currentProvider, arguments
    );
  };
}

const Registry = contract(require('../../../../build/contracts/Registry.json'));
Registry.setProvider(new Web3.providers.HttpProvider(ethNode));
if (typeof Registry.currentProvider.sendAsync !== 'function') {
  Registry.currentProvider.sendAsync = function () {
    return Registry.currentProvider.send.apply(
      Registry.currentProvider, arguments
    );
  };
}

declare let window: any;

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.css']
})
export class UtilitiesComponent implements OnInit, OnChanges {
  web3: any;
  accounts: any;
  account: any;
  balance: any;
  data: any;
  register = [];

  address = '';


  constructor() {
    this.instantiateWeb3();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }



  instantiateWeb3 = () => {
/*
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      console.log ('using Metamask');
      this.web3 = new Web3(window.web3.currentProvider);
      Registry.setProvider(this.web3.currentProvider);
      CarVerticalRegistry.setProvider(this.web3.currentProvider);
    } else {
      console.log('No web3? You should consider trying MetaMask!');
*/

      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
  /*    Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;*/
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider(ethNode));
/*      Registry.setProvider(new Web3.providers.HttpProvider(ethNode));
    }*/

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
    });
  }

  test = () => {
    let meta;
    CarVerticalRegistry.deployed()
      .then((instance) => {
        console.log('instance');
        console.log(instance);
        meta = instance;
        return meta.ImagesRecord.call(this.account, {
          from: this.account
        });
      })
      .then((value) => {
        this.balance = value;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getBalancce = () => {
    this.web3.eth.getCoinbase((err, cb) => {
      this.web3.eth.getBalance(cb, (err2, bal) => {
        console.log('kietesnis balansas: ' + bal);
      });
    });

  }

  readEvents = () => {
    console.log('readig events');
    this.register = [];
    let meta;
      Registry
      .deployed()
      .then(instance => {
        meta = instance;
        console.log('within deployed');
        console.log(meta);
        console.log(meta.vin());
          const allevents = meta.ClaimedVehicleRecord({}, {fromBlock: 0, toBlock: 'latest'});

        console.log(allevents);
          return new Promise(function(resolve, reject) {
            allevents.get(function (error, result) {
              if (error !== null) {console.log('error at promise'); return reject(error); }
              console.log(allevents);
              resolve (result);
            });
          });
        })
        .then((results) => {
          console.log('results are:');
          console.log(results);
          for (let i = 0; i < results.length; i++) {
            this.register.push(
              results[i].args
            );
          }
        })
      .catch((e) => {
        console.log('error' + e);
      });

  }

  generateContractEvents = () => {
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }
      this.accounts = accs;
      this.account = this.accounts[0];

      let meta;
      CarVerticalRegistry.at(this.address)
        .then((instance) => {
          meta = instance;
          console.log('meta');
          console.log(meta);
          meta.addOdometerRecord(this.guid(), 123423443443, {from: this.account});
          meta.addOdometerRecord(this.guid(), 1234234434433, {from: this.account});
          meta.addOdometerRecord(this.guid(), 123423443445, {from: this.account});
          meta.addDamageRecord(this.guid(), 1234234434436, {from: this.account});
          meta.addDamageRecord(this.guid(), 123423443436, {from: this.account});
          return ;
        })
        .then((value) => {
          // return
        })
        .catch((e) => {
          console.log('error: ' + e);
        });

    });
  }

  findContract = () => {
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

      let meta;
      CarVerticalRegistry.at(this.address)
        .then((instance) => {
          meta = instance;
          /*          return meta.ImagesRecord.call(this.account, {
                      from: this.account
                    });*/
          console.log('Contract address is at: ' + meta.address);
          console.log(meta);
    /*      console.log('test is: ' + meta.test());
          console.log(meta.test());
          console.log('creator is: ' + meta.creator());
          console.log(meta.creator());
          const allevents = meta.allEvents({fromBlock: 0, toBlock: 'latest'});

          allevents.get(function (error, result) {
            console.log(result); // catch all events
          });*/

          return meta;
        })
        .then((value) => {
          this.data = value;
        })
        .catch((e) => {
          console.log(e);
        });

      console.log(this.accounts);
    });
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

}
