const express = require('express')
const app = express()
const port = 5000

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))