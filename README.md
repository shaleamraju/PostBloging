# 📝 PostBloging - Modern Blog Application

A full-stack blog application with a beautiful, modern UI featuring authentication, post management, categories, likes, and dark mode.

## ✨ Features

### 🔐 Authentication
- User registration with validation
- Login with JWT token-based authentication
- Password strength indicator
- Form validation with real-time feedback
- Beautiful glassmorphism UI design

### 📝 Blog Management
- **Create Posts**: Rich post creation with title, content, author, category, and image upload
- **Edit Posts**: Update existing posts with ease
- **Delete Posts**: Remove unwanted posts with confirmation
- **Category System**: Organize posts into 8 categories (Technology, Lifestyle, Business, Travel, Food, Health, Education, Entertainment)

### 🎨 Modern UI Features
- **Dark Mode**: Toggle between light and dark themes
- **Search Functionality**: Search posts by title, content, or author
- **Category Filters**: Filter posts by category
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Enhanced user experience with transitions
- **Post Cards**: Beautiful grid layout with hover effects
- **Read Time Estimate**: Automatic calculation of reading time
- **Like System**: Users can like posts

### 🚀 Additional Features
- Image upload support with Cloudinary integration
- Post timestamps with formatted dates
- User profile display with welcome message
- Confirmation dialogs for destructive actions
- Empty state messages
- Post count display

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI Library
- **React Router DOM 7.9.4** - Navigation
- **CSS3** - Styling with modern features (Grid, Flexbox, Gradients)

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB** - Database
- **Mongoose 8.19.2** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
DATABASE_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start the server:
```bash
npm start
# or for development
npm run dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🎯 Usage

1. **Register**: Create a new account on the authentication page
2. **Login**: Access your account with your credentials
3. **Create Posts**: Fill in the form with title, author, category, content, and optional image
4. **Search & Filter**: Use the search bar and category filters to find posts
5. **Like Posts**: Click the like button to show appreciation
6. **Edit/Delete**: Manage your posts with edit and delete options
7. **Dark Mode**: Toggle dark mode for comfortable viewing
8. **Logout**: Safely logout when done

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts (sorted by newest)
- `POST /api/posts` - Create new post (with image upload)
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like a post

## 🎨 UI Improvements

### Login/Register Page
- Glassmorphism design with backdrop blur
- Password strength indicator (Weak/Medium/Strong)
- Toggle password visibility
- Form validation with error messages
- Loading states during API calls
- Animated gradient background
- Responsive layout
- Success/error message notifications

### Main Blog Page
- Modern header with user welcome message
- Dark mode toggle with smooth transitions
- Search bar with icon
- Category filter buttons with active states
- Grid layout for posts (responsive)
- Post cards with:
  - Category tags
  - Post dates
  - Read time estimates
  - Like counts
  - Hover animations
  - Image support
- Empty state messages
- Confirmation dialogs

## 🌟 New Features Added

1. **Password Strength Indicator**: Visual feedback on password security
2. **Form Validation**: Client-side validation with error messages
3. **Dark Mode**: Full dark theme support across the app
4. **Search Functionality**: Real-time post search
5. **Category System**: 8 predefined categories with filters
6. **Like System**: Users can like posts with count display
7. **Read Time Calculator**: Automatic reading time estimation
8. **Date Formatting**: Human-readable date format
9. **User Profile**: Display username on main page
10. **Responsive Design**: Mobile-first approach
11. **Loading States**: Better UX during API calls
12. **Animations**: Smooth transitions and hover effects
13. **Better File Upload**: Styled file upload button
14. **Post Count**: Display total filtered posts
15. **Confirmation Dialogs**: Prevent accidental deletions

## 🚀 Deployment

### Backend Deployment (Current)
The backend is already deployed on Render: `https://postbloging.onrender.com`

### Frontend Deployment
You can deploy the frontend on:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

Remember to update the API_BASE_URL in `BlogModule.jsx` to point to your production backend.

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3001
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Shalea Mraju**

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the database
- Cloudinary for image hosting
- All open-source contributors

---

**Made with ❤️ and React**
