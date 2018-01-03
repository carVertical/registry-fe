import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';

const Web3 = require('web3');
const contract = require('truffle-contract');
const Vehicle = contract(require('../../../../build/contracts/Vehicle.json'));

Vehicle.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));
if (typeof Vehicle.currentProvider.sendAsync !== 'function') {
  Vehicle.currentProvider.sendAsync = function () {
    return Vehicle.currentProvider.send.apply(
      Vehicle.currentProvider, arguments
    );
  };
}

@Component({
  selector: 'app-vinpercontract',
  templateUrl: './vinpercontract.component.html',
  styleUrls: ['./vinpercontract.component.css']
})
export class VinpercontractComponent implements OnInit, OnChanges {
  web3: any;
  accounts: any;
  account: any;
  balance: any;

  registrant = '';
  vinNumber = '';
  address = '';
  odometerEvents = [];
  damageEvents = [];

  constructor() {
    this.instantiateWeb3();
    // this.onReady();
  }

  ngOnInit() {
    console.log(Vehicle);
    console.log(this.web3);
    this.readEvents();
    this.getBalancce();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.readEvents();
  }


  instantiateWeb3 = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    // we should go for our own geth node with geth --rpc --rpcapi account eth
    this.web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545')
    );
  }


  test = () => {
    let meta;
    Vehicle.deployed()
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
    console.log('read events');
    console.log(Vehicle);
    let meta;
    Vehicle
      .deployed()
      .then(instance => {
        meta = instance;
        console.log(meta); // contract itself
      })
      .catch(e => {
        console.log('error' + e );
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
      Vehicle.at(this.address)
        .then((instance) => {
          meta = instance;
          console.log(meta);
          const allevents = meta.allEvents({fromBlock: 0, toBlock: 'latest'});
          return Promise.all([
            meta.registrant(),
            meta.vin(),
            new Promise(function(resolve, reject) {
              allevents.get(function (error, result) {
                if (error !== null) {return reject(error);}
                resolve (result);
              });
            })
          ]);
        })
        .then((value) => {

          this.registrant = value[0];
          this.vinNumber = value[1];
          for (let i = 0; i < value[2].length; i++) {
            if (value[2][i].event === 'OdometerRecord') {
              this.odometerEvents.push(
                value[2][i]
              );
            }
          }

          for (let i = 0; i < value[2].length; i++) {
            if (value[2][i].event === 'DamageRecord') {
              this.damageEvents.push(
                value[2][i]
              );
            }
          }
          console.log('damgeRecs');
          console.log(this.damageEvents);
          console.log('----');

          console.log('logs');
          console.log(value[2]);
          console.log('------');
          // allevents.stopWatching();
        })
        .catch((e) => {
          console.log('error' + e);
        });

      console.log(this.accounts);
    });
  }

  timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const months = [
      'Jan', 'Feb', 'Mar',
      'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec'
    ];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

}
