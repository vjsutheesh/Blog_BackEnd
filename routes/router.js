const express = require('express')
const router = express.Router()
const controllers = require('../controller/controller')
router.get('/home',controllers.getAllBlogs);

router.post('/create',controllers.create_Blog);

router.get('/getblogs/:blog_id',controllers.getblogby_user);

router.delete('/deleteblogs/:blog_id',controllers.delete_blog);


module.exports = router;