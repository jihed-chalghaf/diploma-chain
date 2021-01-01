import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { RoleService } from './role.service';
import { LocalService } from './local.service';
declare let require: any;
const Web3 = require('web3');
const contract = require('@truffle/contract');

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3: any;
  private accounts: string[];
  private logged: boolean = false;
  public mainAccount: string;
  public ready = false;

  public accountsObservable = new Subject<string[]>();


  constructor(
    private router: Router,
    private roleService: RoleService,
    private localService: LocalService
  ) {
    console.log("inside web3 service constructor");
  }
  public isLogged(): boolean {
    return this.logged;
  }
  public login() {
    console.log('logging in');
    this.bootstrapWeb3();
  }
  public logout() {
    console.log('log out');
    this.logged = false;
    this.web3 = null;
    this.accounts = null;
    this.mainAccount = null;
    this.localService.clearStorage();
    this.router.navigate(["/"]);
  }
  public bootstrapWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.ethereum !== 'undefined') {
      console.log('Metamask found');
      // Use Mist/MetaMask's provider
      console.log(window.ethereum);
      window.ethereum.enable()
        .then(accounts => {

          this.web3 = new Web3(window.ethereum);
          this.logged = true;
          console.log('Using metmask as web3 provider');
          console.log("provided accounts, ", accounts)
          this.mainAccount = window.ethereum.selectedAddress;
          console.log("is main account true ? ", this.mainAccount == accounts[0]);
          this.initChangingListener();
          this.roleService.setRole();
          this.router.navigate(['/']);
        });
    } else {
      console.log('No web3? You should consider trying MetaMask!');
      // TODO : prompt for the user to install MetaMask
      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
      console.log("Using a fallback")
    }

    // setInterval(() => this.refreshAccounts(), 1000);
  }

  public async artifactsToContract(artifacts) {
    if (!this.web3) {
      console.log('Web3 not found!')
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.artifactsToContract(artifacts);
    }

    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    return contractAbstraction;

  }

  private async refreshAccounts() {
    const accs = await this.web3.eth.getAccounts();
    console.log('Refreshing accounts');
    // Get the initial account balance so it can be displayed.
    if (accs.length === 0) {
      console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
      return;
    }

    if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
      console.log('Observed new accounts');

      this.accountsObservable.next(accs);
      this.accounts = accs;
      console.log("my account ? ", this.accounts[0]);
    }

    this.ready = true;
  }

  public initChangingListener() {
    window.ethereum.on('accountsChanged', (accounts) => {
      console.log("Accounts changed to : ", accounts);
      if(accounts.length ==0){
        this.logout();
      }else{
        this.mainAccount = window.ethereum.selectedAddress;

      }
    })

    window.ethereum.on('chainChanged', (chainId) => {
      console.log('network/chain changed to : ', chainId)
    })
  }
  public timeMagic(seconds) {
    console.log(window.ethereum);
    /*
    window.ethereum.send('evm_increaseTime', {seconds})
      .then(res=> console.log("time magic res ",res))
      .catch(err => console.log(err))
   */

    window.ethereum.sendAsync({
      method: 'evm_increaseTime',
      params: [seconds],
      from: this.mainAccount,
    }, (err, res) => {
      console.log("sendasync res : ", res, err);
      window.ethereum.sendAsync({
        method: 'evm_mine',
        params: [],
        from: this.mainAccount,
      },(res,err)=> console.log("mine res ",res,err))
    })
    return true;
  }

}