const router = require('express').Router()
const { User, Project, Client } = require('./../models')
const PDFDocument = require('pdfkit')
const doc = new PDFDocument()

// ENHANCEMENT OPPORTUNITY
// router.get('/', async (req, res) => {
//   console.log(req.session)
//   // stream pdf to response
//   doc.pipe(res)
//   // define header for response to render readable pdf
//   res.setHeader('Content-Type', 'application/pdf')

//   // create array for list of clients (what if none?)
//   Client.findAll({
//     where: {
//       user_id: req.session.user_id
//     },
//     attributes: ['company_name', 'contact_first_name', 'contact_last_name', 'email', 'phone_number'],
//     include: {
//       model: Project,
//       attributes: ['project_name', 'status']
//     }
//   })
//     .then(dbClientData => {
//       // get username
//       const username = req.session.username
//       // serialize Sequelize response to only properties we need
//       const serializedClients = dbClientData.map(clients => clients.get({ plain: true }))
//       // destructure company_name and projects from applicable clients
//       const clients = serializedClients.map(({ company_name, projects: [{ project_name }] }) => ([
//         company_name,
//         [project_name]
//       ]))
//       // console.log(serializedClients)
//       // console.log('====================')
//       // console.log(clients)
//       doc.image('public/assets/images/programmer.png', { fit: [100, 100], align: 'center' })
//         .moveDown()
//         .fontSize(16)
//         .font('Helvetica-Bold')
//         .text(`Hey there, ${username}!`, {
//           align: 'center'
//         })
//         .text('Here\'s that client list you requested.', {
//           align: 'center'
//         })

//         .moveDown()
//         // .font('Helvetica-Bold')
//         .fontSize(24)
//         .text('Client List', {
//           underline: true
//         })
//         .font('Helvetica')
//         .fontSize(16)
//         .list(clients)

//       // finish generating pdf
//       doc.end()
//     })
//     .catch(err => {
//       console.log(err)
//       // res.status(500).json(err)
//     })
// })

// generate PDF by project id
router.get('/:id', (req, res) => {
  doc.pipe(res)
  res.setHeader('Content-Type', 'application/pdf')

  Project.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'project_name',
      'description',
      'cost',
      'project_order_number'
    ]
  })
    .then(dbProjectData => {
      const serializedProjData = dbProjectData.get({ plain: true })
      const project_name = serializedProjData.project_name
      const description = serializedProjData.description
      const cost = serializedProjData.cost
      const project_order_number = serializedProjData.project_order_number

      doc.image('public/assets/images/programmer.png', { fit: [100, 100], align: 'center' })
        .moveUp(3)
        .fontSize(24)
        .font('Helvetica-Bold')
        .text(`${project_name}`, {
          align: 'right',
          underline: true
        })
        .moveDown()
        .fontSize(16)
        .text(`Project Order Number: ${project_order_number}`)
        .moveDown()
        .text('Project description:')
        .font('Helvetica')
        .text(`${description}`, {
          oblique: true
        })

        .moveDown(15)
        .fontSize(16)
        .text(`Total cost: $${cost}`, {
          align: 'right'
        })

      // finish generating pdf
      doc.end()
    })
    .catch(err => {
      console.log(err)
      // res.status(500).json(err)
    })
})

module.exports = router
