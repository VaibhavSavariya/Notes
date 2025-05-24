# Notes App

A full-stack Notes application built with **Next.js App Router**, **NextAuth.js** for authentication, and **MongoDB** for data storage. Users can register, log in, create, edit, and delete notes. Notes are stored in localStorage for quick access and demo purposes.

---

## Features

- User authentication (Sign Up, Login, Sign Out) with NextAuth.js
- Protected routes using middleware
- Create, edit, and delete notes
- Notes pagination (4 per page)
- Responsive UI with Tailwind CSS
- LocalStorage for note persistence (demo)
- Server-side and client-side validation
- Clean, modern UI

---

## Folder Structure

```
src/
  app/
    (auth)/
      login/
        page.jsx         # Login page with validation
      signup/
        page.jsx         # Signup page with validation
    (main)/
      create-note/
        page.jsx         # Create note page (localStorage)
      dashboard/
        page.jsx         # Dashboard with notes list, pagination, edit/delete
      edit-note/
        [id]/
          page.jsx       # Edit note page (localStorage)
    api/
      auth/
        [...nextauth]/
          route.js       # NextAuth API route handler
    components/
      Header/
        page.jsx         # Header with auth-aware nav and sign out
      Footer/
        page.jsx         # Footer
    utils/
      connectdb.js       # MongoDB connection utility
      userActions.js     # User actions (login, register)
    globals.css          # Tailwind CSS and global styles
    layout.js            # Root layout with SessionProvider
    page.js              # Landing page
  context/
    AuthProvider.jsx     # (If used) Auth context
  models/
    userModel.js         # Mongoose user model
auth.js                  # NextAuth configuration and handlers
auth.config.js           # Auth config (pages, callbacks, etc.)
middleware.js            # Route protection middleware
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/notes-app.git
cd notes-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_AUTH_SECRET=your_nextauth_secret
```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Authentication

- Uses **NextAuth.js** with **Credentials Provider**.
- Auth logic is in [`auth.js`](auth.js) and [`auth.config.js`](auth.config.js).
- API route for NextAuth is at [`src/app/api/auth/[...nextauth]/route.js`](src/app/api/auth/[...nextauth]/route.js).
- Session is provided globally via `SessionProvider` in [`layout.js`](src/app/layout.js).

---

## Notes Functionality

- Notes are stored in `localStorage` for demo purposes.
- Create, edit, and delete notes from the dashboard.
- Pagination is implemented (4 notes per page).
- All note actions update `localStorage` and UI in real-time.

---

## Middleware

- [`middleware.js`](middleware.js) protects routes like `/dashboard`, `/settings`, `/profile`.
- Redirects unauthenticated users to `/login`.

---

## UI

- Built with **Tailwind CSS**.
- Responsive and accessible.
- Header and Footer components included.

---

## Customization

- To use a real database for notes, replace localStorage logic in note pages with API/database calls.
- Update the MongoDB URI and NextAuth secret in your `.env.local`.

---

## License

MIT

---

## Credits

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
