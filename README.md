# Luis Felipe Tobar Sotelo - Professional Portfolio

This repository contains the source code for the professional portfolio website of Luis Felipe Tobar Sotelo. It is designed as a modern, responsive, and interactive single-page application (SPA) to showcase expertise in Mechatronics Engineering, Artificial Intelligence, and Computer Vision.

## Features

- **Dual Language Support**: Complete localization for English and Spanish speakers, swappable in real-time.
- **Dynamic Content Rendering**: All portfolio content (projects, experience, skills) is driven by a centralized data structure, allowing for easy updates without modifying the UI components.
- **Interactive Media Galleries**: Custom-built image and video viewers allow for detailed inspection of project artifacts.
- **Responsive Design**: Fully optimized layout that adapts seamlessly to desktops, tablets, and mobile devices.
- **Dark Mode UI**: A professional, dark-themed user interface designed for visual comfort and modern aesthetics.

## Technical Architecture

The project is built using a modern frontend stack focusing on performance, type safety, and maintainability.

- **React (Vite)**: Utilized for high-performance rendering and rapid development tooling.
- **TypeScript**: Ensures code reliability through static typing, particularly for the complex data structures used in the resume content.
- **Tailwind CSS**: Provides a utility-first approach to styling, managing the design system, responsiveness, and complex animations.
- **Lucide React**: Used for consistent, lightweight, and scalable vector iconography.

## Project Structure

- **src/components**: Contains reusable UI components such as the Sidebar, Project Cards, Experience Items, and Modals.
- **src/constants.tsx**: The core data file containing all text content, links, media assets, and configuration for both languages.
- **src/types.ts**: TypeScript definitions that enforce the structure of the resume data, ensuring consistency across the application.
- **src/App.tsx**: The main application entry point that orchestrates the layout and state management.

## Getting Started

### Prerequisites

Ensure that Node.js (version 16 or higher) is installed on your system.

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the necessary dependencies:

   ```bash
   npm install
   ```

### Development

To start the local development server with hot-reloading:

```bash
npm run dev
```

### Building for Production

To create an optimized static build for deployment:

```bash
npm run build
```

The output will be generated in the `dist` directory, ready to be deployed to any static hosting service (e.g., GitHub Pages, Vercel, Netlify).
