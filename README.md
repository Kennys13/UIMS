<<<<<<< HEAD
# Lotus Valley School

Production-style school ERP with role-based portals for students, teachers, admissions, HR, and admins.

## Modules

- Public school homepage with hero slider, flash announcements, facilities, and contact section
- Student portal with attendance charts, results, fee status, notices, leave workflow, and profile management
- Teacher portal with student roster, leave approvals, marks upload flow, announcements, and profile access
- Admission portal with student onboarding, admission record management, and profile access
- HR portal with teacher/staff management, role operations, and profile access
- Super admin portal with separate login, analytics, banner/announcement controls, website configuration, and user governance

## Stack

- Frontend: Next.js 15, React 19, Tailwind CSS v4, Framer Motion, Recharts
- Backend: Node.js, Express, TypeScript
- Data: MongoDB-ready Mongoose models plus rich dummy data for immediate demo use
- Auth: JWT + role-based access control
- Security: bcrypt password hashing, CAPTCHA verification hook, rate limiting, helmet, protected routes
- Uploads and notifications: Multer / Cloudinary-ready avatar uploads, Nodemailer-ready mail hooks
- Workspace: PNPM workspaces + Turborepo

## Repository Layout

```text
lotus-valley-school
|-- apps
|   |-- web
|   |   |-- app
|   |   |-- components
|   |   |-- services
|   |   `-- styles
|   `-- api
|       |-- src
|       |   |-- config
|       |   |-- controllers
|       |   |-- data
|       |   |-- middleware
|       |   |-- models
|       |   |-- routes
|       |   |-- services
|       |   `-- utils
|-- packages
|-- configs
`-- README.md
```

## Setup

1. Install dependencies:

```powershell
corepack pnpm install --store-dir .pnpm-store
```

2. Copy environment examples:

```powershell
Copy-Item apps\web\.env.example apps\web\.env.local
Copy-Item apps\api\.env.example apps\api\.env
```

3. Start the web app and API:

```powershell
corepack pnpm dev
```

4. Open:

- Web: `http://localhost:3000`
- API: `http://localhost:4000`

## Demo Accounts

All demo accounts use the password `Password@123`.

- Student: `student@lotusvalley.test`
- Teacher: `teacher@lotusvalley.test`
- Admission: `admission@lotusvalley.test`
- HR: `hr@lotusvalley.test`
- Admin: `admin@lotusvalley.test`

## Environment Variables

### `apps/web/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
```

### `apps/api/.env`

```env
PORT=4000
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=lotus-valley-secret-key
JWT_EXPIRES_IN=8h
MONGO_URI=mongodb://127.0.0.1:27017/lotus-valley-school
RECAPTCHA_SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
MAIL_HOST=
MAIL_PORT=587
MAIL_USER=
MAIL_PASS=
MAIL_FROM=noreply@lotusvalley.local
```

Notes:

- CAPTCHA works in demo mode when reCAPTCHA keys are empty and the demo token `demo-pass` is used.
- Add Google reCAPTCHA site and secret keys in production to enforce live CAPTCHA validation.
- Add Cloudinary and SMTP credentials to enable real avatar uploads and email delivery.

## API Surface

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/profile/me`
- `PUT /api/profile/me`
- `POST /api/profile/change-password`
- `GET /api/dashboard/me`
- `GET /api/users`
- `POST /api/users`
- `PATCH /api/users/:id/status`
- `DELETE /api/users/:id`
- `GET /api/attendance/:studentId?`
- `POST /api/attendance/mark`
- `GET /api/leaves`
- `POST /api/leaves`
- `PATCH /api/leaves/:id`
- `GET /api/results/:studentId?`
- `POST /api/results`
- `GET /api/content/public`
- `GET /api/content/announcements`
- `POST /api/content/announcements`
- `GET /api/content/banners`
- `POST /api/content/banners`
- `PUT /api/content/site`
- `GET /api/analytics/overview`

## Verification

- Workspace typecheck passes with `corepack pnpm typecheck`

## Notes

- The app currently uses rich seeded dummy data so it works end-to-end immediately.
- Mongoose models are included and the environment is prepared for connecting to a real MongoDB database as the next step.
=======
# UIMS
>>>>>>> 5d23db54c111df0ee9514935aa3f1e73224f5edb
