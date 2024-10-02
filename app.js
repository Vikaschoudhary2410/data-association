const express = require('express');
const app = express();
const userModel = require('./Models/user');
const postModel = require('./Models/post');

app.get('/', (req,res)=>{
    res.send('Hello');
})

app.get('/create/user', async (req,res) => {
    let user = await userModel.create({
        username: "Vikas Choudhary",
        erami: 'vkas24choudhary@gmail.com',
        age: 22,
    })

    res.send(user);
})

app.get('/create/post',async (req,res) => {
    let post = await postModel.create({
       postdata: 'airdopes',
       user: "66f7f1c5674f651da94dab4e",
    })
    
    let user = await userModel.findOne({
        _id: "66f7f1c5674f651da94dab4e",
    })

    console.log(user);

    if (!user) {
        return res.status(404).send({ error: "User not found" });
    }

    user.posts.push(post._id);
    await user.save();

    res.send({post, user});
})

app.listen(3000);