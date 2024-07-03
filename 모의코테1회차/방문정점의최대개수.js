// Run by Node.js
const readline = require('readline');
function Solution(N,M,edges){
	let arr=Array.from({length:N+1},()=>[])
	for(let [u,v]of edges){
		arr[u].push(v)
	}
	function dfs(v, visited){
		visited[v]=true
		let count =1
		for(let i of arr[v]){
			if(!visited[i]){
				count+=dfs(i,visited)
			}
		}
		return count
	}
	let maxCount=0
	for(let i=1; i<=N; i++){
		let visited= new Array(N+1).fill(false)
		let count=dfs(i,visited)
		maxCount=Math.max(maxCount,count)
	}
	console.log(maxCount)
}

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let input=[]
	for await (const line of rl) {
		input.push(line)
		
	}
	const [N,M]=input[0].split(" ").map(Number)
	let edges=[]
	for(let i=1; i<=M; i++){
		const [u,v]=input[i].split(" ").map(Number)
		edges.push([u,v])
	}
	Solution(N,M,edges)
	rl.close();
	process.exit();
})();
