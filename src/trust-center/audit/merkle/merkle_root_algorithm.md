# Merkle Root Algorithm (BioQCore Trust Center)

Audit logs are arranged as an append-only Merkle tree.

Process:
1. Serialize entry as canonical JSON.
2. Compute SHA-256 hash.
3. Group in pairs.
4. Hash the concatenation.
5. Repeat until a single root remains.

The root is committed in Trust Center state.
