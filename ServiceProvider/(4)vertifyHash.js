var Web3= require('web3');   
var web3= new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

var fs = require('fs');
var myContractABI = JSON.parse(fs.readFileSync("D:\\solidity_Project\\DataIntegrityProject_COPY\\DataIntegrity.abi").toString());

var contractAddress = "0x6408Bd01527b47a1933DcD3036934fC33d10B024";
var myContract = new web3.eth.Contract(myContractABI, contractAddress);

var dataProvided = [
    ['100001','0x9627a450b00d501a7cc7c45ab2e8f7aafec3795f4c2f729f62c7c53add34aca3'],
    ['100007','0x64ce866e859972aa695b3a5d7083be6186243be3d7061ad4d1377f4f27a23ff5']，
    ['100012','0xfc13fbc2923205b0bfbcce2db5b702cec15b778d8dfde8f6cf8a8cffd22ba808'],
    ['100017','0xf91e5d5cec5efe046e0d9520140e4a051b21c7be17164ec4f2b5f7fdec97e3ae'],
    ['100018','0x71865c2e1bd425bd2a129c9f349cc64c9f0456179b6b8549c2c12d34199b49bc'],
    ['100022','0xcf4a99d0603f1d118c1b2458bed5b0706e64658dd298c02c34eee0abfaa53805'],
    ['100026','0xb37c10d0f057c449040625e676d863a90afbbb57618b2fd7600d16fbea6f6595'],
    ['100031','0x32ca90cd55a7462709964b6d773db7020a2620e5d5150790252c202f1186cd1d'],
    ['100036','0x80192ea9e1c9185b08670db55d796744c36338831af163f8d22e58a0292267bc'],
    ['100043','0x1711885df1fbdcb25ccf53ae9b16316b0838b4463eba8ed7cc35c2f4bc72181f']
]

for(i = 0; i < dataProvided.length; i++){
    myContract.methods.vertifyHash(dataProvided[i][0], dataProvided[i][1])
    .send({from: '0x126A0BB9dE3Cf49E79Ff2b37fBE61E7B47603cF1', gas: 6000000})
    .on('receipt',function(result){
        console.log(result);
    });
}