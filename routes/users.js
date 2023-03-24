const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// module
const { users } = require("../models");

router.post("/register", async (req, res) => {
    const { username, password, email, login_time, register_time, status } = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        users.create({
            username: username,
            password: hash,
            email: email,
            login_time: login_time,
            register_time: register_time,
            status: status
        })
    })

    res.json("success!");
})

router.post('/login', async (req, res) => {
    const { username, password, login_time } = req.body;

    const user = await users.findOne({ where: { username: username } })

    // await users.update(
    //     { login_time: login_time },
    //     { where: { id: user.id } }
    // )

    if (!user) {
        res.json("user doesn't exist");
    } else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) res.json({ error: "Wrong Username And Password Combination" });

            res.json({ username: user.username, status: user.status });
        });
    }
})

router.get("/", async (req, res) => {
    const usersData = await users.findAll();
    res.json(usersData);
})

router.get("/status/:username", async (req, res) => {
    const { username } = req.params;
    const userStatus = await users.findOne({ where: { username: username } })

    res.json(userStatus.status)
})

router.put('/block/:id', async (req, res) => {
    const { id } = req.params;

    await users.update(
        { status: false },
        { where: { id: id.split(',') } }
    )

}) 

router.put('/unblock/:id', async (req, res) => {
    const { id } = req.params;

    await users.update(
        { status: true },
        { where: { id: id.split(',') } }
    )

})

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    await users.destroy({ where: { id: id.split(',') } });

    res.json(id);
})

module.exports = router;