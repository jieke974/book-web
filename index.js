import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config()



const app = express();
app.use(cors());
app.use(express.json());

 // replace with your real key, keep secret!

// ✅ Backend route to securely call Google Books API
app.get("/api/books", async (req, res) => {
  const { q = "language grammar textbook", lang = "", startIndex = 0 } = req.query;

  try {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      q
    )}&langRestrict=${lang}&startIndex=${startIndex}&maxResults=20&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

app.get('/',(req,res)=>{
  res.sendFile(path.join(process.cwd(),'public','index.html'))
})



app.listen(3000, () => console.log("✅ BookVerse running at http://localhost:3000"));