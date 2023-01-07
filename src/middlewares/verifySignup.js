import {ROLES} from '../models/Role'
import User from '../models/User';
export const checkRolesExisted = (req, res ,next) =>{
    if(req.body.roles){
        for (let i=0;i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(404).json({message: `${req.body.roles[i]} does not exist`});
            }
        }
    }
    next();
}

export const checkDuplicate = async (req, res, next) => {
    const user = await User.findOne({username: req.body.username});
    if(user) return res.status(400).json({message: 'The user already exists'});

    const email = await User.findOne({email: req.body.email});
    if(email) return res.status(200).json({message: 'The user already exists'});

    next();
}