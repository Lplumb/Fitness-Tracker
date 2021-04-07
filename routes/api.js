const router = require("express").Router()
const { model } = require("mongoose")
const db = require("../models")

router.get("/api/workouts", function(req, res){
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ])
    .then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.put("/api/workouts/:id", function(req, res){
    db.Workout.findByIdAndUpdate(req.params.id, 
        {
            $push: {
                exercises: req.body
            }
        }
        )
    .then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post("/api/workouts", function(req, res){
    db.Workout.create({})
    .then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.get("/api/workouts/range", function(req, res){
    db.Workout.find().limit(7)
    .then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router