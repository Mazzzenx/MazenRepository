import mongoose from "mongoose";


const dbConnection = () => {
    mongoose
      .connect(process.env.DB_ONLINE_CONNECTION)
      .then((conn) => console.log(`Database connected on ${process.env.DB_ONLINE_CONNECTION}`))
      .catch((err) => console.log(` Database Error ${err}`));
}
// const uri = 'mongodb://127.0.0.1:27017/5g';
// const dbConnection =() =>{
//   mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch((error) => {
//   console.error('Error connecting to MongoDB:', error.message);
// });}


export default dbConnection
