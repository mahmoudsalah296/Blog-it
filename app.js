const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'hello world'}).status(200);
});

app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
});