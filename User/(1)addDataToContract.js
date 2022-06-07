var Web3= require('web3');   
var web3= new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

var fs = require('fs');
var myContractABI = JSON.parse(fs.readFileSync("D:\\solidity_Project\\DataIntegrityProject_COPY\\DataIntegrity.abi").toString());

var contractAddress = "0x6408Bd01527b47a1933DcD3036934fC33d10B024";
var myContract = new web3.eth.Contract(myContractABI, contractAddress);

var pswd = 'hesiqi'

function randomNumber(a,b){
    return Math.floor(Math.random() * (a-b))+b+1;
};

var userData = [
    ['100001','s8Ihwl8z0g->FSSjlThK4P'],
    ['100002','HPCyeShejW->5SwMm6UgOD'],
    ['100003','nhwiMSXSqu->6q1BgS2ZTp'],
    ['100004','JBJtKiBxl4->QBGXieodBf'],
    ['100005','bNZqW4Fim6->NuxfcCqlLm'],
    ['100006','AlK85EeSBz->tXRGWuWnbB'],
    ['100007','DUnxyVEnRI->n0hbPjcWco'],
    ['100008','dRdrcvT6QN->O6LwlnogzB'],
    ['100009','Myhd8DAlqr->0nLT8bxuQ3'],
    ['100010','2ZiUVsGaqp->dAcBC52Upc'],
    ['100011','hKkjryhemQ->Cn67pikmk4'],
    ['100012','MiESdWxQQ5->tsifh8NzP4'],
    ['100013','sXfAm8SfwE->1kkBBdXt7r'],
    ['100014','kxjtpr6tna->8RRnrDhAFj'],
    ['100015','fAyKz2jAXS->8TB3kbeRSX'],
    ['100016','1eCBZdJ1d4->EZFK9YYwkP'],
    ['100017','450tzPbMAA->MMt0jtXHae'],
    ['100018','pd2ZiCBhNf->W2EfdfkTGb'],
    ['100019','A7iQER0T9J->DkdFa6pjPw'],
    ['100020','Gjr0WGscwp->KWDZe9TTFZ'],
    ['100021','XkeezCeBHi->WFQ0DxHeiC'],
    ['100022','mY8hwrJ0a9->uHgmD5875w'],
    ['100023','jYKFPy5T24->Z008bawWt9'],
    ['100024','xZnNkMrMKX->MAiRtrFAJA'],
    ['100025','1A1p2FdSMB->i6e5Mp9aj5'],
    ['100026','btb8fP7A2i->jiC4mBeylU'],
    ['100027','a8Rsc2P2ap->xwSNtrkrcf'],
    ['100028','w5NEYnaCND->ftcNB6E9YE'],
    ['100029','97xnbcjzPJ->SDYNSPGewN'],
    ['100030','6RpPnsT3mH->TwZZ5KTWs8'],
    ['100031','GXyWiG4167->KpdncDjCnQ'],
    ['100032','SbC9BYX1wi->mSDfNKNaz7'],
    ['100033','1FCGNTKQPB->zmRk5wmCDF'],
    ['100034','pCKr30xc34->PXy5w0b8jD'],
    ['100035','JjszXMR1X9->0Cp0r26vF4'],
    ['100036','NQZPA23QTB->Gmr2cZmBaG'],
    ['100037','Ka4P4Nbiex->9pAWPe0Qzi'],
    ['100038','dZR2CafSxW->6ANm9kDjH7'],
    ['100039','BKbfDw7zJP->NR743ZcmaD'],
    ['100040','pN8jsjh73R->PCWF5Gnyfz'],
    ['100041','pphXF3kzEB->wCSeSyJtfz'],
    ['100042','PQmdTTwDj7->xSbz3bmR2B'],
    ['100043','eMYxybniFY->J3Jn6G9Mhn'],
    ['100044','7T04bk5Qx8->DXXGdsH7m5'],
    ['100045','NnKHZXAGbr->4pkcci4m5N'],
    ['100046','62zEJw6nix->2pXyfBDsin'],
    ['100047','JhMPCh1Wrp->YHMdKiAJQs'],
    ['100048','6zeMeKTKKK->7jWbhTJ7sJ'],
    ['100049','06PDTPD5a9->7jWbhTJ7sJ'],
    ['100050','QC37Mhzk98->9yQnanWQTd']
]

for(i = 0; i < userData.length; i++){
    seed = randomNumber(1000, 9999) + "";
    myContract.methods.addDataToContract(userData[i][0], userData[i][1], seed, pswd)
    .send({from: '0xec8a84FC352D07B50be36f8a82b1020FC9263699', gas: 6000000})
    .on('receipt',function(result){
        console.log(result);
    });
}

