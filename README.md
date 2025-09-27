# 🚀 UTaskify - Your Personal Task Management App

A modern, responsive task management application built with React and Vite. UTaskify helps you organize your daily tasks with an intuitive interface and beautiful animations.

![UTaskify Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-6.1.1-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-teal)

## ✨ Features

### 🎯 **Core Functionality**

- ✅ **Add Tasks** - Create tasks with descriptions
- ✅ **Edit Tasks** - Modify existing tasks inline
- ✅ **Delete Tasks** - Remove individual tasks or clear all
- ✅ **Mark Complete** - Toggle task completion status
- ✅ **Search Tasks** - Find tasks by content
- ✅ **Filter Tasks** - View all, completed, or pending tasks
- ✅ **Local Storage** - Data persists between sessions

### 📱 **Responsive Design**

- 🎨 **Mobile-First** - Optimized for all screen sizes
- 📱 **Mobile**: 1-column layout with touch-friendly interface
- 💻 **Tablet**: 2-column grid layout
- 🖥️ **Desktop**: 3-4 column grid layout
- 🎯 **Adaptive Typography** - Text scales perfectly across devices

### 🎨 **UI/UX Features**

- ✨ **Beautiful Animations** - Smooth transitions and hover effects
- 🌟 **Shiny Text Effects** - Eye-catching animated text elements
- 🎭 **Split Text Animation** - Character-by-character text reveals
- 🎨 **Modern Design** - Clean, minimalist interface
- 🌈 **Color-Coded Stats** - Visual task statistics
- 📊 **Real-time Counters** - Live task counts and progress tracking

## 🛠️ **Technologies Used**

- **Frontend**: React 18.2.0
- **Build Tool**: Vite 6.1.1
- **Styling**: Tailwind CSS 3.0+
- **Icons**: React Icons
- **Animations**: React Spring
- **Forms**: React Hook Form
- **Storage**: Local Storage API

## 🚀 **Getting Started**

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Muhammad-Uzair-2611/Utaskify.git
   cd Utaskify
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📱 **Responsive Breakpoints**

| Screen Size   | Breakpoint      | Layout        | Columns |
| ------------- | --------------- | ------------- | ------- |
| Mobile        | < 640px         | Single column | 1       |
| Tablet        | 640px - 1024px  | Two columns   | 2       |
| Desktop       | 1024px - 1280px | Three columns | 3       |
| Large Desktop | 1280px+         | Four columns  | 4       |

## 🎨 **Design System**

### Color Palette

- **Primary**: `#5C9967` (Green)
- **Secondary**: `#F0D1A8` (Light Orange)
- **Accent**: `#C4A49F` (Muted Brown)
- **Background**: `#FFFDD0` (Cream)
- **Text**: `#2D2D2D` (Dark Gray)

### Typography

- **Font Family**: Inter, system-ui, Avenir, Helvetica, Arial
- **Special Font**: Playwrite IT Moderna (for decorative text)

## 📁 **Project Structure**

```
UTaskify/
├── public/
│   ├── Logo.svg
│   ├── favicon.ico
│   └── manifest files
├── src/
│   ├── components/
│   │   ├── Addtask.jsx      # Main task management component
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── UserInfo.jsx     # User name input modal
│   │   ├── ShinyText.jsx    # Animated text component
│   │   ├── SplitText.jsx    # Character animation component
│   │   └── Task.jsx         # Individual task component
│   ├── App.jsx              # Main app component
│   ├── App.css              # App-specific styles
│   ├── index.css            # Global styles and utilities
│   └── main.jsx             # App entry point
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 **Deployment**

### Netlify (Recommended)

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects using the included `_redirects` file

### Other Platforms

- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use the included `deploy.sh` script
- **Any Static Host**: Upload the `dist` folder contents

## 🎯 **Usage Guide**

### Adding Tasks

1. Enter your name when first visiting the app
2. Type your task description in the input field
3. Click the "+" button or press Enter

### Managing Tasks

- **Complete**: Click the checkmark icon
- **Edit**: Click the edit icon, modify text, then click checkmark
- **Delete**: Click the trash icon
- **Search**: Use the search bar to find tasks by content
- **Filter**: Use the dropdown to view all, completed, or pending tasks

### Mobile Usage

- On mobile devices, tap the "+" button to open the task creation panel
- Use the full-screen form to add tasks
- Swipe and scroll through your tasks easily

## 🔧 **Customization**

### Adding New Features

1. Create new components in the `src/components/` directory
2. Import and use them in `App.jsx` or `Addtask.jsx`
3. Add responsive classes using Tailwind CSS

### Styling Changes

- Modify `src/index.css` for global styles
- Update `src/App.css` for app-specific styles
- Use Tailwind utility classes for component styling

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 **License**

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 **Author**

**Muhammad Uzair Shaikh**

- GitHub: [@Muhammad-Uzair-2611](https://github.com/Muhammad-Uzair-2611)
- Project: [UTaskify Repository](https://github.com/Muhammad-Uzair-2611/Utaskify.git)
- Portfolio: [My Portfolio](https://uzair-dev-portfolio.netlify.app/)

## 🙏 **Acknowledgments**

- React team for the amazing framework
- Vite team for the fast build tool
- Tailwind CSS for the utility-first CSS framework
- React Icons for the beautiful icon set
- React Spring for smooth animations

---

⭐ **Star this repository if you found it helpful!**

🔗 **Live Demo**: [UTaskify App](https://utaskify.netlify.app/)

📧 **Contact**: For questions or suggestions, please open an issue on GitHub.
