const express = require('express');

const router = express.Router();

router.get('/',(req,res) => {
    return res.render('home');
})

router.use('/user',require("./user"));

module.exports = router