# PixieShelf Frontend

A modern React application built with Vite, featuring a comprehensive product management system with role-based access control and real-time user messaging.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see backend README)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### 3. Access the Application
- **Primary URL**: `http://localhost:3031` (via backend proxy)
- **Direct Access**: `http://localhost:5173` (direct Vite dev server)

## 🔧 Development Workflow

### Recommended Setup Process

1. **Start Backend First**:
   ```bash
   cd pixieshelf BE
   npm install
   npm run dev
   ```

2. **Start Frontend** (in a new terminal):
   ```bash
   cd pixieshelf FE
   npm install
   npm run dev
   ```

3. **Access Application**:
   - Use `http://localhost:3031` for the full experience
   - Use `http://localhost:5173` for direct frontend access

## 📁 Project Structure

```
pixieshelf FE/
├── src/
│   ├── cmps/              # React components
│   │   ├── AppHeader.jsx  # Navigation header
│   │   ├── ProductList.jsx # Product grid display
│   │   ├── ProductModal.jsx # Add/edit product form
│   │   ├── ProductFilters.jsx # Search and filter controls
│   │   ├── ProductManagement.jsx # Product statistics
│   │   ├── ProtectedRoute.jsx # Route protection
│   │   └── UserMsg.jsx    # Global message system
│   ├── pages/             # Page components
│   │   ├── HomePage.jsx   # Landing page
│   │   ├── ProductIndex.jsx # Main products page
│   │   ├── Login.jsx      # Authentication page
│   │   ├── CreateUser.jsx # User creation (Admin)
│   │   └── AccessDenied.jsx # Access denied page
│   ├── services/          # API services
│   │   ├── http.service.js # Axios configuration
│   │   ├── auth.service.js # Authentication API
│   │   ├── crud.service.js # Generic CRUD service
│   │   ├── user.service.js # User management API
│   │   ├── product.service.js # Product management API
│   │   └── event-bus.service.js # Global messaging
│   ├── contexts/          # React contexts
│   │   └── UserContext.jsx # User state management
│   └── assets/            # Styles and assets
│       └── styles/        # SCSS files
│           ├── setup/     # Variables and mixins
│           ├── cmps/      # Component styles
│           └── pages/     # Page styles
├── public/                # Static assets
└── index.html             # Entry point
```

## 🎨 Features

### Product Management
- **View Products**: Browse all products with filtering and sorting
- **Add Products**: Create new products with auto-generated SKUs
- **Edit Products**: Modify existing product details
- **Delete Products**: Remove products with confirmation
- **Search & Filter**: Search by name, SKU, category, stock, description
- **Statistics**: View product statistics (total, high stock, low stock, out of stock)

### User Authentication
- **Login/Logout**: Secure authentication system
- **Role-Based Access**: Different permissions for Admin, Member, and Guest users
- **Session Management**: Persistent login state
- **Protected Routes**: Automatic redirection for unauthorized access

### User Management (Admin Only)
- **Create Users**: Add new users with role assignment
- **User Types**: Admin and Regular user types
- **Password Security**: Bcrypt password hashing

### User Experience
- **Responsive Design**: Mobile-first responsive layout
- **Global Messaging**: Success and error notifications
- **Confirmation Dialogs**: Unsaved changes protection
- **Loading States**: User feedback during operations
- **Error Handling**: Graceful error handling and user feedback

## 🔐 User Roles & Permissions

### Guest (Not Logged In)
- ✅ View products
- ✅ Search and filter products
- ✅ View product statistics
- ❌ Create, edit, or delete products
- ❌ Access user management

### Member (Regular User)
- ✅ All Guest permissions
- ✅ Create, edit, and delete products
- ✅ Access product management features
- ❌ Access user management

### Admin
- ✅ All Member permissions
- ✅ Create new users
- ✅ Manage user accounts
- ✅ Full system access

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎯 Key Technologies

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **SCSS**: Advanced CSS with variables and mixins
- **Context API**: State management
- **Event Bus**: Global messaging system

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the frontend root:
```bash
VITE_API_BASE_URL=http://localhost:3031/api
```

### Vite Configuration
The project uses Vite with React plugin for fast development and building.

## 🎨 Styling

### SCSS Architecture
- **Variables**: Centralized design tokens
- **Mixins**: Reusable style patterns
- **Component Styles**: Modular SCSS files
- **Responsive Design**: Mobile-first approach

### Design System
- **Color Palette**: Primary, secondary, and utility colors
- **Typography**: Consistent font hierarchy
- **Spacing**: Standardized spacing scale
- **Components**: Reusable UI components

## 🔍 Troubleshooting

### Common Issues

1. **Backend Connection Error**:
   - Ensure backend is running on port 3031
   - Check API base URL configuration
   - Verify network connectivity

2. **Build Errors**:
   - Clear `node_modules` and reinstall
   - Check for missing dependencies
   - Verify import paths

3. **Styling Issues**:
   - Ensure SCSS files are properly imported
   - Check for CSS conflicts
   - Verify responsive breakpoints

4. **Authentication Problems**:
   - Clear browser localStorage
   - Check backend authentication endpoints
   - Verify user credentials

## 🚀 Production Deployment

### Build Process
```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deployment Options
- **Static Hosting**: Deploy `dist` folder to services like Netlify, Vercel
- **Backend Integration**: Serve static files through the backend
- **CDN**: Use CDN for static assets

## 📝 Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Maintain consistent naming conventions
- Write meaningful component and function names

### File Organization
- Group related components together
- Keep services separate from components
- Use consistent file naming
- Maintain clear import/export structure

### State Management
- Use Context API for global state
- Keep component state local when possible
- Use proper state update patterns
- Avoid prop drilling


## 📄 License

This project is licensed under the MIT License.
