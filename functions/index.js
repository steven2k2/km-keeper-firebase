const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')

admin.initializeApp()
const db = admin.firestore()
const app = express()

app.use(cors({ origin: true }))

// Add a new claim
app.post('/claims', async (req, res) => {
  const { date, km, purpose } = req.body
  try {
    const docRef = await db.collection('claims').add({ date, km, purpose })
    res.status(201).send({ id: docRef.id, message: 'Claim added successfully!' })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Get all claims
app.get('/claims', async (req, res) => {
  try {
    const snapshot = await db.collection('claims').get()
    const claims = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    res.status(200).send(claims)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Update a claim
app.put('/claims/:id', async (req, res) => {
  const { id } = req.params
  const { date, km, purpose } = req.body
  try {
    await db.collection('claims').doc(id).update({ date, km, purpose })
    res.status(200).send({ message: 'Claim updated successfully!' })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Delete a claim
app.delete('/claims/:id', async (req, res) => {
  const { id } = req.params
  try {
    await db.collection('claims').doc(id).delete()
    res.status(200).send({ message: 'Claim deleted successfully!' })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

exports.api = functions.https.onRequest(app)
