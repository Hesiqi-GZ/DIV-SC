// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract DataIntegrity {

    address owner; 
    constructor() { 
        owner = msg.sender; 
    } 

    struct userData {
        string dataAddress;
        bytes32 dataHash;
        string dataOp;
        string seed;
    }

    struct seedAndAds {
        string dataAddress;
        string seed;
    }

    struct adsAndHash {
        string dataAddress;
        bytes32 dataHash;
    }

    string pwd;

    userData[] public userList;

    seedAndAds[] public seedList;

    adsAndHash[] public hashList;

    bool[] public boolResults;

    function setPassword(string memory _pwd) public {
        require(msg.sender == owner);
        pwd = _pwd;
    }

    function isStringEqual(string memory _a, string memory _b) public pure returns (bool) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        if (a.length != b.length) return false;
        for(uint i = 0; i < a.length; i ++) {
            if(a[i] != b[i]) return false;
        }
        return true;
    }

    function isBytes32Equal(bytes32 a, bytes32 b) public pure returns (bool) {
        if (a.length != b.length) return false;
        for(uint i = 0; i < a.length; i ++) {
            if(a[i] != b[i]) return false;
        }
        return true;
    }
    
    function addDataToDB(string memory _dataAddress, bytes32 _dataHash, string memory _dataOp, string memory _seed, string memory _pwd) public {
        require(isStringEqual(pwd, _pwd));
        userData memory currentData = userData({
            dataAddress: _dataAddress,
            dataHash: _dataHash,
            dataOp: _dataOp,
            seed: _seed
        });
        uint i = userList.length;
        uint flag = 0;
        if(i > 0){
            i--;
            while(!isStringEqual(userList[i].dataAddress, _dataAddress)){
                if(i > 0) i--;
                else{
                    flag = 1;
                    break;
                }
            }
        }else{
            userList.push(currentData);
        }
        if(flag == 0) userList[i] = currentData;
        else userList.push(currentData);
    }

    function getSHA256(bytes memory data, string memory seed) public view returns(bytes32) {
        bytes memory tempSeed = bytes(seed);
        uint totallen = data.length + tempSeed.length;
        bytes memory input = new bytes(totallen);
        for(uint i = 0; i < data.length; i++){
            input[i] = data[i];
        }
        for(uint j = data.length; j < totallen; j++){
            input[j] = tempSeed[j-data.length];
        }
        bytes32 Hash = sha256(input);
        return Hash;
    }

    function splitDataOp(string memory _dataOp) public view returns(bytes memory){
        bytes memory tempOp = bytes(_dataOp);
        uint i = 0;
        while(tempOp[i] != ">"){
            i++;
        }
        uint bytesCount = tempOp.length-i-1;
        i++;
        bytes memory tempResultB = new bytes(bytesCount);
        for(uint j = 0; j < bytesCount; j++){
            tempResultB[j] = tempOp[i];
            i++;
        }
        return tempResultB;
    }

    function addDataToContract(string memory _dataAddress, string memory _dataOp, string memory _seed, string memory _pwd) public {
        require(isStringEqual(pwd, _pwd));
        bytes memory opResult = splitDataOp(_dataOp);
        bytes32 resultHash = getSHA256(opResult, _seed);
        addDataToDB(_dataAddress, resultHash, _dataOp, _seed, _pwd);
    }

    function getSeedtoList(string[] memory adsList, string memory _pwd) public {
        require(isStringEqual(pwd, _pwd));
        uint index = 0;
        uint SLlength = seedList.length;
        for(uint i = 0; i < userList.length; i++){
            for(uint j = 0; j < adsList.length; j++){
                if(isStringEqual(userList[i].dataAddress, adsList[j])){

                    seedAndAds memory tempData1 = seedAndAds({
                        dataAddress: adsList[j],
                        seed: userList[i].seed
                    });
                    if(SLlength!=0 && index < SLlength){
                        seedList[index] = tempData1;
                    }
                    else seedList.push(tempData1);

                    adsAndHash memory tempData2 = adsAndHash({
                        dataAddress: adsList[j],
                        dataHash: userList[i].dataHash
                    });
                    if(SLlength!=0 && index < SLlength){
                        hashList[index] = tempData2;
                    }
                    else hashList.push(tempData2);
                    index++;
                }
            }
        }
    }

    function vertifyHash(string memory dataAddress, bytes32 receivedHash) public {
        bool result = false;
        for(uint i = 0; i < hashList.length; i++){
            if(isStringEqual(hashList[i].dataAddress, dataAddress)){
                if(isBytes32Equal(hashList[i].dataHash, receivedHash)){
                    result = true;
                }
            }
        }
        boolResults.push(result);
    }

    function checkVertifyResults(string memory _pwd) public view returns(bool[] memory){
        require(isStringEqual(pwd, _pwd));
        return boolResults;
    }

    function deleteLists(string memory _pwd) public {
        require(isStringEqual(pwd, _pwd));
        for(uint i = 0; i < seedList.length; i++){
            delete seedList[i];
        }
        for(uint j = 0; j < hashList.length; j++){
            delete hashList[j];
        }
        delete boolResults;
    }

    function getListsLength(string memory _pwd) public view returns(uint, uint) {
        require(isStringEqual(pwd, _pwd));
        uint SLlength = seedList.length;
        uint HLlength = hashList.length;
        return (SLlength, HLlength);
    }

    function getDataList(string memory _pwd) public view returns(userData[] memory){
        require(isStringEqual(pwd, _pwd));
        return userList;
    }

    function getSeedList(string memory _pwd) public view returns(seedAndAds[] memory){
        require(isStringEqual(pwd, _pwd));
        return seedList;
    }

    function getHashList(string memory _pwd) public view returns(adsAndHash[] memory){
        require(isStringEqual(pwd, _pwd));
        return hashList;
    }

    function getElementInList(uint _index, string memory _pwd) public view returns(userData memory){
        require(isStringEqual(pwd, _pwd) == true);
        userData memory tempData = userList[_index];
        return tempData;
    }

    function getBRLength(string memory _pwd) public view returns(uint){
        require(isStringEqual(pwd, _pwd));
        return boolResults.length;
    }

    function getAddress(string memory _pwd) public view returns(address){
        require(isStringEqual(pwd, _pwd));
        return owner;
    }

}