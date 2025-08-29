const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 6969;

// Middle Ware // 
app.use(cors());
app.use(express.json())

app.get('/' , (req,res) => {
    req.send('Simple CRUD is Running');
})

app.listen(port,() => {
    console.log(`Simple CRUD is running on PORT :${port}`)
})