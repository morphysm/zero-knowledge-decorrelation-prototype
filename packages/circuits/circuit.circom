
pragma circom 2.0.0;

// Massively borrowed from tornado cash: https://github.com/tornadocash/tornado-core/tree/master/circuits
include "./node_modules/circomlib/circuits/bitify.circom";
include "./node_modules/circomlib/circuits/mimcsponge.circom";
include "./node_modules/circomlib/circuits/pedersen.circom";

// Computes MiMC([left, right])
template HashLeftRight() {
    signal input left;
    signal input right;
    signal output hash;

    component hasher = MiMCSponge(2, 220, 1);
    hasher.ins[0] <== left;
    hasher.ins[1] <== right;
    hasher.k <== 0;
    hash <== hasher.outs[0];
}

// if s == 0 returns [in[0], in[1]]
// if s == 1 returns [in[1], in[0]]
template DualMux() {
    signal input in[2];
    signal input s;
    signal output out[2];

    s * (1 - s) === 0;
    out[0] <== (in[1] - in[0])*s + in[0];
    out[1] <== (in[0] - in[1])*s + in[1];
}

// Verifies that merkle proof is correct for given merkle root and a leaf
// pathIndices input is an array of 0/1 selectors telling whether given pathElement is on the left or right side of merkle path
template MerkleTreeChecker(levels) {
    signal input leaf;
    signal input root;
    signal input pathElements[levels];
    signal input pathIndices[levels];

    component selectors[levels];
    component hashers[levels];

    for (var i = 0; i < levels; i++) {
        selectors[i] = DualMux();
        selectors[i].in[0] <== i == 0 ? leaf : hashers[i - 1].hash;
        selectors[i].in[1] <== pathElements[i];
        selectors[i].s <== pathIndices[i];

        hashers[i] = HashLeftRight();
        hashers[i].left <== selectors[i].out[0];
        hashers[i].right <== selectors[i].out[1];
    }

    root === hashers[levels - 1].hash;
}

// computes Pedersen(Pedersen(nullifier + secret) + rewardID)
template CommitmentHasher() {
    signal input nullifier;
    signal input secret;
    signal input rewardID;
    
    signal output commitment;
    signal output nullifierHash;

    component leafHasher = Pedersen(496); 
    component nullifierHasher = Pedersen(248);
    component nullifierBits = Num2Bits(248);
    component secretBits = Num2Bits(248);

    component commitmentHasher = Pedersen(504);
    component leafBits = Num2Bits(256);
    component rewardIDBits = Num2Bits(248);

    nullifierBits.in <== nullifier;
    secretBits.in <== secret;
    rewardIDBits.in <== rewardID;

    for (var i = 0; i < 248; i++) {
        nullifierHasher.in[i] <== nullifierBits.out[i];
        leafHasher.in[i] <== nullifierBits.out[i];
        leafHasher.in[i + 248] <== secretBits.out[i];
    }
    
    // hash rewardID that is added by airdropper
    leafBits.in <== leafHasher.out[0];
    for (var i = 0; i < 256; i++) {
        commitmentHasher.in[i] <== leafBits.out[i];
        
    }
    for (var i = 0; i < 248; i++) {
        commitmentHasher.in[i + 256] <== rewardIDBits.out[i];  
    }
    
    commitment <== commitmentHasher.out[0];
    nullifierHash <== nullifierHasher.out[0];
}

// Verifies that commitment that corresponds to given secret and nullifier is included in the merkle tree of deposits
template Withdraw(levels) {
    signal input root; // public
    signal input nullifierHash; // public
    signal input rewardID; // public
    signal input recipient; // public

    signal input nullifier; // private
    signal input secret; // private
    signal input pathElements[levels]; // private
    signal input pathIndices[levels]; // private

    component hasher = CommitmentHasher();
    hasher.nullifier <== nullifier;
    hasher.secret <== secret;
    hasher.rewardID <== rewardID;
    hasher.nullifierHash === nullifierHash;

    component tree = MerkleTreeChecker(levels);
    tree.leaf <== hasher.commitment;
    tree.root <== root;
    for (var i = 0; i < levels; i++) {
        tree.pathElements[i] <== pathElements[i];
        tree.pathIndices[i] <== pathIndices[i];
    }

    // Squares used to prevent optimizer from removing constraints
    signal recipientSquare;
    recipientSquare <== recipient * recipient;
}

component main {public [root, nullifierHash, recipient, rewardID]} = Withdraw(5); // This value  corresponds to width of tree (2^x)