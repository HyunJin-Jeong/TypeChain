"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cryptoJS = require("crypto-js");
class block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
block.calculateBlockHash = (index, previousHash, timestamp, data) => cryptoJS.SHA256(index + previousHash + timestamp + data).toString();
block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
const genesisBlock = new block(0, "32132131243", "", "Hello", 123456);
let blockChain = [genesisBlock];
const getBlockChain = () => blockChain;
const getLatestBlock = () => blockChain[blockChain.length - 1];
const getNewTimestamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimestamp();
    const newHash = block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
    const newBlock = new block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock) => block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
// 블록 유효성을 검사하는 함수이다.
const isBlockValid = (candidateBlock, previousBlock) => {
    // 블록의 구조가 유효하지 않으면 false
    if (!block.validateStructure(candidateBlock)) {
        return false;
        // 이전 블록의 인덱스 + 1과 다르면 false
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
        // 이전 블록의 hash와 다르면 false
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
        // 다른 hash를 갖고 있다면 false
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
        // 모든 검증을 통과했을 때 true
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockChain);
//# sourceMappingURL=index.js.map