import { MongoClient } from 'mongodb';

let mongoClient;
let connection;
export function mongoPool() {
    return new Promise((resolve, reject) => {
    if (!connection) {
        mongoClient = new MongoClient('mongodb+srv://ashishGupta:khuparash@cluster1-uuoxr.mongodb.net/test?retryWrites=true');
        mongoClient.connect((err) => {
        if (!err) {
            console.log('success')
            connection = mongoClient.db('BMS');
            resolve(connection);
        } else {
            console.log('failed');
            reject(new Error('connection to DB Failed'));
        }
        })   
    } else {
        resolve(connection);
    }});
}

// module.exports = {mongoPoosl};