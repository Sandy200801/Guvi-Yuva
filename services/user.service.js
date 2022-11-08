const userModel = require('../model/user.model');

class userService{
    static async createUser(username,password,contact){
          var data = await userModel.create({username,password,contact});
          data.save();
          return data;
    }

    static async findUser(data){
           return await userModel.findOne({username: data});
    }
}


module.exports = userService;