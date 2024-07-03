// Run by Node.js
const readline = require('readline');

function Solution(N, M, K, cuts) {
    function calcLen(cuts, max) {
        let len = [];
        cuts.sort((a, b) => a - b);
        len.push(cuts[0]);
        for (let i = 1; i < K; i++) {
            len.push(cuts[i] - cuts[i - 1]);
        }
        len.push(max - cuts[K - 1]);
        return len;
    }

    let x_len = calcLen(cuts.map(cut => cut[0]), M);
    let y_len = calcLen(cuts.map(cut => cut[1]), N);

    let min_area = BigInt(Number.MAX_SAFE_INTEGER);
    let max_area = BigInt(0);

    for (let x of x_len) {
        for (let y of y_len) {
            let area = BigInt(x) * BigInt(y);
            if (area < min_area) {
                min_area = area;
            }
            if (area > max_area) {
                max_area = area;
            }
        }
    }

    console.log(min_area.toString(), max_area.toString());
}
(async () => {
    let rl = readline.createInterface({ input: process.stdin });
    let N = 0;
    let M = 0;
    let K = 0;
    let isFirst = true;
    let cuts = [];

    for await (const line of rl) {
        if (isFirst) {
            const [n, m, k] = line.split(" ").map(Number);
            N = n;
            M = m;
            K = k;
            isFirst = false;
        } else {
            const [value1, value2] = line.split(" ").map(Number);
            cuts.push([value1, value2]);
            if (cuts.length === K) {
                break;
            }
        }
    }

    Solution(N, M, K, cuts);
    rl.close();
    process.exit();
})();
