// Importaciones
const express = require('express')
const Fetch_Data = require('./helpers/Fetching_Data.js')
const transporter = require('./helpers/mail')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config()
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send(index.html)
})

app.get('/correos', async (req, res) => {
  const { para, asunto, contenido } = req.query
  const { dolar, euro, uf, utm } = await Fetch_Data()

  // Creacion del Template

  const DataEmail = {
    from: `Epsaind Developer ${process.env.EMAIL}`,
    to: para,
    subject: asunto,
    text: `${contenido}: 
    El valor del ${dolar.codigo} es: ${dolar.valor} , 
    El valor del ${euro.codigo} es: ${euro.valor} , 
    El valor del ${uf.codigo} es: ${uf.valor} , 
    El valor del ${utm.codigo} es: ${utm.valor} `
  }

  //Parseo de los datos

  const result = await transporter.sendMail(DataEmail)

  const EmailParseado = JSON.stringify(DataEmail)

  const filePath = path.join(__dirname, 'correos', `${uuidv4().slice(0, 8)}.txt`)
  console.log(result)

  // Manejo del File System

  fs.writeFile(filePath, EmailParseado, (err) => {
    if (err) throw err
    console.log('The file has been saved!')
  })

  res.status(200).json({ ok: 'true', message: 'Correo electrónico enviado exitosamente' })
})

app.listen(port, () => {
  console.log(`La aplicación de ejemplo está escuchando en el puerto ${port}`)
})
