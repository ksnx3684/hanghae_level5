const { Op } = require("sequelize");
const { Posts, Comments } = require('../models');

class CommentRepository {
    checkPost = async (postId) => {
        const post = await Posts.findOne({ where: { postId: postId } });
        return post;
      }

    checkComment = async (commentId) => {
        const comment = await Comments.findOne({ where: { commentId } });
        return comment;
    }

    getComments = async (postId) => {
      const allComment = await Comments.findAll({
        where: { postId },
        attributes: ['commentId', 'postId', 'userId', 'nickname', 'comment', 'createdAt', 'updatedAt'],
        order: [['createdAt', 'desc']]
      });
      return allComment;
    };

    createComment = async (postId, userId, nickname, comment) => {
      const createCommentData = await Comments.create({ postId, userId, nickname, comment });
      return createCommentData;
    };

    updateComment = async (postId, userId, nickname, comment, commentId) => {
      const commentData = await Comments.update(
        { postId, userId, nickname, comment },
        { where: { commentId: commentId } }
    );
      return commentData;
    };

    deleteComment = async (commentId) => {
      const commentData = await Comments.destroy(
        { where: { commentId: commentId } }
    );
      return commentData;
    };
}


module.exports = CommentRepository;