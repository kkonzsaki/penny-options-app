const express = require('express');
const app = express();
app.get('/', (req,res)=>res.send('Penny Options Scout Backend Running'));
app.listen(process.env.PORT || 3000);
