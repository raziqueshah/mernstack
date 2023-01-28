const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

require('../db/conn');
const User = require('../model/userSchema');
const authenticate = require('../middleware/authenticate');

router.get('/', (req, res)=>{
    res.send('Hello World from router.js');
});

// router.post('/signup', (req, res) =>{
//     const { name, email, phone, work, password, cpassword } = req.body ;
//     if( !name || !email || !phone || !work || !password || !cpassword  ){
//         return response.status(422).json({ error: "Please filled all field" })
//     }

//     User.findOne({ email: email}).then((userExist) =>{
//         if(userExist){
//             return res.status(422).json({error: "email already exist."})
//         }

//         const user = new User({ name, email, phone, work, password, cpassword });

//         user.save().then(()=>{
//             res.status(201).json({ message: "user register successfully"});
//         }).catch((err) => {
//             res.status(500).json({ error: "Failed to registered"});
//         })

//     }).catch((error)=>{
//         console.log(error)
//     })
// })

router.post('/signup', async(req, res) =>{

    try {

        const { name, email, phone, work, password, cpassword } = req.body ;

        if( !name || !email || !phone || !work || !password || !cpassword  ){
          return res.status(422).json({ error: "Please filled all field" });
        }

        const userExist = await User.findOne({ email: email})

        if(userExist){
            return res.status(422).json({error: "email already exist."})
        } else if (password != cpassword) {
            return res.status(422).json({error: "password are not matching"})
        } else {
        
           const user = new User({ name, email, phone, work, password, cpassword });


		//here password is hashing
		
		// const userRegister = await user.save();
		// if(userRegister){
		//     res.status(201).json({ message: "user register successfully"});
		// } else{
		//     res.status(500).json({ error: "Failed to registered"});
		// }

		await user.save();
	       
		res.status(201).json({ message: "user register successfully"});
        }

        


    } catch (error) {
        console.log(error)
    }
    
});


router.post('/signin', async(req, res)=>{
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({error: "Please filled both"});
        }

        const userLogin = await User.findOne({email:email});
        
        // console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            const tokenGen = await userLogin.generateAuthToken();
            console.log(tokenGen);

            res.cookie("jwtoken", tokenGen, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json("invalid credential");
            } else{
                res.json("user signin successfully");
            }
        }else{
            res.status(400).json("invalid credential");
        }

        

    } catch (error) {
        console.log(error);
    }
});

// about uska page

router.get('/about', authenticate, (req, res)=>{
    console.log('Hello My About');
    res.send(req.rootUser);
});

// contact uska page

router.get('/getcontact', authenticate, (req, res)=>{
    console.log('Hello My Contact');
    res.send(req.rootUser);
});

router.post('/contact', authenticate, async(req, res)=>{
    try {
        const {name, email, phone, message} = req.body;
        if(!name || !email || !phone || !message){
            console.log("error in contact form");
            res.json({error: "plzz filled the contact form"});
        }

        const userContact = await User.findOne({_id: req.userID});

        if(userContact){
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();
            res.status(201).json({message: "user contact successfully"});
        }

    } catch (error) {
        console.log(error);
    }
});

router.get('/logout', (req, res)=>{
    console.log('Hello My logout');
    res.clearCookie("jwtoken", {path:'/'});
    res.status(200).send("User logout")
});


module.exports = router;
