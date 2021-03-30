const User = require('../schema/user');
const UserProfile = require('../schema/UserProfile');


//get method

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.json({users:users});
}

const getUser = async (req, res) => {

    const users = await User.findOne({email:req.query.email});
    res.json({users:users});
}


//post method

const postUser = async (req, res) => {
    const data = req.body;
    const user = new User(data);
    user.save((error, result) => {
        if(error){
            res.json({status:false});
        } else {
            res.json({status:true});
        }
    });
}


//put method

const updateUser = async (req, res) => {
    const user =await User.findOneAndUpdate({_id:req.body._id}, {$set:req.body}, {new:true});
    res.json({user:user});
}

//delete method

const deleteUser = async (req, res) => {
    const user = await User.findOneAndRemove({_id:req.body._id});
    res.json({user:user});
}



module.exports = { getAllUsers, postUser, getUser, updateUser, deleteUser };