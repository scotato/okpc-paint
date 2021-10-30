const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"curves","outputs":[{"internalType":"uint160","name":"leftPart","type":"uint160"},{"internalType":"uint160","name":"rightPart","type":"uint160"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"flipSaleState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint160","name":"leftPart","type":"uint160"},{"internalType":"uint160","name":"rightPart","type":"uint160"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint160","name":"leftPart","type":"uint160"},{"internalType":"uint160","name":"rightPart","type":"uint160"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"updateScreen","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const contractAddress = "0x7deb38a22694608a58b28970320d39ee50e7bc0f";
const price = 40000000000000000;
const validNetworkId = 1;
const initialSupply = 5555;

let currentAccount = null;
let contract = null;
let web3js = null;

async function start() {
    $(".status-message").text("");
    const provider = await detectEthereumProvider();
    if (provider) {
        // If the provider returned by detectEthereumProvider is not the same as
        // window.ethereum, something is overwriting it, perhaps another wallet.
        if (provider !== window.ethereum) {
            console.warn('Do you have multiple wallets installed?');
        }
        web3js = new Web3(provider);
        web3js.eth.getChainId().then((id) => {
            if (id !== validNetworkId) {
                $(".status-message").html(`<i class="fa fa-exclamation-circle"></i> Not connected to Ethereum main network.`);
                return;
            }
        });
        contract = new web3js.eth.Contract(contractABI, contractAddress);
    } else {
        console.warn("Please install the MetaMask extension and connect your wallet.");
    }
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    ethereum.request({ method: 'eth_accounts' })
        .then(handleAccountsChanged)
        .catch((err) => { console.error(err); });
    updateTokensLeft();
}

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        console.log("MetaMask is locked or you haven't connected any account. Please connect to MetaMask.");
        $(".mint button").hide();
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        $(".mint button").show();
    }
}

function connect() {
    ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleAccountsChanged)
        .catch((err) => {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error.
                console.warn('Connect to MetaMask.');
            } else {
                console.error(err);
            }
        });
}

function updateTokensLeft() {
    contract.methods.totalSupply().call()
        .then((result) => {
            let nbLeft = initialSupply - parseInt(result);
            if (nbLeft > 0) {
                $(".tokens-left").text(`${nbLeft.toLocaleString('en-US')} tokens left`);
            } else {
                $(".tokens-left").text(`Sold out!`);
                $(".mint button").hide();
            }
        })
        .finally(_ => { setTimeout(updateTokensLeft, 3000); });
}

function mintToken() {
    console.log(`Trying to buy one token.`)
    $(".status-message").text(`Minting...`);
    const left = web3js.eth.abi.encodeParameter('uint256', leftCode);
    const right = web3js.eth.abi.encodeParameter('uint256', rightCode);
    return contract.methods.mint(left, right)
      .send({from: currentAccount, value: price})
      .on("receipt", function(receipt) {
          $(".status-message").html(`<i class="fa fa-check"></i> Congrats!`);
      })
      .on("error", function(error) {
          $(".status-message").html(`<i class="fa fa-exclamation-circle"></i> Mint operation failed`);
      });
}

$(document).ready(function () {
    if (window.ethereum == null) {
        $(".status-message").html(`<i class="fa fa-exclamation-circle"></i> MetaMask isn't installed`);
        $(".mint button").hide();
    } else {
        ethereum.on('chainChanged', () => { window.location.reload(); });
        ethereum.on('accountsChanged', handleAccountsChanged);
        setTimeout(connect, 500);
        $(".mint button").click(mintToken);
        start();
    }
});
