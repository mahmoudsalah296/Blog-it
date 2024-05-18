const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes');
const commentRoute = require('./routes/commentRoutes');
const postRoute = require('./routes/postRoutes');
const categoryRoute = require('./routes/categoryRoutes');

const app = express();
const PORT = 5000;

app.use(express.json());

// app.get('/', (req, res) => {
//     res.json({message: 'hello world'}).status(200);
// });

app.use('/users', userRoute);
app.use('/posts', postRoute);
app.use('/comments', commentRoute);
app.use('/categories', categoryRoute);


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