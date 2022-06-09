import {
  addNewCommitment,
  getMerkleTreeFromPublicListOfCommitments,
  getMerkleRoot,
} from './TestUtils';
const inputFileName = './public/publicCommitments.txt';
const treeHeight = 5;

const args = require('minimist')(process.argv.slice(2));

await addNewCommitment(inputFileName, args.hexCommitment, treeHeight);
const mt = await getMerkleTreeFromPublicListOfCommitments(
  inputFileName,
  treeHeight
);

const newRoot = getMerkleRoot(mt);
console.log(newRoot);
