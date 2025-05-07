# Domain Control

---

## 📁 Project Structure

```

domain-control/
├── public/                # Static assets
├── src/
│   ├── constants/         # Reusable constants
│   ├── layout/            # App layout components
│   ├── modules/           # Feature modules (e.g., services, components)
│   ├── routes/            # Route definitions using TanStack Router
│   ├── styles/            # Tailwind or custom styles
│   ├── utils/             # Shared utility functions
│   ├── views/             # Top-level route pages
│   ├── env.ts             # Environment validation
│   └── main.tsx           # App entry point
├── .env.example           # Sample environment file
├── vite.config.js         # Vite config
├── tsconfig.json          # TypeScript config
└── package.json           # Dependencies & scripts

````

---

## ⚙️ Setup Instructions

### 1. Install dependencies

```bash
pnpm install
````

### 2. Configure Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

> The environment is validated at runtime using `@t3-oss/env-core`. The app will fail to start if required variables are missing or incorrectly formatted.

### 3. Start Development Server

```bash
pnpm dev
```

Runs the app locally on [http://localhost:3000](http://localhost:3000)

---

## 📦 Scripts

| Command            | Description                                |
| ------------------ | ------------------------------------------ |
| `pnpm dev`         | Start the development server               |
| `pnpm build`       | Build the project with Vite and TypeScript |
| `pnpm serve`       | Preview the production build               |
| `pnpm lint`        | Run ESLint                                 |
| `pnpm format`      | Run Prettier                               |
| `pnpm type-check`  | Run TypeScript with `--noEmit`             |
| `pnpm spell-check` | Check spelling using `cspell`              |
| `pnpm test`        | Run unit tests with Vitest                 |
| `pnpm check`       | Format and fix lint issues automatically   |

---

## 🧪 Tech Stack

* **React 19** – UI Library
* **Vite** – Lightning-fast build tool
* **TypeScript** – Type safety
* **Redux Toolkit** – Global state management
* **TanStack Router** – Type-safe routing
* **Zod** – Schema validation
* **nuqs** – URL query param state
* **Ant Design** – UI components
* **TailwindCSS** – Utility-first styling

---