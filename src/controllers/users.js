import Users from "../models/user";

class UsersController {
 
  async getAll(req, res,next) { 
    if (req.body) {
        try{
            let products = await Users.find({}).exec();
            return res.json(products);    
        }
        catch(err){
          return res.status(400).json({ error: err.message });
        }
    } else {
      return res.status(401).send({success: false, msg: 'Unauthorized.'});
    }
  };


async put (req,res){
if (req.params.id && req.body) {
  try{
   const user = await Users.findById(req.params.id).exec();
   user.set(req.body);
   const result = await user.save();
   return res.json(result); 
  }  catch (err) {
    return res.status(400).json({success: false, msg: 'User does not exist!'});
} 
}
else {
 return res.status(401).send({success: false, msg: 'Unauthorized.'});
}
};


async delete (req, res) {
try {
    await Users.deleteOne({ _id: req.params.id }).exec();
   res.json({success: true, msg: ' User is deleted successfully.'});

} catch (err) {
  return res.status(400).json({success: false, msg: 'User does not exist!'});
}
}

}


export default new UsersController; 