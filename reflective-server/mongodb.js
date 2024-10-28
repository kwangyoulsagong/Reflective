const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017"; // 로컬 MongoDB 서버 URI
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected successfully to MongoDB server");

        const database = client.db('blog');
        const collection = database.collection('testcollection');

        // 예제 데이터 삽입
        const insertResult = await collection.insertOne({ name: "John Doe", age: 30 });
        console.log('Inserted document:', insertResult);

        // 데이터 조회
        const findResult = await collection.find({}).toArray();
        console.log('Found documents:', findResult);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
