import  * as cryptoJS from "crypto-js";

class block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    static calculateBlockHash = (
        index: number,
        previousHash: string,
        timestamp: number,
        data: string
    ): string =>
        cryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    static validateStructure = (aBlock: block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";

    constructor(index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: block = new block(0, "32132131243", "", "Hello", 123456)

let blockChain: block[] = [genesisBlock];

const getBlockChain = (): block[] => blockChain;

const getLatestBlock = (): block => blockChain[blockChain.length - 1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): block => {
    const previousBlock: block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimestamp();
    const newHash: string = block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        newTimestamp,
        data
    );
    const newBlock: block = new block(
        newIndex,
        newHash,
        previousBlock.hash,
        data,
        newTimestamp
    );
    addBlock(newBlock);
    return newBlock
};

const getHashforBlock = (aBlock: block): string => block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

// 블록 유효성을 검사하는 함수이다.
const isBlockValid = (candidateBlock: block, previousBlock: block): boolean => {
    // 블록의 구조가 유효하지 않으면 false
    if (!block.validateStructure(candidateBlock)){
        return false;

    // 이전 블록의 인덱스 + 1과 다르면 false
    } else if (previousBlock.index + 1 !== candidateBlock.index){
        return false;

    // 이전 블록의 hash와 다르면 false
    } else if (previousBlock.hash !== candidateBlock.previousHash){
        return false;

    // 다른 hash를 갖고 있다면 false
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash){
        return false;

    // 모든 검증을 통과했을 때 true
    } else {
        return true;
    }
};

const addBlock = (candidateBlock: block): void => {
    if (isBlockValid(candidateBlock, getLatestBlock())){
        blockChain.push(candidateBlock);
    }
}

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockChain);

export {};