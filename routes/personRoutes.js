const express = require('express');
const router = express.Router();

const person = require('../models/person');

//POST route to add a person
router.post('/', async (req, res) => {
    try {
      const newPersonData = req.body;
      const newPerson = new person(newPersonData);
      const savedPerson = await newPerson.save();
      console.log('Saved to database');
      res.status(200).json(savedPerson);
    } 
    catch (error)
     {
      console.error('Error saving person:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  //GET method to get the person
  router.get('/', async(req, res)=>{
    try {
      const data = await person.find();
      console.log('data fetched');
      res.status(200).json(data);
    } 
    catch (error) {
      console.log(error);
      req.status(500).json({error: 'Internal server error'});
    }
  });

  //paramerterised call of person work type
router.get('/:workType', async(req,res)=>{
    try {
      const workType = req.params.workType;
      if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
        const response = await person.find({work: workType});
        console.log('data fetched');
        res.status(200).json(response);
      }else{
        res.status(404).json({error:'Invalid work Type'});
      }
      
    } catch (error) {
      console.log(error);
      req.status(500).json({error:'Internal server error'})
    }
  });

  //update data
  router.put('/:id', async(req, res)=>{
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true,
            runValidators :true,
        })
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data fetched');
        res.status(200).json(response);


    } catch (error) {
        console.log(error);
        req.status(500).json({error:'Internal server error'})        
    }
  });

  //delete data 
  router.delete('/:id',async(req,res)=>{
    try {
        const personId = req.params.id;
        const response = await person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('data deleted');
        res.status(200).json({message:'Data deleted'});
        
    } catch (error) {
        console.log(error);
        req.status(500).json({error:'Internal server error'})
    }
  });

  module.exports = router;