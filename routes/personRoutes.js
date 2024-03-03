const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt')

router.post('/signup', async(req, res)=>{
    try{
      const data = req.body;
      const newPerson = new Person(data);
      const response = await newPerson.save();
      console.log("data saved");

      const payload = {
        id: response.id,
        username: response.username
      }

      const token = generateToken(payload);
      console.log(token);
      res.status(200).json({response: response, token: token});
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: "Internal server error"});
    }
  })

  // login route
  router.post('/login', async(req, res)=>{
    try{
    const {username, password} = req.body;
    const user = await Person.findOne({username: username});

    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error: "Invalid username or password"})
    }

    // generate token
    const payload = {
      id: user.id,
      username: user.username
    }
    const token = generateToken(payload);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: "Internal server error"});
  }
    
    // return token
    res.json({token})

  })
  
  router.get('/', async(req, res)=>{
    try{
      const response = await Person.find();
      console.log("data fetched successfully");
      res.status(200).json(response);
      
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: "Internal server error"});
    }
  })

  // profile routes 
  router.get('/profile', jwtAuthMiddleware, async(req, res)=>{
    try{
      const userData = req.user;
      const userId = userData.id;
      const user = await Person.findById(userId);
      res.status(200).json({user});
    }
    catch(err){
      res.status(500).json({error: "Internal server error"});
    }
  })

  router.get('/:worktype', async(req, res)=>{
    try{
    const workType = req.params.worktype;
    if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
      const data = await Person.find({work: workType});
      console.log("data find successfully");
      res.status(200).json(data);
    }
    else{
      res.status(404).json({error: "Invalid work type"});
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: "Internal server error"});
  }
  })

  // export router
module.exports = router