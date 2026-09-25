# Arunika

Modern, lightweight, and responsive Admin Dashboard Template built with **Vue 3**, **Vite**, and **Tailwind CSS v4**.

Arunika uses pure semantic CSS utility classes (`@layer components`) and custom Vue 3 components without relying on heavy third-party UI component libraries.

---

## ✨ Features

- ⚡ **Vite 6 + Vue 3** (`<script setup>`, Composition API)
- 🎨 **Tailwind CSS v4** with native CSS nesting and `@layer components`
- 🧭 **File-based Routing** powered by `unplugin-vue-router`
- 🗂️ **Zero Bloat UI Architecture** — no heavy component frameworks (Vuetify, Element Plus, etc.)
- 🎯 **Semantic Component Utilities** (`.btn`, `.badge`, `.card`, `.accordion`, `.tab`, `.input-*`)
- 🛡️ **Comprehensive Form Validation States** (`error`, `success`, `warning`, `hint`) across all inputs
- 🎭 **Smooth CSS Grid Animations** for expandable Accordions and collapsible Sidebar
- 🪟 **Complete App Shell**: Collapsible sidebar navigation, mobile drawer backdrop, sleek custom scrollbar
- 📦 **Tabler Icons** (`@tabler/icons-vue`)

---

## 📂 Project Structure

```text
arunika/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── form/          # BaseInput, BaseSelect, BaseDatePicker, BaseFileInput, etc.
│   │   └── ui/            # BaseAccordion, BaseBadge, BaseTabs, BaseModal, BaseToast, etc.
│   ├── layouts/
│   │   ├── Navbar.vue
│   │   └── Sidebar.vue    # Collapsible sidebar with semantic navigation
│   ├── pages/             # File-based routes (Dashboard, Users, Forms, UI Components, Auth)
│   ├── App.vue
│   ├── main.js
│   └── style.css          # Design tokens & semantic component utilities
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Quick Start

### 1. Prerequisites

- **Node.js** >= 18.x
- **npm**, **pnpm**, or **yarn**

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/your-username/arunika.git

# Navigate to project directory
cd arunika

# Install dependencies
npm install
```

### 3. Development Server

Start Vite local development server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 4. Build for Production

Compile and bundle for deployment:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

---

## 🧩 Included Components & Pages

### 📄 Pages
| Route | Description |
|---|---|
| `/` | Dashboard metrics, charts placeholder, recent transactions |
| `/layouts` | Layout variations hub (Default Vertical, Horizontal, Horizontal Condensed, Boxed) |
| `/users` | User management table with search, filters, actions |
| `/form-elements` | Form controls showcase + interactive validation state tester |
| `/tables` | Simple, striped, bordered, and compact data tables |
| `/buttons` | Solid, outline, soft, ghost, icon buttons, and button groups |
| `/badges` | Soft, solid, outline badges, status dots, dismissible tags |
| `/tabs` | Bordered, pill, and boxed navigation tabs |
| `/accordion` | Single expand, multiple expand, card style, CSS grid animations |
| `/modals` | Confirm, alert, scrollable, and form modals |
| `/alerts` | Status banners with dismiss support |
| `/toasts` | Floating notifications with auto-dismiss timers |
| `/tooltips` | Positioned popups (top, bottom, left, right) |
| `/login`, `/register` | Authentication layouts |
| `/forgot-password`, `/reset-password` | Password recovery screens |
| `/settings` | Profile, security, and system preferences |

### 🛠️ Form Components (`src/components/form/`)
- `BaseInput.vue` — Text, email, password, prefix/suffix icons, validation states
- `BaseSelect.vue` — Searchable custom select dropdown
- `BaseDatePicker.vue` — Date & time picker input
- `BaseFileInput.vue` — File attachment upload
- `BaseCheckbox.vue` — Standard and array-bound checkboxes
- `BaseRadio.vue` — Radio options
- `BaseToggle.vue` — Toggle switch
- `BaseRange.vue` — Slider range input

### 🎨 UI Components (`src/components/ui/`)
- `BaseAccordion.vue` — Collapsible accordion with smooth animations
- `BaseBadge.vue` — Semantic chips with soft/solid/outline variants
- `BaseTabs.vue` — Tabbed navigation
- `BaseModal.vue` — Accessible modal dialogs with backdrop blur
- `BaseTable.vue` — Structured table wrapper
- `BaseAlert.vue` — Contextual alert boxes
- `BaseToast.vue` — Toast notification stack
- `BaseTooltip.vue` — CSS-driven tooltip helper

---

## 🎨 Styling & Theming

All reusable semantic classes live in `src/style.css` using Tailwind CSS v4 `@layer components`:

```css
/* Example: Custom Button Utility */
.btn {
  @apply inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold transition cursor-pointer;
}

/* Example: Validation States */
.input-error {
  @apply border-rose-500 text-rose-900 focus:border-rose-500 focus:ring-rose-500/20;
}
```

---

## 📄 License

MIT License. Free to use for personal and commercial projects.
