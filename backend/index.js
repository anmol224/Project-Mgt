const express=require('express')
const env=require('dotenv').config();
const path=require('path')
const {graphqlHTTP}=require('express-graphql')
const port =process.env.PORT || 5000
const app=express();
const connectDb=require('./config/db')
const schema=require('./Schema/schema')
const colors=require('colors')
const cors=require('cors')
connectDb();
app.use(cors())
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:process.env.NODE_ENV=='development'
}))
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
  
}
app.listen(port ,() => console.log(`Listening on port ${port}`))