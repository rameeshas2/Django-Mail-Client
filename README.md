# 📧 Mail — Single-Page Email Client

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)
![Django](https://img.shields.io/badge/Django-Framework-092E20?style=for-the-badge&logo=django)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple?style=for-the-badge&logo=bootstrap)

A single-page email client built with **Django** and **JavaScript** as part of **CS50's Web Programming with Python and JavaScript (Project 3: Mail)**. The application uses asynchronous Fetch API requests to send emails, browse mailboxes, archive messages, and reply to emails without reloading the page.

---

# 📌 Project Overview

Mail is a Single-Page Application (SPA) that communicates with a Django backend through RESTful API endpoints. Instead of loading multiple pages, JavaScript dynamically updates the user interface using asynchronous requests and DOM manipulation, creating a smooth and responsive email experience.

The project demonstrates modern frontend development concepts including asynchronous programming, API communication, event-driven interfaces, and dynamic rendering.

---

# ✨ Features

### 👤 User Authentication

- User Registration
- Login
- Logout

---

### 📩 Compose Email

- Send emails
- Multiple recipients
- Subject field
- Message body

---

### 📥 Mailboxes

- Inbox
- Sent
- Archive

---

### 📖 Email Viewer

- View complete email details
- Display sender, recipients, subject, timestamp, and body
- Automatically mark emails as read

---

### 📦 Archive Management

- Archive emails
- Remove emails from archive
- Dynamic archive toggle

---

### ↩️ Reply Functionality

- Reply to emails
- Auto-fill recipient
- Automatically prepend **Re:** to subjects
- Include quoted original message

---

### ⚡ Single-Page Experience

- No page reloads
- Dynamic DOM updates
- Fast mailbox switching
- Smooth user experience

---

# 🛠️ Technologies Used

- JavaScript (ES6+)
- Fetch API
- HTML5
- CSS3
- Bootstrap
- Django
- SQLite3
- Python 3

---

# ⚙️ Application Workflow

```text
Login
   │
   ▼
Inbox
   │
   ├────────► Compose Email
   │
   ├────────► Sent Mailbox
   │
   ├────────► Archive
   │
   └────────► Open Email
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
    Archive Email          Reply Email
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/your-username/Mail-SPA-Email-Client.git
```

---

## Navigate to Project

```bash
cd Mail-SPA-Email-Client
```

---

## Install Dependencies

```bash
pip install django
```

---

## Apply Database Migrations

```bash
python manage.py migrate
```

---

## Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

---

## Run the Development Server

```bash
python manage.py runserver
```

Open your browser:

```
http://127.0.0.1:8000/
```

---

# 📄 Application Pages

### 📥 Inbox

Displays all received emails.

---

### 📤 Sent Mail

Displays emails sent by the user.

---

### 📦 Archive

Displays archived emails.

---

### ✍️ Compose

Create and send a new email.

---

### 📖 Email Detail

Displays:

- Sender
- Recipients
- Subject
- Timestamp
- Email body
- Archive button
- Reply button

---

# 🔄 REST API Operations

The application communicates with the backend using asynchronous Fetch API requests.

### GET

- Load mailboxes
- View email details

### POST

- Send new emails

### PUT

- Mark emails as read
- Archive or unarchive emails

---

# 📂 Project Structure

```text
Mail-SPA-Email-Client/
│
├── mail/
│   ├── migrations/
│   │   └── 0001_initial.py
│   │
│   ├── static/
│   │   └── mail/
│   │       ├── inbox.js          # Single-Page Application logic
│   │       └── styles.css        # Custom mailbox styling
│   │
│   ├── templates/
│   │   └── mail/
│   │       ├── inbox.html        # Main SPA interface
│   │       ├── layout.html       # Base layout
│   │       ├── login.html        # Login page
│   │       └── register.html     # Registration page
│   │
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│   └── __init__.py
│
├── project3/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   ├── wsgi.py
│   └── __init__.py
│
├── manage.py
├── db.sqlite3
└── README.md
```


Display them like:

## Inbox

<img width="1902" height="733" alt="image" src="https://github.com/user-attachments/assets/e1bc2c06-77f4-4e23-ae41-29b0fb636a90" />

## Compose Email

<img width="1742" height="843" alt="image" src="https://github.com/user-attachments/assets/fca3f798-ee0c-4db5-af33-d902f43b21d0" />

## Email Details

<img width="1679" height="761" alt="image" src="https://github.com/user-attachments/assets/19c9c640-7a69-4c81-aea9-b0b9fcd2bffe" />

## Archive

### unread email marked pink and white shadow, read email marked as grey
<img width="1843" height="833" alt="image" src="https://github.com/user-attachments/assets/0f131ee5-53a6-49b5-9ed2-f7d42d8696ef" />

<img width="1739" height="678" alt="image" src="https://github.com/user-attachments/assets/7dcb3177-3429-49c3-8513-16a608717da7" />



```

---

# 📚 Learning Outcomes

This project demonstrates practical experience with:

- JavaScript ES6+
- Fetch API
- Asynchronous Programming
- REST API Integration
- DOM Manipulation
- Event Handling
- Single-Page Applications (SPA)
- Dynamic UI Rendering
- Django Backend Integration
- Responsive Web Design

---

# 🎓 Course Information

**Course:** CS50's Web Programming with Python and JavaScript

**Project:** Project 3 – Mail

---

# 👩‍💻 Author

**Rameesha Shahid**

Software Engineering Student

**Areas of Interest**

- Artificial Intelligence
- Machine Learning
- Full-Stack Web Development
- UI/UX Design
- Cybersecurity

---

# 🙏 Acknowledgements

Developed as part of **CS50's Web Programming with Python and JavaScript** offered by Harvard University.

---

# 📄 License

This project was created for educational purposes as part of the CS50 Web Programming course.
