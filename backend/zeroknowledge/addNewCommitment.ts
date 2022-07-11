import minimist from 'minimist-lite';
import {
  addNewCommitment,
  getMerkleTreeFromPublicListOfCommitments,
} from 'zkp-merkle-airdrop-lib';

const inputFileName = './public/publicCommitments.txt';
const treeHeight = 5;

const args = minimist(process.argv.slice(2));

addNewCommitment(inputFileName, args.commitment, treeHeight).then(() => {
  getMerkleTreeFromPublicListOfCommitments(inputFileName, treeHeight).then(
    (mt) => {
      const newRoot = mt.getRoot();
      console.log('root:' + newRoot);
    }
  );
});
