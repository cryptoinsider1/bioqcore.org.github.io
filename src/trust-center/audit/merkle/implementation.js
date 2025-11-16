export function merkleRoot(entries) {
    if (entries.length === 0) return null;

    let layer = entries.map(e =>
        crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(e)))
    );

    return Promise.all(layer).then(async hashes => {
        while (hashes.length > 1) {
            const next = [];
            for (let i = 0; i < hashes.length; i += 2) {
                const a = hashes[i];
                const b = hashes[i + 1] || hashes[i];
                const combined = new Uint8Array([
                    ...new Uint8Array(await a),
                    ...new Uint8Array(await b)
                ]);
                next.push(crypto.subtle.digest("SHA-256", combined));
            }
            hashes = next;
        }
        return hashes[0];
    });
}
