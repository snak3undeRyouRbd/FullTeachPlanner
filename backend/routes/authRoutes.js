const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', {title: 'Увійти'});
   });

router.get('/register', (req, res) => {
    res.render('reset_password', {title: 'зареєструватися'});
   });

router.get('/reset_password', (req, res) => {
    res.render('reset_password', {title: 'скинути пароль'});
   });

module.exports = router;