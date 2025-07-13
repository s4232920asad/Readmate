# 📚 ReadMate – Personal Reading List Manager

**ReadMate** is a minimal web-based reading list tracker built using React and Firebase. It allows users to manage books they plan to read, are currently reading, or have completed. The goal was to create a focused, distraction-free tool for personal book tracking, designed for speed, usability, and clarity.

This project was developed as part of the **Software Engineering Resit Coursework** for the module `CSI_5_SFE` at LSBU.

---

## 🚀 Features

- 🔐 Secure user login via email/password (Firebase Auth)
- ➕ Add books with title, author, and status
- 🗂️ View all books with status (`To Read`, `Reading`, `Completed`)
- 🔁 Update reading status
- 🧹 Delete books from the list
- 🔍 Search by title/author
- 🎛️ Filter and sort books
- 📊 Dashboard overview with reading stats
- 🎨 Theme customization
- 📱 Responsive UI (mobile-friendly)

---

## 🔧 Tech Stack

| Area       | Technology                  |
|------------|-----------------------------|
| Frontend   | React + Vite + TypeScript   |
| Styling    | Tailwind CSS                |
| Auth       | Firebase Authentication     |
| Database   | Firestore (NoSQL)           |
| Hosting    | Firebase Hosting            |
| State Mgmt | useState / useEffect        |
| Versioning | Git + GitHub                |

---

## 🎥 Demo Video

https://youtu.be/dOb5uwr0xzQ?si=9esvJVWuwqf0kwtn

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- Firebase project configured (Auth + Firestore + Hosting)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/readmate.git
cd readmate

# Install dependencies
npm install

# Add your Firebase config
cp .env.example .env
# Fill in your Firebase credentials in .env

# Run the development server
npm run dev
