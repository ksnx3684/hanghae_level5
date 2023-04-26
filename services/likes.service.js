const LikeRepository = require('../repositories/likes.repository');

class LikeService {
  likeRepository = new LikeRepository();

  findDetailPost = async (postId) => {
    const post = await this.likeRepository.findDetailPost(postId);
    return post;
  }

  checkLike = async (postId, userId) => {
    const like = await this.likeRepository.checkLike(postId, userId);
    return like;
  }

  postLike = async (postId, userId) => {
    const like = await this.likeRepository.postLike(postId, userId);
    return like;
  }

  postLikeCancel = async (postId, userId) => {
    const dislike = await this.likeRepository.postLikeCancel(postId, userId);
    return dislike;
  }

  myPostLike = async (userId) => {
    const likeList = await this.likeRepository.myPostLike(userId);
    return likeList;
  }
}

module.exports = LikeService;