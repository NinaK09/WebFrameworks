const router = require("express").Router()
const Product = require("../models/product")
const Category = require("../models/category")
const { ObjectId } = require('mongodb');

router.get("/show", async (req, res) => {
    //pobranie wszystkich produktow z db:
    Category.find()
        .then(async () => {
            const categories = await Category.find();
            //konfiguracja odpowiedzi res z przekazaniem listy produktow:
            res.status(200).send({ data: categories, message: "Lista kategorii" });
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
})

router.post("/add", async (req, res) => {
    try {
        await new Category({ ...req.body}).save()
        res.status(201).send({ message: "Dodano kategorię" })
    } catch (error) {
        res.status(500).send({ message: "Wewnętrzny błąd serwera" })
    }
})

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    Category.findById(ObjectId(req.params.id))
    .then(async () => {
        const category = await Category.findById(ObjectId(req.params.id))
        res.status(200).send({ data: category, message: "Kategoria" });
    })
    .catch(error => {
        res.status(500).send({ message: error.message });
    });
  });

router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id, req.body)
      .then(category => res.json({ mgs: 'Usuwanie zakończyło się sukcesem' }))
      .catch(err => res.status(404).json({ error: 'Nie ma takiego produktu' }));
  });

  router.put('/:id', (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body)
      .then(category => res.json({ msg: 'Edycja zakończyła się sukcesem' }))
      .catch(err =>
        res.status(400).json({ error: 'Wewnętrzny błąd serwera' })
      );
  });

module.exports = router