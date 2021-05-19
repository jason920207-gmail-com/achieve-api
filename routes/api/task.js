const express = require('express');
const router = express.Router();
const Task = require('../../models/Task');
const DateObj = require('../../models/Date');
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

//* add achieved time to task
router.patch(
  '/add/:id',
  (req, res) => {
    const today = new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    DateObj.find({ date: date })
      .then(dates => {
        // console.log(dates);
        if (dates.length === 0) {
          const newDateObj = new DateObj({
            date: date,
            tasks: {
              [`${req.params.id}`]: 1
            }
          })
          newDateObj.save()
            .then(
              dateObj => console.log(dateObj)
            )
            .catch(err => console.log(err));
        } else {
          // console.log(dates[0])
          const currDateObj = dates[0];
          // currDateObj.tasks[req.params.id] = currDateObj.tasks[req.params.id] + 1;
          const taskNumDoneToday = currDateObj.tasks.get(`${req.params.id}`)
          console.log("taskNumDoneToday", taskNumDoneToday)
          currDateObj.tasks.set(`${req.params.id}`, taskNumDoneToday + 1)
          console.log("task", currDateObj.tasks)
          currDateObj.save()
            .then(dateObj => console.log(dateObj))
            .catch(err => console.log(err));
        }
      })


    Task.findById(req.params.id)
      .then((task) => {
        task.achievedTimes++;
        task.save()
          .then(
            task => {
              res.status(200).json(task)
            }
          )
          .catch(
            err => res.status(400).json({ errors: err })
          )
      })
      .catch(errors => {
        res.status(400).json({ errors: errors })
      })
  }
);

module.exports = router;