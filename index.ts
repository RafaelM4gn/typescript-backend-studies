// Imports
import express from 'express'
import mysql from 'mysql2/promise'

// Inicialize express app
const app = express()

// Middleware to parse json data
app.use(express.json())

// Create connection pool to mysql database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'banco',
  connectionLimit: 10
})

// Read and return all table
app.get('/', async (req, res) => {
  const [notes] = await pool.query('SELECT * FROM notas');
  res.json(notes)
})

// Update a note by id
app.put('/:id', async (req, res) => {
  const id = req.params.id
  const { title, content } = req.body
  await pool.query('UPDATE notas SET title = ?, content = ? WHERE id = ?', [title, content, id])
  res.json({ message: 'Note updated' })
})

// Create a new note
app.post('/', async (req, res) => {
  const { title, content } = req.body
  await pool.query('INSERT INTO notas (title, content) VALUES (?, ?)', [title, content])
  res.json({ message: 'Note created' })
})

// Remove a note by id
app.delete('/:id', async (req, res) => {
  const id = req.params.id
  await pool.query('DELETE FROM notas WHERE id = ?', [id])
  res.json({ message: 'Note deleted' })
})

// listen on port 3000
app.listen(3000, () => {
  console.log('Server is running')
})
