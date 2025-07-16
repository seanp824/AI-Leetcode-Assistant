# 💡 LeetCode Assistant

**LeetCode Assistant** is a Chrome extension that helps you solve coding problems on [LeetCode](https://leetcode.com) — without giving away the full solution.

It integrates with the OpenAI API to generate **progressive, context-aware hints** based on:  
✅ the problem description  
✅ your current code (optional, pasted into the extension popup)

This assistant is designed to help you **learn, debug, and improve** — guiding you from vague hints to detailed explanations only when you need them.

---

## ✨ Features

- 🧠 Progressive hints: vague at first, more detailed on each request  
- 📋 Optional user code input for context-aware guidance  
- 🔗 Seamless integration on any LeetCode problem page  
- 💬 Uses OpenAI API (GPT-4 or GPT-3.5) for high-quality explanations  
- 🎨 Clean, user-friendly popup interface

---

## 🚀 How to Install & Use

1️⃣ **Clone the repo**
```bash
git clone https://github.com/seanp824/AI-Leetcode-Assistant.git
```

2️⃣ **Open in Chrome**
- Go to `chrome://extensions`  
- Enable **Developer mode** (top right)  
- Click **Load unpacked** → select the `AI-Leetcode-Assistant` folder

3️⃣ **Get an OpenAI API key**
- Go to https://platform.openai.com/account/api-keys  
- Create an API key and paste it into `content.js`:
```js
const OPENAI_API_KEY = 'sk-...';
```

4️⃣ **Use on LeetCode**
- Go to any LeetCode problem page  
- Click the extension icon  
- Paste your current code (optional)  
- Click **Get Another Hint**  
- Watch hints appear above the problem description!

---

## 🛠 Technologies Used

- JavaScript (Chrome Extensions API)  
- HTML, CSS  
- OpenAI API (GPT-4 / GPT-3.5)  
- LeetCode web integration

---

## 💡 Future Improvements

- 🌙 Dark mode  
- ⏳ Hint history panel  
- 🧪 Auto-detect user code from editor  
- 🛍️ Publish on Chrome Web Store

---

## ⚠️ Disclaimer

This project is for **educational purposes only**. It does not provide official LeetCode solutions and is intended to assist users in learning and debugging.

---
