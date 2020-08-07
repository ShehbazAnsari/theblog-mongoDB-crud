const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/article')
const methodOverride = require('method-override')
const app = express()
const Article = require('./models/article')

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
  
},
console.log(`MongoDb is connected`)
)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))



app.get('/', async(req, res) => {
let articles =  await Article.find().sort({createdAt:'desc'})
  res.render('articles/index', { articles: articles })
})
app.use('/articles', articleRouter)
const PORT = 5000;
app.listen(PORT, () => console.log(`Port is Successfully running on ${PORT}`))