const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'albums';

// Use connect method to connect to the server
MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection('albums')

    collection.insertMany([
        {
            "img": "https://images-na.ssl-images-amazon.com/images/I/81krFVpCMgL._SL1500_.jpg", "artist": "Iron Maiden", "name": "Somewhere In Time", "year": 1986, "genre": "Heavy Metal"
        },
        {
            "img": "https://images-na.ssl-images-amazon.com/images/I/615lwWd-0zL.jpg", "artist": "Metallica", "name": "...And Justice For All", "year": 1988, "genre": "Thrash Metal"
        },
        {
            "img": "https://img.discogs.com/vF3nzyzljlrVSQD14PZtXOpKwRI=/fit-in/600x553/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-2178594-1351699606-1391.jpeg.jpg", "artist": "Opeth", "name": "Still Life", "year": 1999, "genre": "Progressive Metal"
        },
        {
            "img": "https://www.decibelmagazine.com/wp-content/uploads/2005/08/81x95r8pNL._SL1265_-820x810.jpg", "artist": "Entombed", "name": "Left Hand Path", "year": 1990, "genre": "Death Metal"
        },
        {
            "img": "https://www.progarchives.com/progressive_rock_discography_covers/2368/cover_4844153122016_r.jpg", "artist": "Death", "name": "Symbolic", "year": 1995, "genre": "Death Metal"
        },
    ])

    client.close();
});