# CodeWinder 

**CodeWinder** is a comprehensive platform designed for developers to connect, compete, and collaborate. It serves as a central hub for coding enthusiasts to form teams, participate in global chats, solve problems, and share knowledge through blogs.

##  Features

###  World Chat
A real-time global chat interface where developers from around the world can discuss topics, share ideas, and network instantly.
- *Powered by real-time database updates.*

###  Team Management
Easily create or join coding teams for hackathons and projects.
- **Create Teams:** distinct team names and descriptions.
- **Join Teams:** Seamless joining process with invite codes.
- **Team Dashboard:** Manage members and collaborate effectively.

###  Q&A Platform
A dedicated space for solving programming doubts.
- **Ask Questions:** detailed problem descriptions with code blocks.
- **Community Answers:** Get solutions from other users.
- **Vote System:** Upvote helpful answers to bubble up the best solutions.

###  Contests
Stay updated with the latest coding contests and hackathons.
- View active and upcoming contests.
- Direct links to participation platforms.

###  Developer Blog
A built-in blogging system for sharing tutorials, experiences, and tech news.
- Read and write articles.
- Rich text support for engaging content.

###  Secure Authentication
Robust authentication system powered by **Better Auth**.
- **Social Login:** Sign in instantly with **Google** or **GitHub**.
- **Profile Management:** Customize your user profile with avatars and bio.

---

##  Tech Stack

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [Shadcn UI](https://ui.shadcn.com/) & [Lucide React](https://lucide.dev/)
* **Database:** [PostgreSQL](https://www.postgresql.org/) (via Supabase)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Authentication:** [Better Auth](https://www.better-auth.com/)

---

##  Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/codewinder.git](https://github.com/your-username/codewinder.git)
cd codewinder
```
```bash
npm install
```
## 3. Configure Environment Variables

#### Database (Supabase)
DATABASE_URL="your-transaction-connection-string"
DIRECT_URL="your-session-connection-string"

#### Authentication (Better Auth)
BETTER_AUTH_SECRET="generate-a-random-secret"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

#### OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

### 4. Setup Database
```bash
npx prisma db push
```

### 5. Run the Development Server

```bash
npm run dev
```

### Contributors

This project was passionately built by:

Shivam Baheti

Siddhant Lahoti

Soham Purao

Yuv Mukhi

Yadanesh Bhatakar
