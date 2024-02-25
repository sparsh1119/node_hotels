const express = require('express');
const router = express.Router();

const menu = require('../models/menuItem');

//POST method to add menu
router.post('/', async(req, res)=>{
    try {
      const data = req.body;
      const newMenu = new menu(data);
      const savedMenu = await newMenu.save();
  
      console.log('saved data');
      res.status(200).json(savedMenu);
    } catch (error) {
      console.log(error);
      req.status(500).json({error:'Internal server error'});
    }
  });
  
  //GET method to add menu item
  router.get('/',async(req,res)=>{
    try {
      const data = await menu.find();
      console.log('data fetched');
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      req.status(500).json({error:'Internal server error'})
    }
  });

  //paramertersed call for menu taste
  router.get('/:tasteType', async(req,res)=>{
    try {
        const tasteType = req.params.tasteType;
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
            const response = await menu.find({taste: tasteType});
            console.log('data fetcjed');
            res.status(200).json(response);
    
        }else{
            res.status(404).json({error:'Invalid taste type'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
  });

  //update data
  router.put('/:id', async(req,res)=>{
    try {
        const menuId = req.params.id;
        const updateMenuData = req.body;
        const response = await menu.findByIdAndUpdate(menuId , updateMenuData,{
            new: true,
            runValidators:true,
        });
        if(!response){
            return res.status(404).json({error:'Item not found'});
        }
        console.log('data fetched');
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        req.status(500).json({error:'Internal server error'});
    }
  });

  //delete data
  router.delete('/:id', async(req,res)=>{
    try {
        const menuId = req.params.id;
        const response = await menu.findByIdAndDelete(menuId);

        if(!response){
            return res.status(404).json({error:'Item not found'});
        }

        console.log('data fetched');
        res.status(200).json({message:'Data deleted'})
    } catch (error) {
        console.log(error);
        req.status(500).json({error:'Internal server error'});
    }
  })

  //comment added for testing git 
  module.exports = router;
  