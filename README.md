Backend – Express + PostgreSQL

เซิร์ฟเวอร์ Backend สำหรับจัดการคำถามและคำตอบด้วย Express และเชื่อมต่อฐานข้อมูล PostgreSQL รองรับการสร้าง/อ่าน/แก้ไข/ลบ (CRUD) สำหรับตาราง `questions` และ `answers` 

<!-- Packages ที่ใช้ -->
Express
pg: เชื่อมต่อ DB PostgreSQL
dotenv: จัดการตัวแปรแวดล้อมจากไฟล์ `.env`
nodemom: ช่วย Restart Server ตรวจสอบการทำงานเมื่อมีการเปลี่ยนแปลงในไฟล์โค้ดที่ติดตามอยู่

<!-- ขั้นตอนการใช้งาน -->
1. ติดตั้ง dependency
npm install

2. ตั้งค่าไฟล์ `.env` ที่รากโปรเจกต์
POSTGRESQL_URI=postgres://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DB_NAME>

3. Run Server
npm start

- เซิร์ฟเวอร์จะทำงานที่พอร์ต `4000`
- ทดสอบสุขภาพระบบได้ที่ `GET /test` 

<!-- โครงสร้างโปรเจกต์ -->
app.mjs                    // ตั้งค่า Express app และแม็ปรูตหลัก
controllers/questions.mjs  // Business Logic สำหรับ questions/answers
routers/questions.mjs      // กำหนดเส้นทาง (routes) สำหรับ questions/answers
middleware/validation.mjs  // Middlewareตรวจสอบความถูกต้องของข้อมูล
utils/db.mjs               // การตั้งค่า PostgreSQL Connection Pool


***Base URL: `http://localhost:4000`***

**<!-- Questions -->**
- GET `/questions`
  - ดึงรายการคำถามทั้งหมด

- GET `/questions/search?title=...&category=...`
  - ค้นหาด้วย `title` และ/หรือ `category` (รองรับ partial match, ไม่ส่งบางพารามิเตอร์ได้)

- GET `/questions/:questionId`
  - ดึงคำถามตาม `id`

- POST `/questions`
  - สร้างคำถามใหม่
  - Validation: ต้องมี title, description (category ไม่บังคับ)

- PUT `/questions/:questionId`
  - อัปเดตคำถาม
  - Validation: ต้องมี title, description (category ไม่บังคับ)

- DELETE `/questions/:questionId`
  - ลบคำถาม(เมื่อลบคำถามคำตอบของคำถามนี้จะถูกลบไปด้วย)

<!-- Answers (Nested under a Question) -->
- POST `/questions/:questionId/answers`
  - เพิ่มคำตอบให้คำถามที่ระบุ
  - Validation: ต้องมี `content` และความยาวไม่เกิน 300 ตัวอักษร

- GET `/questions/:questionId/answers`
  - ดึงคำตอบทั้งหมดของคำถามที่ระบุ

- DELETE `/questions/:questionId/answers`
  - ลบคำตอบทั้งหมดของคำถามที่ระบุ

- POST `/questions/:questionId/votes`
  - เพิ่ม/ลด คะแนนvoteให้กับคำถาม

**<!-- Answers -->**
- POST `/answers/:answerId/votes`
  - เพิ่ม/ลด คะแนนvoteให้กับคำถาม



