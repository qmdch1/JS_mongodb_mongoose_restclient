const { MongoClient } = require('mongodb');

const url = "mongodb+srv://<아이디>:<비밀번호>@<클러스터>/test?retryWrites=true&w=majority";
const client = new MongoClient(url, {useNewUrlParser: true});

async function main(){
    try{
        await client.connect();
        console.log('몽고 접속 성공');

        const collection = client.db('test').collection('person');

        await collection.deleteMany();
        console.log("person 컬렉션 비우기");

        await collection.insertOne({name: 'Andy', age: 30});
        console.log('문서 추가 완료');

        const documents = await collection.find({name:'Andy'}).toArray();
        console.log('찾은 문서: ', documents);

        await collection.updateOne({name: 'Andy'}, { $set: {age: 31} });
        console.log('문서 업데이트');

        const updocu = await collection.find({name:'Andy'}).toArray();
        console.log('갱신 문서: ', updocu);

        // await collection.deleteOne({name: 'Andy'});
        // console.log('문서 삭제');

        // 연결 끊기
        await client.close();
    } catch (err){
        console.error(err);
    }
}

main();