const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

router.post('/', async(req, res)=>{
    try{
      const data = req.body;
      const newPerson = new Person(data);
      const response = await newPerson.save();
      console.log("data saved");
      res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: "Internal server error"});
    }
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