const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const PORT = 3000

app.use(bodyparser.json())

const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'albums';

app.get('/api/data', (req, res) => {

    MongoClient.connect(url, (err, client) => {
        const db = client.db(dbName);
        const collection = db.collection('albums')

        collection.find({}).toArray((err, docs) => {
            res.send(docs)
        })

        client.close();
    })
    
})

app.post('/api/data', (req, res) => {
    const data = req.body

    console.log(data)

    MongoClient.connect(url, (err, client) => {
        const db = client.db(dbName);
        const collection = db.collection('albums')

        collection.insertOne({
            "artist": data.artist,
            "name": data.title,
            "genre": data.genre,
            "year": data.year,
            "img": data.img,
        })
        .then(data => {
            if (data.result.n === 1) res.json({ status:'OK' })
            else res.json({ status: 'Error' })
        })
    })
})

app.delete('/api/data/:id', (req, res) => {
    let albumId

    try {
        albumId = new ObjectId(req.params.id)
    }
    catch (error) {
        res.status(422).json({ message: `Invalid id format: ${error}` })
        return
    }

    MongoClient.connect(url, (err, client) => {
        const db = client.db(dbName);
        const collection = db.collection('albums')

        collection.deleteOne({ _id: albumId }).then((data) => {
            if (data.result.n === 1) res.json({ status:'OK' })
            else res.json({ status: 'Warning: object not found' })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: `Internal Server Error: ${error}` })
        })

        client.close();
    })
    
})

app.put('/api/data/:id', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        
        const db = client.db(dbName);
        const collection = db.collection('albums')
        const editedAlbum = req.body

        let newAlbumQuery = {
            $set:
            {
                "_id": new ObjectId(req.params.id),
                "img": editedAlbum.img,
                "artist": editedAlbum.artist,
                "name": editedAlbum.title,
                "year": editedAlbum.year,
                "genre": editedAlbum.genre
            }
        }

        let test = {
            "_id": new ObjectId(req.params.id),
                "img": editedAlbum.img,
                "artist": editedAlbum.artist,
                "name": editedAlbum.title,
                "year": editedAlbum.year,
                "genre": editedAlbum.genre
        }

        console.log(newAlbumQuery)
        console.log(req.params.id)

        const options = { "upsert": false }

        collection.updateOne({ _id: new ObjectId(req.params.id) }, newAlbumQuery)
            .then(data => {
                if (data.result.n === 1) {
                    res.json({ status: 'OK' })
                }
            })
            .catch(error => {
                console.log(error)
            }
        )
        
        client.close()
    })
})

app.listen(PORT, () => {
    console.log(`Server at port ${PORT}`)
})