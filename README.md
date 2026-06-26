<div align="center">

<!-- Animated Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=24&height=200&section=header&text=🍽️%20La%20Maison%20d'Or&fontSize=42&fontAlignY=35&desc=Fine%20Dining%20Restaurant%20Website&descSize=18&descAlignY=55&animation=twinkling&fontColor=ffffff" width="100%"/>

<!-- Typing Animation -->
<img src="https://readme-typing-svg.demolab.com?font=Cormorant+Garamond&weight=400&size=20&pause=2000&color=C8A97E&center=true&vCenter=true&width=500&height=30&lines=Bon+App%C3%A9tit+%F0%9F%8D%B7" alt="Typing SVG" width="100%" />

<!-- Badges Row 1 -->
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Design-C8A97E?style=for-the-badge&logo=google-chrome&logoColor=white)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

<!-- Badges Row 2 -->
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Pages](https://img.shields.io/badge/Pages-4-C8A97E?style=flat-square)
![Status](https://img.shields.io/badge/Status-Complete-brightgreen?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)
![Maintained](https://img.shields.io/badge/Maintained-Yes-blue?style=flat-square)

<br/>

<p><em>A premium, fully responsive restaurant website featuring an interactive menu, online reservation system, theme toggle, and stunning animations — built with pure HTML, CSS & JavaScript.</em></p>

---

</div>

## ✨ Features at a Glance

<table>
<tr>
<td width="50%">

### 🎨 Design & UI
- 🌗 **Dark / Light Theme Toggle** with persistence
- 💫 **Scroll-triggered animations** (reveal, scale, slide)
- 🖱️ **Cursor glow effect** on desktop
- 🪟 **Glassmorphism** navbar with backdrop blur
- 📱 **Fully responsive** (mobile, tablet, desktop)
- ✨ **Micro-interactions** on hover, focus, and click
- 🎭 **Page loading screen** with branded spinner
- 🎯 **Parallax scrolling** effects

</td>
<td width="50%">

### ⚙️ Functionality
- 📋 **Interactive menu** with category filters
- 📅 **Reservation form** with real-time validation
- 📧 **Contact form** with field validation & toast alerts
- 🔢 **Animated counters** for statistics
- 📰 **Newsletter subscription** with email validation
- 🍔 **Mobile hamburger menu** with overlay
- 🗺️ **Map integration** placeholder
- 📊 **Success modals** for form submissions

</td>
</tr>
</table>

---

## 📄 Pages Overview

| Page | File | Description |
|------|------|-------------|
| 🏠 **Home** | `index.html` | Hero section, features, stats, signature dishes, parallax CTA, testimonials, gallery, newsletter |
| 🍽️ **Menu** | `menu.html` | Filterable menu categories (Appetizers, Mains, Desserts, Beverages) with prices and dietary tags |
| 📅 **Reservations** | `booking.html` | Full reservation form with validation, opening hours widget, private dining rooms showcase |
| 📬 **Contact** | `contact.html` | Contact form with validation, contact info cards, interactive FAQ section, map placeholder |

---

## 🏗️ Architecture

```mermaid
graph TB
    subgraph "📁 Project Structure"
        ROOT["🗂️ Restaurant-Website/"]
        HTML1["📄 index.html"]
        HTML2["📄 menu.html"]
        HTML3["📄 booking.html"]
        HTML4["📄 contact.html"]
        CSS_DIR["📁 css/"]
        CSS["🎨 style.css"]
        JS_DIR["📁 js/"]
        JS["⚡ main.js"]
        IMG_DIR["📁 images/"]
        README["📋 README.md"]
    end

    ROOT --> HTML1
    ROOT --> HTML2
    ROOT --> HTML3
    ROOT --> HTML4
    ROOT --> CSS_DIR --> CSS
    ROOT --> JS_DIR --> JS
    ROOT --> IMG_DIR
    ROOT --> README

    style ROOT fill:#1a1a1a,stroke:#c8a97e,color:#fff
    style HTML1 fill:#2d2d2d,stroke:#e34f26,color:#fff
    style HTML2 fill:#2d2d2d,stroke:#e34f26,color:#fff
    style HTML3 fill:#2d2d2d,stroke:#e34f26,color:#fff
    style HTML4 fill:#2d2d2d,stroke:#e34f26,color:#fff
    style CSS fill:#2d2d2d,stroke:#1572b6,color:#fff
    style JS fill:#2d2d2d,stroke:#f7df1e,color:#fff
    style IMG_DIR fill:#2d2d2d,stroke:#c8a97e,color:#fff
    style CSS_DIR fill:#1a1a1a,stroke:#1572b6,color:#fff
    style JS_DIR fill:#1a1a1a,stroke:#f7df1e,color:#fff
    style README fill:#2d2d2d,stroke:#44cc44,color:#fff
```

---

## 🔄 User Flow & Interaction Workflow

```mermaid
flowchart LR
    A["🏠 Landing Page"] --> B{"Navigation Choice"}
    B --> C["🍽️ Browse Menu"]
    B --> D["📅 Make Reservation"]
    B --> E["📬 Contact Us"]

    C --> C1["Filter by Category"]
    C1 --> C2["View Dishes & Prices"]
    C2 --> D

    D --> D1["Fill Reservation Form"]
    D1 --> D2{"Validation"}
    D2 -->|"✅ Pass"| D3["🎉 Success Modal"]
    D2 -->|"❌ Fail"| D4["⚠️ Show Errors"]
    D4 --> D1

    E --> E1["Fill Contact Form"]
    E1 --> E2{"Validation"}
    E2 -->|"✅ Pass"| E3["📧 Message Sent"]
    E2 -->|"❌ Fail"| E4["⚠️ Show Errors"]
    E4 --> E1

    style A fill:#c8a97e,color:#000,stroke:#8b6914
    style D3 fill:#2d8a4e,color:#fff,stroke:#1a5c32
    style E3 fill:#2d8a4e,color:#fff,stroke:#1a5c32
    style D4 fill:#c0392b,color:#fff,stroke:#922b21
    style E4 fill:#c0392b,color:#fff,stroke:#922b21
```

---

## 🎨 Design System

```mermaid
graph TD
    subgraph "🎨 Design Tokens"
        A["Color Palette"] --> A1["Primary: #c8a97e Gold"]
        A --> A2["Dark Theme: #0d0d0d"]
        A --> A3["Light Theme: #faf8f5"]

        B["Typography"] --> B1["Playfair Display — Headings"]
        B --> B2["Inter — Body Text"]
        B --> B3["Cormorant Garamond — Accents"]

        C["Spacing Scale"] --> C1["4px → 128px"]
        C["Spacing Scale"] --> C2["8-step scale"]

        D["Animation"] --> D1["Scroll Reveal"]
        D --> D2["Parallax"]
        D --> D3["Counter Animation"]
        D --> D4["Hover Micro-interactions"]
    end

    style A1 fill:#c8a97e,color:#000
    style A2 fill:#0d0d0d,color:#fff,stroke:#333
    style A3 fill:#faf8f5,color:#000,stroke:#ddd
```

---

## 🚀 Quick Start

### Prerequisites

No build tools required! This is a pure HTML/CSS/JS project.

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/Restaurant-Website-with-Menu-and-Booking.git

# Navigate to project directory
cd Restaurant-Website-with-Menu-and-Booking

# Open in your browser
# Option 1: Simply open index.html
start index.html

# Option 2: Use VS Code Live Server
code . && # Install Live Server extension → Right-click index.html → Open with Live Server

# Option 3: Use Python's built-in server
python -m http.server 8000
# Then visit http://localhost:8000
```

---

## 🗂️ Project Structure

```
Restaurant-Website-with-Menu-and-Booking/
│
├── 📄 index.html              # Home page — hero, features, gallery
├── 📄 menu.html               # Menu page — filterable dishes
├── 📄 booking.html            # Reservations — booking form
├── 📄 contact.html            # Contact — form & info
│
├── 📁 css/
│   └── 🎨 style.css           # Complete design system (~1400 lines)
│                                 ├── CSS custom properties (tokens)
│                                 ├── Light & Dark theme variables
│                                 ├── Component styles
│                                 ├── Animation keyframes
│                                 └── Responsive breakpoints
│
├── 📁 js/
│   └── ⚡ main.js              # Interactive functionality (~400 lines)
│                                 ├── Theme toggle + localStorage
│                                 ├── Scroll reveal (IntersectionObserver)
│                                 ├── Form validation engine
│                                 ├── Menu category filters
│                                 ├── Animated counters
│                                 ├── Parallax effect
│                                 ├── Mobile menu
│                                 └── Toast notifications
│
├── 📁 images/
│   ├── 🖼️ hero-bg.png          # Hero section background
│   ├── 🖼️ dish-appetizer.png   # Appetizer dish photo
│   ├── 🖼️ dish-main.png        # Main course photo
│   ├── 🖼️ dish-dessert.png     # Dessert photo
│   ├── 🖼️ interior.png         # Restaurant interior
│   └── 🖼️ chef.png             # Chef in action
│
└── 📋 README.md                # This file
```

---

## 🛠️ Technical Implementation

### CSS Architecture

| Feature | Implementation |
|---------|---------------|
| **Design Tokens** | CSS Custom Properties (`--color-*`, `--fs-*`, `--space-*`) |
| **Theme System** | `[data-theme="dark"]` attribute selector overrides |
| **Layout** | CSS Grid + Flexbox |
| **Responsive** | Mobile-first with `768px` and `1024px` breakpoints |
| **Animations** | `@keyframes` + `IntersectionObserver` trigger |
| **Glass Effect** | `backdrop-filter: blur()` with semi-transparent backgrounds |
| **Typography** | Google Fonts with `clamp()` fluid sizing |

### JavaScript Features

| Feature | API / Pattern |
|---------|---------------|
| **Scroll Reveal** | `IntersectionObserver` API |
| **Theme Persistence** | `localStorage` |
| **Form Validation** | Custom declarative engine with `data-validate` attributes |
| **Counters** | `requestAnimationFrame` with eased interpolation |
| **Parallax** | Scroll event + `getBoundingClientRect()` |
| **Toast System** | Dynamic DOM injection |
| **Mobile Menu** | CSS transform + JS toggle with overlay |
| **Cursor Glow** | `mousemove` + `requestAnimationFrame` lerping |

---

## 📱 Responsive Breakpoints

```
┌─────────────────────────────────────────────┐
│           Desktop (> 1024px)                │
│  ┌────────────────────────────────────────┐ │
│  │   3-column grids, full gallery,        │ │
│  │   side-by-side forms, cursor glow      │ │
│  └────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│           Tablet (769px – 1024px)           │
│  ┌────────────────────────────────────────┐ │
│  │   2-column grids, adjusted gallery,    │ │
│  │   compact footer layout                │ │
│  └────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│           Mobile (≤ 768px)                  │
│  ┌──────────────────┐                       │
│  │  Single column,  │                       │
│  │  hamburger menu, │                       │
│  │  stacked forms,  │                       │
│  │  reduced spacing │                       │
│  └──────────────────┘                       │
└─────────────────────────────────────────────┘
```

---

## 🌗 Theme Toggle

The website supports **Light** and **Dark** modes with smooth transitions:

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Background | `#faf8f5` warm cream | `#0d0d0d` deep black |
| Cards | `#ffffff` | `#1e1e1e` |
| Text | `#1a1a1a` | `#f0ece4` |
| Accent | `#c8a97e` gold | `#c8a97e` gold |
| Navbar | Glass blur (white) | Glass blur (dark) |

Theme preference is saved to `localStorage` and persists across sessions.

---

## ✅ Form Validation

Both forms support real-time validation with these rules:

```javascript
// Validation Rules (declarative via data-validate attribute)
data-validate="required"          // Field cannot be empty
data-validate="required, email"   // Must be valid email
data-validate="required, phone"   // Must be valid phone number
data-validate="required, date"    // Must be a future date
data-validate="required, min:10"  // Minimum 10 characters
```

**Validation UX Flow:**
1. ⏳ Validation triggers on `blur` (first interaction)
2. 🔄 Real-time validation on `input` (after first blur)
3. ✅ Green border for valid fields
4. ❌ Red border + error message for invalid fields
5. 🎉 Success modal on valid submission

---

## 🖼️ Image Optimization

| Technique | Implementation |
|-----------|---------------|
| **Lazy Loading** | `loading="lazy"` on below-fold images |
| **Eager Loading** | `loading="eager"` on hero/header images |
| **Dimensions** | Explicit `width`/`height` to prevent CLS |
| **Alt Text** | Descriptive `alt` attributes on all images |
| **Object Fit** | `object-fit: cover` for consistent aspect ratios |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m "feat: add amazing feature"

# 4. Push to the branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=24&height=120&section=footer&animation=twinkling" width="100%"/>

<br/>

**Made with ❤️ and ☕**

</div>
