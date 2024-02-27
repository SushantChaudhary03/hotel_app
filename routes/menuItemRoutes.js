const express = require('express');
const router = express.Router();
const Menu = require('./../models/menuItem');
const menuItem = require('./../models/menuItem');

router.post('/menu', async(req, res)=>{
    try{
      const menuData = await req.body;
      const newMenu = new Menu(menuData);
      const response = await newMenu.save();
      console.log("menu data saved successfully");
      res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: "Internal server error"});
    }
  })

  router.get('/', async(req, res)=>{
    try{
      const data = await menuItem.find();
      console.log("data fetched successfully");
      res.status(200).json(data);

    }
    catch(err){
      console.log(err);
      res.status(500).json({error: "Internal server error"});
    }
  })

module.exports = router;