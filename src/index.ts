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

export {};