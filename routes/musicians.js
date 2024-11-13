const express = require('express');
const musicians = express.Router();
const Musician = require('../models/Musician.js');

musicians.get('/', async(req, res) => {
    try {
        const musicians = await Musician.findAll();
        res.json(musicians);
    } catch (err) {
        res.json({ message: err });
    }
});

musicians.get('/:id', async(req, res) => {
    try {
        const musician = await Musician.findByPk(req.params.id);
        res.json(musician);
    } catch (error) {
        res.json(error);
    }
})

musicians.post('/', async(req, res) => {
    try {
        const musician = await Musician.create({
            name: req.body.name,
            instrument: req.body.instrument
        });
        res.json(musician);
    } catch (error) {
        res.json({ message: error });
    }
});

musicians.put('/:id', async(req, res) => {
    try {
        const newMusician = await Musician.update(
            req.body, { where: { id: req.params.id } })
        res.json(newMusician);
    } catch (error) {
        res.json({ message: error });
    }
});

musicians.delete('/:id', async(req, res) => {
    try {
        const musician = await Musician.findByPk(req.params.id);
        await musician.destroy();
        res.json({ message: 'Musician deleted' });
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = musicians;