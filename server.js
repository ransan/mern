const server =  require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const app = server();

const dbUri = require('./config/keys').mongoURI;
console.log('dbUri', dbUri);
mongoose
.connect(dbUri , {useNewUrlParser: true})
.then(() => console.log('mangoDB ready'))
.catch(error => console.log(error));

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);
app.get('/healthCheck', (req, res) => {
   res.send('Hello world I am JS ');
});

const port = process.env.PORT || 5000 ;
app.listen(port, () => `server listens port ${port}`);
