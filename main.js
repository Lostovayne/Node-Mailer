const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const Fetch_Data = require('./helpers/Fetching_Data.js')
const transporter = require('./helpers/mail')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send(index.html)
})

app.get('/correos', async (req, res) => {
  const { para, asunto, contenido } = req.query
  const { dolar, euro, uf, utm } = await Fetch_Data()

  const result = await transporter.sendMail({
    from: `Epsaind Developer ${process.env.EMAIL}`,
    to: para,
    subject: asunto,
    text: `${contenido} :  El valor del ${dolar.codigo} es : ${dolar.valor} , El valor del ${euro.codigo} es : ${euro.valor} , El valor del ${uf.codigo} es : ${uf.valor} , El valor del ${utm.codigo} es : ${utm.valor} `
  })

  console.log(result)
  res.status(200).json({ ok: 'true', message: 'Correo electrónico enviado exitosamente' })
})

app.listen(port, () => {
  console.log(`La aplicación de ejemplo está escuchando en el puerto ${port}`)
})
