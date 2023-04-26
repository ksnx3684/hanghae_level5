const { Op } = require('sequelize');
const { Posts, Likes, sequelize } = require('../models');
const { Transaction } = require('sequelize');

class LikeRepository {
  checkLike = async (postId, userId) => {
    const like = await Likes.findOne({
      where: {
        [Op.and]: [{ postId }, { userId }],
      },
    });
    return like;
  };

  postLike = async (postId, userId) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    await Likes.create({ postId, userId }, { transaction: t });
    await Posts.increment({ likes: +1 }, { transaction: t, where: { postId } });
    await t.commit();
    return;
  };

  postLikeCancel = async (postId, userId) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    await Likes.destroy({
      transaction: t,
      where: {
        [Op.and]: [{ postId }, { userId }],
      },
    });
    await Posts.decrement({ likes: +1 }, { transaction: t, where: { postId } });
    await t.commit();
    return;
  };

  myPostLike = async (userId) => {
    const likeList = await Likes.findAll({
      include: [
        {
          model: Posts,
          attributes: [
            'postId',
            'userId',
            'nickname',
            'title',
            'createdAt',
            'updatedAt',
            'likes',
          ],
        },
      ],
      where: { userId },
      attributes: [],
      order: [[Posts, 'likes', 'desc']],
    });
    return likeList;
  };
}

module.exports = LikeRepository;
