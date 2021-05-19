const express = require('express');
const router = express.Router();
const Task = require('../../models/Task');
const TaskValidator = require('../../validation/task_validation');

router.get('/', (req, res) => {
  Task.find()
    .sort({ timestamps: -1 })
    .then(tasks => {
      res.json(tasks)
    })
    .catch(err => {
      res.status(400).json({ errors: errors })
    })
})

router.post('/', (req, res) => {
  const { isValid, errors } = TaskValidator(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newTask = new Task({
    name: req.body.name,
    // achievedTimes: req.body.achievedTimes,
    color: req.body.color
  })
  //todo need to check if user already has today object and create/update it!
  newTask.save().then(task => res.json(task));
});

router.patch('/:id', (req, res) => {
  Task.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      achievedTimes: req.body.achievedTimes,
      color: req.body.color
    }, 
    { new: true }
  )
    .then(task => res.json(task))
    .catch((errors) => {
      res.status(400).json({ errors: errors });
    })
})

router.delete(
  '/:id',
  (req, res) => {
    Task.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          message: `task #${req.params.id} deleted.`
        })
      })
      .catch(err => {
        res.status(400).json({ errors: err })
      })
  }
);
module.exports = router;