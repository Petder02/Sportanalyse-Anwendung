const express = require('express')
const {ObjectId} = require('mongodb')
const {connectToDb, getDb} = require('./db')

// init app & middlware
const app = express()
app.use(express.json())

// db connection
let db
connectToDb((err) => {
    if (!err) {
        app.listen(12000, () => {
            console.log('app listening on port 12000')
        })
    }
    db = getDb()
})

// Retrieve one object from database
app.get('/test/:id', (req, res) => {
    const id = new ObjectId(req.params.id)

    if (ObjectId.isValid(req.params.id)) {
     db.collection('test')
      .findOne({_id: id})
      .then(doc => {
         res.status(200).json(doc)
      })
      .catch(err => {
         res.status(500).json({error: 'Could not fetch the document'})
      })
    } else {
        res.status(500).json({error: 'Not a valid doc id'})
    }
})

// Add new object to database
app.post('/test', (req, res) => {
    const book = req.body
    db.collection('test')
     .insertOne(book)
     .then(result => {
        res.status(200).json(result)
     })
     .catch(err => {
        res.status(500).json({err: 'Could not create a new document'})
     })
})

// Delete an object from database
app.delete('/test/:id', (req, res) => {
    const id = new ObjectId(req.params.id)

    if (ObjectId.isValid(req.params.id)) {
     db.collection('test')
      .deleteOne({_id: id})
      .then(result => {
         res.status(200).json(result)
      })
      .catch(err => {
         res.status(500).json({error: 'Could not delete the document'})
      })
    } else {
        res.status(500).json({error: 'Not a valid doc id'})
    }
})

// Update attribute in an object
app.patch('/test/:id', (req, res) => {
    const updates = req.body
    const id = new ObjectId(req.params.id)

    if (ObjectId.isValid(req.params.id)) {
     db.collection('test')
      .updateOne({_id: id}, {$set: updates})
      .then(result => {
         res.status(200).json(result)
      })
      .catch(err => {
         res.status(500).json({error: 'Could not update the document'})
      })
    } else {
        res.status(500).json({error: 'Not a valid doc id'})
    }
})