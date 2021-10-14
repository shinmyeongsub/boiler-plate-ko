const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const {User} = require("./models/User");

//application/x-www-form=urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://shin:1234@boilerplate.ofxdu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    // 몽구스 6.0 부터는 기본으로 깔려 있는 옵션이기 때문에 더이상 지원하지 않음
    // userNewUrlParser : true, 
    // userUnifiedTopology:true, 
    // userCreateIndex:true, 
    // useFindAndModify:false
}).then(()=>console.log('MongoDB connected...'))
.catch(err =>console.log(err))


app.get('/', (req, res) => res.send('Hello Wolrd!'))

app.post('/register',(req,res)=>{

    // 회원 가입시 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    user.save((err,userInfo)=>{
        if(err) return res.json({success:false, err})
        return res.status(200).json({
            success:true
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))