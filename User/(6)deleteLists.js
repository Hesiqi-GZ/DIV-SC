var Web3= require('web3');   
var web3= new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

var fs = require('fs');
var myContractABI = JSON.parse(fs.readFileSync("D:\\solidity_Project\\DataIntegrityProject_COPY\\DataIntegrity.abi").toString());

var contractAddress = "0x6408Bd01527b47a1933DcD3036934fC33d10B024";
var myContract = new web3.eth.Contract(myContractABI, contractAddress);

var pswd = 'hesiqi'

myContract.methods.deleteLists(pswd)
    .send({from: '0xec8a84FC352D07B50be36f8a82b1020FC9263699', gas: 6000000})
    .on('receipt',function(result){
        console.log(result);
    });