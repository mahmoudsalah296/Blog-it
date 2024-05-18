const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'hello world'}).status(200);
});

mongoose.connect(`mongodb://localhost:27017/blog_it`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () =>{
        console.log(`server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Database connection error:', err);
});