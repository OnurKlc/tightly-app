# User Management System

A Vue 3 application that demonstrates Vue.js development practices, clean architecture, and responsive design.

## Features

- **User Management**: Display all users in a clean table interface
- **User Details**: Comprehensive user profile pages with contact information
- **Posts Management**: View, create, and delete user posts with pagination
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern Architecture**: Built with Vue 3 Composition API and SOLID principles

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vue Router 4** - Official router for Vue.js
- **Ant Design Vue** - Enterprise-class UI components
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and development server

## API Integration

Uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for demo data:
- Users endpoint: `/users`
- Posts endpoint: `/posts`
- Supports pagination with `_start` and `_limit` parameters

## Architecture

### Service Layer
```
src/services/
├── api/
│   ├── httpClient.js     # Centralized HTTP client
│   └── baseService.js    # Base service with common CRUD operations
├── userService.js        # User-specific API operations
└── postService.js        # Post-specific API operations
```

### Component Structure
```
src/
├── views/
│   ├── UsersView.vue     # Users listing page
│   └── UserDetailView.vue # User profile page
├── components/
│   └── PostsSection.vue  # Reusable posts component
└── router/
    └── index.js          # Route definitions
```

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tightly-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
```

## Usage

1. **Users Page**: View all users in a table format
2. **Click User Names**: Navigate to individual user profiles
3. **User Details**: View complete user information on the left
4. **Posts Section**: 
   - View user posts with pagination (3 per page)
   - Add new posts using the form
   - Delete posts with confirmation
