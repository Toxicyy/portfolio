# 💼 Ivan Vysocinas - Portfolio

<div align="center">

![Portfolio Banner](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,14,18,20,24&height=250&section=header&text=Ivan%20Vysocinas&fontSize=80&fontAlignY=35&animation=fadeIn&fontColor=fff&desc=Full-Stack%20Developer%20%7C%20Creative%20Coder&descAlignY=55&descSize=18)

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&duration=3000&pause=1000&color=A855F7&center=true&vCenter=true&random=false&width=600&lines=Welcome+to+my+Portfolio!;Full-Stack+Developer;Building+Beautiful+Experiences;Let's+Create+Something+Amazing!)](https://git.io/typing-svg)

</div>

## 🚀 About This Project

Modern, animated portfolio website built with cutting-edge technologies. Features smooth animations, dark theme, and responsive design that works seamlessly across all devices.

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

</div>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 Design
- Modern dark theme with purple/pink gradients
- Smooth scroll animations
- Interactive hover effects
- Responsive mobile-first design
- Glass morphism effects

</td>
<td width="50%">

### ⚡ Performance
- Lightning-fast load times with Vite
- Optimized animations with Framer Motion
- Lazy loading images
- Code splitting
- SEO optimized

</td>
</tr>
</table>

## 📱 Sections

```mermaid
graph LR
    A[🏠 Home] --> B[👤 About]
    B --> C[⚡ Skills]
    C --> D[🚀 Projects]
    D --> E[📧 Contact]
    
    style A fill:#a855f7,stroke:#ec4899,stroke-width:2px,color:#fff
    style B fill:#a855f7,stroke:#ec4899,stroke-width:2px,color:#fff
    style C fill:#a855f7,stroke:#ec4899,stroke-width:2px,color:#fff
    style D fill:#a855f7,stroke:#ec4899,stroke-width:2px,color:#fff
    style E fill:#a855f7,stroke:#ec4899,stroke-width:2px,color:#fff
```

### 🏠 Hero Section
Eye-catching landing with animated text and gradient effects

### 👤 About Me
Personal introduction with tech stack showcase

### ⚡ Skills
Interactive skill cards with scroll-triggered animations
- Auto-animated on mobile when in viewport
- Hover effects on desktop
- Categorized by Frontend, Backend, Tools, etc.

### 🚀 Projects
Carousel showcase of featured projects
- Responsive slider (3 cards on desktop, 2 on tablet, 1 on mobile)
- Smooth animations
- Direct links to GitHub and live demos

### 📧 Contact
Functional contact form with EmailJS integration
- Real-time validation
- Beautiful toast notifications
- Direct email sending

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, TypeScript, Tailwind CSS |
| **Animation** | Framer Motion |
| **Build Tool** | Vite |
| **Email** | EmailJS |
| **Icons** | Lucide React |

</div>

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Toxicyy/portfolio

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Install EmailJS
npm install @emailjs/browser

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ⚙️ Configuration

### EmailJS Setup

1. Create account at [EmailJS](https://www.emailjs.com/)
2. Add your credentials in `ContactSection.tsx`:

```typescript
const serviceId = 'your_service_id';
const templateId = 'your_template_id';
const publicKey = 'your_public_key';
```

3. Create email template with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`

## 🎯 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Portfolio/
│   │   │   ├── AboutSection.tsx
│   │   │   ├── animations.ts
│   │   │   ├── constants.ts
│   │   │   ├── ContactSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── ProjectPage.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── ScrollReveal.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   └── StarField.tsx
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── index.ts
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       ├── Tabs.tsx
│   │       └── TextArea.tsx
│   ├── images/
│   ├── types/
│   │   └── types.ts
│   ├── CustomHooks.ts
│   ├── data.tsx
│   ├── index.css
│   ├── main.tsx
│   └── Portfolio.tsx
└── package.json
```

## 📊 Performance

<div align="center">

![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100%25-success?style=for-the-badge&logo=lighthouse)
![Performance](https://img.shields.io/badge/Performance-95+-green?style=for-the-badge)
![Accessibility](https://img.shields.io/badge/Accessibility-100-green?style=for-the-badge)
![Best Practices](https://img.shields.io/badge/Best_Practices-100-green?style=for-the-badge)
![SEO](https://img.shields.io/badge/SEO-100-green?style=for-the-badge)

</div>

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

<div align="center">

[![Email](https://img.shields.io/badge/Email-firstpicktinker%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:firstpicktinker@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-Toxicyy-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Toxicyy)
[![Telegram](https://img.shields.io/badge/Telegram-Bugzers-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/Bugzers)

</div>

---

<div align="center">

### ⭐ Star this repo if you like it!

![Profile Views](https://komarev.com/ghpvc/?username=Toxicyy&color=blueviolet&style=for-the-badge)

Made with 💜 by [Ivan Vysocinas](https://github.com/Toxicyy)

![Footer](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,14,18,20,24&height=100&section=footer)

</div>