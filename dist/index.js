"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
const genesisBlock = new block(0, "32132131243", "", "Hello", 123456);
let blockChain = [genesisBlock];
console.log(blockChain);
//# sourceMappingURL=index.js.map