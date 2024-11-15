import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { getUsers } from '../database.js'
let router = Router()


let users = [
    { "username": "jk", "password": "sala",'token': ' '},
    {"username": "pl", "password": "pass",'token': ' '},// at the end add token 


]



router.post('/', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    let user;
   // console.log(req.body) // deleted after creating user
    if(user = users.find(a=>(a.username===username)&&(a.password===password))) {
        const token = jwt.sign({username: username}, 'my_secret_key', {
            expiresIn: '1h' // token valid time //reference token & access token .one is for reference the other one is for getting data
        }) //return access token to customer

        const refreshToken = jwt.sign({username: username}, 'my_secret_key', {
            expiresIn: '1d' 
        }) 

      /*res.cookie('refreshToken', refreshToken,{ httpOnly: true, sameSite: 'strict'})
        .header('Authorization','Bearer' +accesTtoken)
        .json({
            "username": username,
            "expires_in": "1h"
        });
      */  
        //first check user name & then check password
        user.token = token; // know now this token goes to that user
        res.json ({
            'name': 'home page',
            'access_token': token,
            'token_type': 'Bearer',
            'expires_in': '1h'


        });

    } else
        res.status(401).json ({"error": "Login Failed"});//when enter jk1 as user get 401 error in request sent
});

export default router;
