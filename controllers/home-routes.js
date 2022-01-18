const res = require('express/lib/response');

const router = require('express').Router();

// dont need findall or pass data
// need res render to render homepage
// include catch error
router.get('/', (req, res) => {
});

// res.render('homepage')

module.exports = router;
