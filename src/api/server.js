const path = require('path');
const cors = require('cors');
const express = require('express');
const joi = require('joi');
const bcrypt = require('bcrypt');
const { connect } = require('./db');

const app = express();
const port = process.env.PORT || 3001;

// Chargement des variables d'environnement
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Gestion des CORS
app.use(cors({}));

// traitement des requetes post
app.use(express.json());

// On définit le dossier build comme statique, ce qui permet de publier
// l'application REACT
app.use(express.static(path.join(__dirname, '..', '..', 'build')));

// Connection à la BDD
const db = connect({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Page d'accueil de l'API (on renvoie simplement le contenu d'index.html)
app.use('/api', express.static(path.join(__dirname, 'index.html')));

// Endpoint qui renvoie la liste de TOUS les utilisateurs
app.get('/api/users', async (req, res) => {
  try {
    const [users] = await db.query('SELECT * FROM users');
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

// endpoint permettant de creer un nouvel utilisateur
app.post('/api/users', async (req, res) => {
  // recup données posté
  const { email } = req.body;
  const { password } = req.body;
  const { username } = req.body;

  // Vérifier ces données
  const { error } = joi
    .object({
      email: joi.string().email().max(255).required(),
      password: joi.string().min(8).required(),
      username: joi.string().min(3).max(15).required(),
    })
    .validate({ email, password, username }, { abortEarly: false });

  if (error) {
    return res.status(400).send(error);
  }
  // executer notre requete d'insertion en BDD
  try {
    await db.query(
      'INSERT INTO users (email, password, username, role) VALUES (?, ?, ?, ?)',
      [email, await bcrypt.hash(password, 10), username, null]
    );
    res.status(201).send('ok');
  } catch (e) {
    res.status(500).send('cannot create user');
  }
});

// post actus BDD

app.post('/api/actus', async (req, res) => {
  // recup données posté
  const { title } = req.body;
  const { image } = req.body;
  const { article } = req.body;
  const { sign } = req.body;

  // Vérifier ces données
  const { error } = joi
    .object({
      title: joi.string().max(75).required(),
      image: joi.string().required(),
      article: joi.string().required(),
      sign: joi.string().min(3).required(15),
    })
    .validate({ title, image, article, sign }, { abortEarly: false });

  if (error) {
    return res.status(400).send(error);
  }
  // executer notre requete d'insertion en BDD
  try {
    await db.query(
      'INSERT INTO actus (image, title, text, signature) VALUES (?, ?, ?, ?)',
      [image, title, article, sign]
    );
    res.status(201).send('ok');
  } catch (e) {
    res.status(500).send('cannot create article');
  }
});

// get actus BDD

app.get('/api/actus', async (req, res) => {
  try {
    const [actus] = await db.query('SELECT * FROM actus ORDER BY date DESC');
    res.send(actus);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post('/api/login', async (req, res) => {
  // recup données posté
  const { clearPassword } = req.body;
  const { username } = req.body;

  // Vérifier ces données
  const { error } = joi
    .object({
      clearPassword: joi.string().required(),
      username: joi.string().required(),
    })
    .validate({ clearPassword, username }, { abortEarly: false });

  if (error) {
    return res.status(400).send(error);
  }
  // executer notre requete d'insertion en BDD
  try {
    const [user] = await db.query('SELECT * FROM users WHERE username = ?', [
      username,
    ]);

    if (
      user.length === 0 ||
      (await bcrypt.compare(clearPassword, user[0].password)) === false
    ) {
      return res.status(401).send('unauthorized');
    }
    const { password, ...userObject } = user[0];
    const [bookmarks] = await db.query(
      'SELECT manga_id as id FROM bookmarks WHERE user_id = ?',
      [userObject.id]
    );
    res.send({
      ...userObject,
      bookmarks: bookmarks.map((b) => b.id),
    });
  } catch (e) {
    res.status(500).send('unexpected error');
  }
});

app.post('/api/bookmark', async (req, res) => {
  // recup données posté
  const { manga_id } = req.body;
  const { user_id } = req.body;

  // executer notre requete d'insertion en BDD
  try {
    await db.query('INSERT INTO bookmarks (user_id, manga_id) VALUES (?, ?)', [
      user_id,
      manga_id,
    ]);
    return res.status(200).send('save');
  } catch (e) {
    res.status(500).send('unexpected error');
  }
});

app.delete('/api/bookmark', async (req, res) => {
  // recup données posté
  const { manga_id } = req.body;
  const { user_id } = req.body;

  // executer notre requete d'insertion en BDD
  try {
    await db.query(
      'DELETE FROM bookmarks WHERE user_id = ? AND manga_id = ? ',
      [user_id, manga_id]
    );
    return res.status(200).send('delete');
  } catch (e) {
    console.log(e);
    res.status(500).send('unexpected error');
  }
});

app.post('/api/messenger', async (req, res) => {
  // recup données posté
  const { input } = req.body;
  const { username } = req.body;

  // Vérifier ces données
  const { error } = joi
    .object({
      input: joi.string().required(),
      username: joi.string().required(),
    })
    .validate({ input, username }, { abortEarly: false });

  if (error) {
    return res.status(400).send(error);
  }
  // executer notre requete d'insertion en BDD
  try {
    const [message] = await db.query(
      'INSERT INTO comment (username, input) VALUES (?, ?)',
      [username, input]
    );

    res.status(201).send('ok');
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get('/api/messenger', async (req, res) => {
  try {
    const [message] = await db.query('SELECT * FROM comment');
    res.send(message);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// recuperer utilisateur avec mail


