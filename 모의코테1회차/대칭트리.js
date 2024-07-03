const readline = require('readline');

const MOD = 1000000007;

function Solution(n) {
    function binary(n){
			let dp = new Array(n + 1).fill(0n);
    dp[0] = 1n; 
    dp[1] = 1n; 

    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            dp[i] += dp[j - 1] * dp[i - j];
        }
        dp[i] %= BigInt(MOD);
    }
			return dp[n]
		}
     let left = 1, right = n;
    let result = 0;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let count = binary(mid);

        if (count >= 2) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    console.log(result.toString())
}
(async () => {
    const rl = readline.createInterface({ input: process.stdin });
    for await (const line of rl) {
         const n = parseInt(line);
			 		Solution(n);
    			rl.close();
    }
   
   
    process.exit();
})();
