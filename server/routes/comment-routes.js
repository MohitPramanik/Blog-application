const { Router } = require('express');
const commentController = require('../controllers/comment-controller');
const { isLoggedIn } = require('../middlewares/auth-middleware');

const router = Router();


router.route("/")
    .post(isLoggedIn, commentController.createNewComment); // create new comment

router.route("/:id")
    .get(isLoggedIn, commentController.getAllComments)  // get all comments    
    .put(isLoggedIn, commentController.updateComment)  // update comment
    .delete(isLoggedIn, commentController.deleteComment); // delete comment

module.exports = router;