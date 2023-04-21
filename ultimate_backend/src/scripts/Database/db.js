const{MongoClient} = require('mongodb')

let dbConnection
// Connect to Mongo Atlast database (replace NhienPhan and hoangnhien2909 with your username and password)
let cloudURI = 'mongodb+srv://sportanalyticapp:csdsapp393@cluster0.cmo9onq.mongodb.net/?retryWrites=true&w=majority'

module.exports = {
    connectToDb: (cb) => {
        // MongoClient.connect(localURI)
        MongoClient.connect(cloudURI)
         .then((client) => {
            dbConnection = client.db()
            return cb()
         })
         .catch(err => {
            console.log(err)
            return cb(err)
         })
    },
    getDb: () => dbConnection
}