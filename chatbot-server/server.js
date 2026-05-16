import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.OPENROUTER_KEY;
const NEWS_BASE_URL = "https://sepehracademy.liara.run";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

app.use((req, res, next) => {
  next();
});

async function fetchNews() {
  try {
    const url = `${NEWS_BASE_URL}/News?PageNumber=1&RowsOfPage=20&SortType=insertDate&SortingCol=DESC`;

    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    return data?.news || [];
  } catch (err) {
    console.error(" خطا در GET اخبار:", err);
    return [];
  }
}

app.post("/api/chat", async (req, res) => {
  try {
    const userMessages = req.body.messages || [];
    const userQuestion = userMessages[userMessages.length - 1]?.content || "";

    const newsList = await fetchNews();

    console.log("NEWS", newsList);

    const messagesForModel = [
      {
        role: "system",
        content: `
تو یک دستیار فارسی هستی. با لحن رسمی ولی ساده جواب بده.
بر اساس اطلاعات زیر پاسخ بده:

${newsList} این آرایه داده ورودی هست:

در title هر خبر جستجو کن

قوانین:
- اگر خبر پیدا شد: عنوان + توضیح کوتاه + خلاصه‌ای از توضیح کامل را بگو.
- اگر خبر پیدا نشد: نزدیک ترین خبر مشابه را پیدا کن و به کاربر بگو.
- در غیر اینصورت یک خبر رندوم از آرایه ورودی انتخاب کن و همراه با تایتل و دیسکریپشن بگو
- در غیر اینطورت فقط جواب کاربر رو بصورت کاربردی بگو

این سوال کاربره: ${userQuestion}
        `,
      },
      ...userMessages,
    ];

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "ChatBot",
      },
      body: JSON.stringify({
        model: "z-ai/glm-4.5-air:free",
        messages: messagesForModel,
      }),
    });

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error(" خطا در چت:", err);
    return res.status(500).json({ error: "Timeout or server error" });
  }
});

app.get("/", (req, res) => res.send(" Chatbot server running"));

app.listen(PORT, () => console.log(` Server running at port ${PORT}`));
