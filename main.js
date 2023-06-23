const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const transporter = require('./helpers/mail')

// Configura un endpoint GET en la URL raíz que envía un mensaje simple de "¡Hola, mundo!"
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!')
})

// Configura un endpoint POST en /login/:email/code que envía un correo electrónico que contiene un mensaje con el asunto "Codigo de hackeo de la Nasa" y el cuerpo "Codigo de hackeo de la NASA" a la dirección de correo electrónico especificada en el parámetro de URL :email
app.post('/login/:email/code', async (req, res) => {
  const { email } = req.params

  // Usa el objeto transporter importado para enviar un correo electrónico a la dirección de correo electrónico especificada
  const result = await transporter.sendMail({
    from: `Epsaind Developer ${process.env.EMAIL}`,
    to: email,
    subject: 'Codigo de hackeo de la Nasa',
    text: 'Codigo de hackeo de la NASA'
  })

  // Registra el resultado del envío del correo electrónico en la consola
  console.log(result)

  // Envía una respuesta JSON al cliente indicando que el correo electrónico se envió con éxito
  res.status(200).json({ ok: 'true', message: 'Correo electrónico enviado exitosamente' })
})

// Inicia la aplicación escuchando en el puerto especificado y registra un mensaje en la consola indicando que la aplicación está en ejecución
app.listen(port, () => {
  console.log(`La aplicación de ejemplo está escuchando en el puerto ${port}`)
})
