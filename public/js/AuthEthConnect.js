App = {
    loading: false,
    contracts: {},
  
    load: async () => {

    },
    connectWalletRegister: async () => {
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
      } else {
        window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */})
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }

      // Get the Account of the Wallet
      const accounts = await web3.eth.getAccounts();
      App.account = accounts[0];
      console.log(App.account)

      // User Smart Contract
      // Create a JavaScript version of the smart contract
      const user = await $.getJSON('/build/contracts/User.json')
      App.contracts.user = TruffleContract(user)
      App.contracts.user.setProvider(App.web3Provider)
      // Hydrate the smart contract with values from the blockchain
      App.user = await App.contracts.user.deployed()

      data = {}
      data['name'] = document.getElementById('register_name').value;
      data['role'] = document.getElementById('register_role').value;
      data['mail'] = document.getElementById('register_mail').value;
      data['wallet_id'] = accounts[0]

      let r = await fetch('/auth/register', {method: 'POST', body: JSON.stringify(data), headers: {'Content-type': 'application/json; charset=UTF-8'}})
      r = await r.json();
      if (r){
        App.setLoading(true)
        await App.user.createUser(data['wallet_id'],data['name'],data['role'],data['mail'],{ from: App.account })
          window.location.href = '/auth/dashboard'
      }
    },

    connectWalletLogin: async () => {
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
      } else {
        window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */})
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }

      // Get the Account of the Wallet
      const accounts = await web3.eth.getAccounts();
      App.account = accounts[0];

      // User Smart Contract
      // Create a JavaScript version of the smart contract
      const user = await $.getJSON('/build/contracts/User.json')
      App.contracts.user = TruffleContract(user)
      App.contracts.user.setProvider(App.web3Provider)
      // Hydrate the smart contract with values from the blockchain
      App.user = await App.contracts.user.deployed()

      data = {}
      data['wallet_id'] = accounts[0]

      let r = await fetch('/auth/login', {method: 'POST', body: JSON.stringify(data), headers: {'Content-type': 'application/json; charset=UTF-8'}})
      r = await r.json();
      if (r){
        window.location.href = '/auth/dashboard'
      }
    },

    setLoading: (boolean) => {
      App.loading = boolean
      const loader = $('#loader')
      const content = $('#content')
      if (boolean) {
        loader.show()
        content.hide()
      } else {
        loader.hide()
        content.show()
      }
    }
  }
  
  $(() => {
    $(window).load(() => {
      App.load()
    })
  })