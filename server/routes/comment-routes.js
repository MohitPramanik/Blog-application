const { Router } = require('express');
const commentController = require('../controllers/comment-controller');
const { isLoggedIn } = require('../middlewares/auth-middleware');

const router = Router();


router.route("/:id")
    .get(isLoggedIn, commentController.getAllComments)  // get all comments    
    .post(isLoggedIn, commentController.createNewComment) // create new comment
    .put(isLoggedIn, commentController.updateComment)  // update comment
    .delete(isLoggedIn, commentController.deleteComment); // delete comment


router.route("/:id/like")
    .put(isLoggedIn, commentController.likeComment); // to like the comment


router.route("/:id/dislike")
    .put(isLoggedIn, commentController.dislikeComment); // to dislike the comment



module.exports = router;