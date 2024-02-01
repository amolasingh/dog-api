const express = require('express');
const router = express.Router();

let flattenedBreeds = [];
let breeds = [];

const getAllBreeds = async () => {
    const data = await fetch('https://dog.ceo/api/breeds/list/all');
    const breeds = await data.json();
    return breeds;
};

router.get('/breeds/list/all', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    const size = parseInt(req.query.size, 10);
    getAllBreeds().then((data) => {
        const breedsData = data.message;
        breeds = breedsData;
        let paginatedBreedsData = [];
        flattenedBreeds = [];
        for (breed in breedsData) {
            if (breedsData[breed].length > 0) {
                for (i in breedsData[breed]) {
                    flattenedBreeds.push(breed + "." + breedsData[breed][i]);
                };
            } else {
                flattenedBreeds.push(breed);
            }
        }
        for (let i=0; i<flattenedBreeds.length; i = i+size) {
            let chunk = flattenedBreeds.slice(i, i+size);
            paginatedBreedsData.push(chunk);
        };
        res.status(200).json(paginatedBreedsData);
    });
});

router.get('/breeds/detail/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    const id = req.params.id;
    if (breeds.length === 0) {
        getAllBreeds().then((data) => {
            const breedsData = data.message;
            breeds = breedsData;
            if (id in breedsData) {
                res.status(200).json(breeds[id]);
            } else {
                res.status(404).json({"errorMessage": "Not found"});
            }
        });
    } else {
        if (id in breeds) {
            res.status(200).json(breeds[id]);
        } else {
            res.status(404).json({"errorMessage": "Not found"});
        }
    }
});

module.exports = router;