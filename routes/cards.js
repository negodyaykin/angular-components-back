const express = require('express');

const router = express.Router();
const db = require('../db.json');

function getIndex(arr, id) {
  return arr.findIndex(item => item.id === Number(id));
}

function getLastId(dataBase) {
  return Math.max(...dataBase.cards.map(item => item.id));
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomBackgroundColor() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

const lastId = getLastId(db);

router.get('/', (req, res) => {
  res.status(200);
  res.json(db.cards);
});

router.get('/:id', (req, res) => {
  const index = getIndex(db.cards, req.params.id);
  if (index === -1) {
    res.status(404).send('404');
  } else {
    res.status(200);
    res.json(db.cards[index]);
  }
});

router.post('/', (req, res) => {
  req.body.id = lastId + 1;
  req.body.title += ` ${lastId}`;
  req.body.background = getRandomBackgroundColor();

  db.cards.push(req.body);
  res.json(db.cards);
});

router.put('/:id', (req, res) => {
  const index = getIndex(db.cards, req.params.id);
  Object.assign(db.cards[index], req.body);
  res.json(db.cards[index]);
});

router.delete('/:id', (req, res) => {
  const index = getIndex(db.cards, req.params.id);
  db.cards.splice(index, 1);
  res.json(db.cards);
});

module.exports = router;
