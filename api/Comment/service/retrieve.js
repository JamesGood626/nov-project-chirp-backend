const Comment = require("../model/comment");
const { to } = require("await-to-js");
const authorizeUser = require("../../lib/authorization");
const {
    SUCCESS,
    NO_CONTENT,
    NOT_MODIFIED,
    UNPROCESSABLE_ENTITY,
    INTERNAL_SERVER_ERROR
  } = require("../../StatusCodeConstants");

const getCommentsIfAuthorized = async(req, res) => {
    //console.log(req.params)
    const [errAuth, auth] = await to(authorizeUser(req, res));
    if(errAuth)
    res.status(UNPROCESSABLE_ENTITY).json(errAuth);
    const [err, comments] = await to(getCommentsForChirp(req.params.chirpId));
    if(err){
        console.log(err)
        res.status(UNPROCESSABLE_ENTITY).json(err);
    }
    console.log(comments);
    res.json({data:comments});
}

const getCommentsForChirp = async chirpId => {
    const [err, comments] = await to(Comment.find(
        {
            chirpUuid: chirpId 
        }
    ));
    
    return err?Promise.reject(err):Promise.resolve(comments);
};

module.exports = getCommentsIfAuthorized;