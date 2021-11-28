const { Router } = require('express')
const controllers = require('../controllers')
const router = Router()
// const restrict = require('../helpers')
router.get('/', (req, res) => res.send('This is root!'))

// router.post('/sign-up', controllers.signUp)
// router.post('/sign-in', controllers.signIn)
// router.post('/change-password', controllers.changePassword)

router.get('/items', controllers.getAllItems)
// router.get('/items/:id', controllers.getItemById)
// Add POST route for /items
router.post('/items', controllers.createItem)
// Add PUT route for /items/:id
// Add DELETE route for /items/:id

module.exports = router
