const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const {User} = require("./models/User");

const config = require('./config/key');

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

app.post('/login',(req,res)=>{

    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user){
            return res.json({
                loginSurccess : false,
                message:"제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({loginSuccess:false, message : "비밀번호가 틀렸습니다." });
            
            // 비밀번호 까지 맞다면 토큰 생성
            user.generateToken((err,user) => {
                if(err) return res.status(400).send(err);

                // 토큰을 저장한다. 어디에 ? 쿠키, 로컬스토리지 등등
            
            })
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))