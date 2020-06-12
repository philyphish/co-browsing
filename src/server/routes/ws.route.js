const  express = require('express');
const request = require('request-promise');
const router = express.Router();

router.route('/ws')
.get((req, res, next) => {
    console.log('inside the get');
    res.json({
        id: '123',
        name: 'philip'
    });
});

console.log('WS!!!!!');

module.exports = router;