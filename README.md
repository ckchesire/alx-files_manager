The following areas are covered in this project folder:

* Creating an API with Express.js
* User authentication
* MongoDB for persistent storage
* Redis for temporary data
* A background worker setup

---

# Express API with Authentication, MongoDB, Redis & Background Workers

This project demonstrates how to build a scalable and secure API using **Express.js**, with integrated **user authentication**, **MongoDB** for persistent storage, **Redis** for temporary storage (like sessions, tokens, or caching), and a **background worker** for asynchronous task processing.

## 📦 Features

- RESTful API built with **Express.js**
- **User authentication** with JWT
- Persistent storage using **MongoDB** (via Mongoose)
- Temporary storage using **Redis** (for session or token caching)
- **Background job processing** (e.g. email, image processing) via a worker queue

---

## Tech Stack

- **Node.js** & **Express**
- **MongoDB** & **Mongoose**
- **Redis**
- **JWT** for authentication
- **BullMQ** or **Kue** for background jobs (can be replaced with other queue systems like Agenda or Bee-Queue)


---

## User Authentication

* **Register**: `POST /api/auth/register`
* **Login**: `POST /api/auth/login`
* Returns a **JWT token** on successful login.
* Protected routes require the token in the `Authorization` header:
  `Authorization: Bearer <token>`

---

## Redis Usage

* Stores:

  * Session or token data
  * Temporary caches (e.g., OTPs, rate limits)
* Fast in-memory access, automatically expires based on TTL.

---

## Background Worker Setup

* Powered by **BullMQ** (uses Redis internally)
* Example job: send welcome emails, resize images, etc.
* Jobs are added in the main app and processed by `worker.js`.

Example usage:

```js
await emailQueue.add('welcome', { userId: newUser.id });
```

---

## 📁 Project Structure

```
.
├── controllers
│   ├── AppController.js
│   ├── FilesController.js
│   └── UsersController.js
├── README.md
├── routes
│   └── index.js
├── server.js
├── utils
│   ├── db.js
│   └── redis.js
└── worker.js
```

---

## API Endpoints (Sample)

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Register a new user     |
| POST   | `/api/auth/login`    | Login and get token     |
| GET    | `/api/profile`       | Get user profile (auth) |

---

## Running Tests

```bash
npm test
```

---

## TODO

* [ ] Add rate limiting middleware
* [ ] Add logging (Winston or Morgan)
* [ ] Write unit & integration tests
* [ ] Add Swagger API documentation

---

## 📄 License

This project is licensed under the MIT License.
