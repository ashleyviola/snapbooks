const router = require('express').Router()
const { User, Project, Client } = require('./../models')
const PDFDocument = require('pdfkit')

// generate PDF by project id
router.get('/:id', (req, res) => {
  /*
  This MUST be set INSIDE the route otherwise subsequent calls to endpoint won't have anything to attach PDF to and you get a 200 OK response, but "No body returned for response" message
  */
  const doc = new PDFDocument()

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
