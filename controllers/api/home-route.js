const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(req.session)
});

module.exports = router;