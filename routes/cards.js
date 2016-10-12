const express = require('express');
const router = express.Router();
const db = require('../db.json');

let lastId = getLastId(db);

function getIndex(arr, id) {
  return arr.findIndex(item => item.id === Number(id));
}

function getLastId(db) {
  return Math.max(...db.cards.map(item => item.id));
}

function getRandomBackgroundColor() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

router.get('/', function (req, res, next) {
  res.status(200);
  res.json(db.cards);
});

router.get('/:id', function (req, res, next) {
  const index = getIndex(db.cards, req.params.id);
  if (index === -1) {
    res.status(404).send('404');
  }
  else {
    res.status(200);
    res.json(db.cards[index]);
  }
});

router.post('/', function (req, res, next) {
  req.body.id = ++lastId;
  req.body.title += ` ${lastId}`;
  req.body.background = getRandomBackgroundColor();

  db.cards.push(req.body);
  res.json(db.cards);
});

router.put('/:id', function (req, res, next) {
  const index = getIndex(db.cards, req.params.id);
  Object.assign(db.cards[index], req.body);
  res.json(db.cards[index]);
});

router.delete('/:id', function (req, res, next) {
  const index = getIndex(db.cards, req.params.id);
  db.cards.splice(index, 1);
  res.json(db.cards);
});

module.exports = router;
