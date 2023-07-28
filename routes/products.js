const router = require("express").Router()
const { isObjectIdOrHexString } = require("mongoose");
const Product = require("../models/product")
const { ObjectId } = require('mongodb');

router.get("/show", async (req, res) => {
    //pobranie wszystkich produktow z db:
    Product.find() 
        .then(async () => {
            const products = await Product.find();
            //konfiguracja odpowiedzi res z przekazaniem listy produktow:
            res.status(200).send({ data: products, message: "Lista produktów" });
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
})

//pobierz produkt o danym id
router.get('/:id', (req, res) => {
    Product.findById(ObjectId(req.params.id))
    .then(async () => {
        const products = await Product.findById(ObjectId(req.params.id))
        res.status(200).send({ data: products, message: "Lista produktów" });
    })
    .catch(error => {
        res.status(500).send({ message: error.message });
    });
  });

//dodawanie produktow
router.post("/add", async (req, res) => {  
    try {
        await new Product({ ...req.body}).save()
        res.status(201).send({ message: "Dodano produkt" })
    } catch (error) {
        res.status(500).send({ message: "Wewnętrzny błąd serwera" })
    }
});

//edycja
router.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body)
      .then(product => res.json({ msg: 'Edycja zakończyła się sukcesem' }))
      .catch(err =>
        res.status(400).json({ error: 'Wewnętrzny błąd serwera' })
      );
  });
  
//usuwanie
router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, req.body)
      .then(product => res.json({ mgs: 'Usuwanie zakończyło się sukcesem' }))
      .catch(err => res.status(404).json({ error: 'Nie ma takiego produktu' }));
  });

//id kategorii zwracajace produkty
router.get("/showCat/:id", async (req, res) => {
    Product.find({"categoryId": req.params.id})
        .then(async () => {
            const products = await Product.find({"categoryId": req.params.id});
            //konfiguracja odpowiedzi res z przekazaniem listy produktow:
            res.status(200).send({ data: products, message: "Lista produktów" });
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
})

module.exports = router