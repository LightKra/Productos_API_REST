import User from '../models/User'
import jwt from 'jsonwebtoken';
import config from '../config'
import Role from '../models/Role';
export const signup = async (req, res) => {
    const {username, email, password, roles} = req.body

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    });
    if(roles){
        const foundRoles = await Role.find({name: {$in: roles}});
        newUser.roles = foundRoles.map(role => role._id);
    }else{
        const role = await Role.findOne({name: "user"});
        newUser.roles = [role._id];
    }
    const savedUser = await newUser.save();
    console.log(savedUser);
    const token = jwt.sign({id: savedUser._id},config.SECRET,{
        expiresIn: 84600 //24hours
    })
    res.json(token);
}
export const signin = async (req, res) => {
    console.log("sin populate: \n", await User.findOne({email: req.body.email}));
    const userFound = await User.findOne({email: req.body.email}).populate("roles");
    if(!userFound) return res.status(404).json({message: "User not found"});
    const matchPassword = await User.comparePassword(req.body.password, userFound.password);
    if(!matchPassword) return res.status(401).json({token: null,message:"invalid pass"});
    const token =jwt.sign({id:userFound._id}, config.SECRET,{
        expiresIn: 86400
    });
    console.log(userFound);
    res.json({token});
}

