const router = require('express').Router()
const { User, Project, Client } = require('./../models')
const PDFDocument = require('pdfkit')
const doc = new PDFDocument()

// generate PDF for one project by id (include the Client it's for)
router.get('/', async (req, res) => {
  console.log(req.session)
  // stream pdf to response
  doc.pipe(res)
  // define header for response to render readable pdf
  res.setHeader('Content-Type', 'application/pdf')

  // create array for list of clients (what if none?)
  Client.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ['company_name', 'contact_first_name', 'contact_last_name', 'email', 'phone_number'],
    include: {
      model: Project,
      attributes: ['project_name', 'status']
    }
  })
    .then(dbClientData => {
      // get username
      const username = req.session.username
      // serialize Sequelize response to only properties we need
      const serializedClients = dbClientData.map(clients => clients.get({ plain: true }))
      // destructure company_name and projects from applicable clients
      const clients = serializedClients.map(({ company_name, projects: [{ project_name }] }) => ([
        company_name,
        [project_name]
      ]))
      // console.log(serializedClients)
      // console.log('====================')
      // console.log(clients)
      doc.image('public/assets/images/programmer.png', { fit: [100, 100], align: 'center' })
        .moveDown()
        .fontSize(16)
        .font('Helvetica-Bold')
        .text(`Hey there, ${username}!`, {
          align: 'center'
        })
        .text('Here\'s that client list you requested.', {
          align: 'center'
        })

        .moveDown()
        // .font('Helvetica-Bold')
        .fontSize(24)
        .text('Client List', {
          underline: true
        })
        .font('Helvetica')
        .fontSize(16)
        .list(clients)

      // finish generating pdf
      doc.end()
    })
    .catch(err => {
      console.log(err)
      // res.status(500).json(err)
    })
})

module.exports = router
