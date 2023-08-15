import express from 'express'
import mongoose from 'mongoose'
import {faker} from '@faker-js/faker'
import cors from 'cors'


mongoose.connect('mongodb://localhost:27017',{
    dbName:'newsBackend'
})
.then(() => console.log("db connected"))
.catch((e) => console.log("error", e))

const newsSchema = new mongoose.Schema({
    author: String,
    title: String,
    description: String,
    url: String,
    imageUrl: String,
    imageUrlAvatar: String,
    publishedAt: Date,
    content: String,
  });
  
  const News = mongoose.model("News", newsSchema);


const app = express()

app.use(cors());

const generateDummyData = async () => {
    await News.deleteMany(); // Clear existing data
  
    const dummyData = [];
    for (let i = 0; i < 50; i++) {
      dummyData.push({
        author: faker.person.fullName(),
        title: faker.lorem.sentence(),
        description: faker.lorem.sentences(),
        url: faker.internet.url(),
        imageUrl: faker.image.urlLoremFlickr({ category: 'news' }),
        imageUrlAvatar: faker.image.avatar(),
        publishedAt: faker.date.past(),
        content: faker.lorem.paragraphs(),
      });
    }
  
    await News.insertMany(dummyData);
  };
  
  generateDummyData();
  
  // API endpoint to fetch news
  app.get("/api/news", async (req, res) => {
    try {
      const news = await News.find();
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });


app.listen(4000, () =>{
    console.log("first")
})