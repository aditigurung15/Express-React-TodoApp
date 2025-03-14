const router= require("express").Router();
const User= require("../models/user");
const bcrypt= require("bcryptjs");
//sign up

router.post("/register", async(req, res)=>{

    try {

        const {email, username, password}= req.body;
        const hashpassword= bcrypt.hashSync(password)
        const user= new User({email, username, password: hashpassword});
        await user.save().then(()=>{
            res.status(200).json({message:"sign up sucessful"})
        })
        
    } catch (error) {

        console.log(error);
        
        res.status(400).json({message: "user already exists"})  
    }
})


//sign In

router.post("/signin", async(req, res)=>{

    try {
const user = await User.findOne({email: req.body.email});
if (!user) {
    return res.status(200).json({message: "please sign up first"});
}
    const IsPasswordCorrect= bcrypt.compareSync(req.body.password, user.password) ;
    if (!IsPasswordCorrect){
        return res.status(200).json({message: "Invalid user name and password"})
    }  
 
    const {password, ...others}= user._doc;
    res.status(200).json({user: others})

    } catch (error) {

        console.log(error);
        
        res.status(200).json({message: "user already exists"})  
    }
})


module.exports=router;