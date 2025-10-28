# **HNG 13 – Stage 2: Multi-Framework Ticket Web App (Twig Implementation)**

This is the **Twig version** of the Stage 2 challenge in the multi-framework ticket system (React, Vue.js, Twig).
It mirrors the UX and feature set of the other implementations while using **Twig templates + vanilla JavaScript** with **localStorage** for persistence.

---

## **Live Demo**

**Live Site:** [https://hng-stage2-twig-deeyah-production.up.railway.app](https://hng-stage2-twig-deeyah-production.up.railway.app)
**Repository:** [https://github.com/Fasina-ayomikun/HNG13-Stage2-Twig](https://github.com/Fasina-ayomikun/HNG13-Stage2-Twig)

---

## **Requirements**

* PHP 8.0+
* Composer
* A basic PHP web server (built-in `php -S` is fine)

---

## **Setup & Run**

### 1) Clone

```bash
git clone <YOUR_TWIG_REPO_URL>
cd <PROJECT_FOLDER>
```

### 2) Install Twig

If the project doesn’t already include Twig:

```bash
composer require twig/twig
```

### 3) Run locally

If your public root is `public/`:

```bash
php -S localhost:8000 -t public
```

Open: **[http://localhost:8000](http://localhost:8000)**

> If your entry file is not in `public/`, use the folder that contains your `index.php`.

---

## **Project Structure**

```
project-root/
│
├── public/                     # Web root (served folder)
│   ├── index.php               # Boots Twig and renders pages
│   └── assets/
│       ├── css/                # Styles
│       ├── js/
│       │   ├── tickets.js      # window.Tickets store (CRUD via localStorage)
│       │   └── app.js          # Page-specific scripts
│       └── images/             # Favicon, logos, etc.
│
└── templates/
    ├── _layouts/
    │   └── base.twig           # Global HTML head/body shell
    ├── _partials/              # Reusable partials (filter chip, form, footer, etc.)
    └── pages/
        ├── landing.twig
        ├── auth/
        │   ├── login.twig
        │   └── signup.twig
        ├── dashboard.twig
        └── tickets.twig
```

**Minimal `public/index.php` example (if needed):**

```php
<?php
require_once __DIR__ . '/../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/../templates');
$twig   = new \Twig\Environment($loader, ['cache' => false]);

echo $twig->render('pages/landing.twig', []);
```

---

## **Add a Favicon**

In `templates/_layouts/base.twig`, inside `<head>`:

```twig
<link rel="icon" type="image/png" href="/assets/images/favicon.png">
```

Add more sizes only if you have the files; otherwise, keep it simple.

---

## **Tech Stack**

| Category   | Tools                                      |
| ---------- | ------------------------------------------ |
| Templating | Twig                                       |
| Runtime    | PHP                                        |
| Frontend   | Vanilla JavaScript + CSS                   |
| Storage    | `localStorage` (tickets, session)          |
| Routing    | Minimal PHP routing or a single entry file |

---

## **Core Features (Twig Version)**

### Landing Page

* Hero, CTAs (Login / Get Started), features section, social proof, and footer
* Decorative shapes and wavy background
* Responsive layout up to 1440px max width

### Authentication

* Login and Signup pages with basic validation
* Show/Hide password toggle
* Simulated session via `localStorage` key (e.g., `ticketapp_session`)
* Protected routes for dashboard and tickets

### Dashboard

* Summary counts for total, open, in-progress, closed
* Quick actions (create ticket, view tickets, logout)

### Ticket Management (CRUD)

* Create, View, Edit, Delete tickets
* Validation for required fields (`title`, `status`)
* Filter chips (all/open/in_progress/closed) and search by title
* Accessible modal form (labels, aria attributes)
* Toast notifications for feedback

---

## **How Data Works**

`public/assets/js/tickets.js` exposes a global API:

```js
window.Tickets = {
  getTickets(), setTickets(list),
  createTicket(data), updateTicket(id, data),
  deleteTicket(id), statusCounts(list)
};
```

* Stored in browser `localStorage` under a single key
* Timestamps tracked for updated items
* Used by `tickets.twig` to render and hydrate the UI

---

## **Accessibility**

* Semantic HTML in templates (`main`, `section`, headings)
* Labels connected to inputs
* Focus states visible and keyboard navigable
* Modals use `role="dialog"` and `aria-modal="true"`

---

## **Design & Responsiveness**

* Grid + Flexbox layouts
* Max width container at 1440px
* Mobile-first CSS with media queries grouped at the end
* Consistent styles across landing, auth, dashboard, and tickets

---

## **Example Test Credentials**

```
Email: demo@deetickets.dev
Password: 123456
```

---

## **Deployment**

### Option 1: Render (easy PHP hosting)

1. Push your repo to GitHub.
2. Create a **Web Service** on Render.
3. Set:

   * Build Command: `composer install --no-dev`
   * Start Command: `php -S 0.0.0.0:10000 -t public`
4. Add a health check path like `/`.
5. Deploy and grab the live URL.

### Option 2: Shared PHP Hosting (e.g., Hostinger)

* Upload the project.
* Point the document root to the `public/` folder.
* Ensure `vendor/` is present (upload or run Composer on server).

### Option 3: VPS

* Install PHP and Nginx/Apache.
* Point the server root to `public/`.
* Deploy via Git or SFTP; run `composer install`.

> Static hosts (Netlify/Vercel) require pre-rendering Twig to HTML. If you need that workflow, create a small build script that renders Twig views to `.html` files and deploy the output folder.

---

## **Implementation Coverage**

| Section        | Requirement                                        | Status |
| -------------- | -------------------------------------------------- | ------ |
| Landing Page   | Hero + CTA + Footer                                | ✅      |
| Authentication | Validation + Session Storage + Toggle Password     | ✅      |
| Dashboard      | Stats + Nav + Logout                               | ✅      |
| Ticket CRUD    | Create, View, Edit, Delete + Validation + Feedback | ✅      |
| Responsiveness | Mobile, Tablet, Desktop                            | ✅      |
| Accessibility  | Semantic + Focus + ARIA                            | ✅      |
| Documentation  | This README section                                | ✅      |

