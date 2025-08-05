# HireWise - AI-Powered Role-based Recruitment Platform

![HireWise Logo](https://img.shields.io/badge/HireWise-Recruitment%20Platform-blue?style=for-the-badge)

A modern, responsive recruitment platform built for the **Hexawire Hackathon** featuring AI-powered job description parsing, role-based dashboards, and real-time candidate matching.

## 🚀 Features

### Multi-Role System
- **👤 Candidate Portal**: Job browsing, applications, resume upload
- **💼 AR Recruiter Portal**: Job creation, AI JD parsing, candidate management  
- **⚙️ Admin Portal**: Analytics, canvas view, platform management

### Key Capabilities
- ✅ AI-powered Job Description parsing and auto-fill
- ✅ Smart candidate-job matching with scoring
- ✅ Real-time canvas visualization
- ✅ Comprehensive analytics and reporting
- ✅ Resume upload and management
- ✅ Progress tracking for recruitment workflow
- ✅ Responsive design with smooth animations

## 🛠️ Tech Stack

- **Frontend**: React.js (JavaScript)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router
- **State Management**: React Context API + localStorage
- **Icons**: Lucide React

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

1. **Navigate to project directory**
   ```bash
   cd hirewise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🎯 Demo Credentials

### Candidate Login
- **Email**: `candidate@demo.com`
- **Password**: `demo123`

### AR Recruiter Login
- **Email**: `recruiter@demo.com`
- **Password**: `demo123`

### Admin Login
- **Email**: `admin@demo.com`
- **Password**: `demo123`

## 📁 Project Structure

```
hirewise/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── LoginForm.js
│   │   ├── SignupForm.js
│   │   ├── JobCard.js
│   │   ├── ResumeCard.js
│   │   ├── CreateVacancyForm.js
│   │   ├── ProgressBar.js
│   │   └── AnalyticsBoard.js
│   ├── contexts/
│   │   └── AppContext.js
│   ├── pages/
│   │   ├── Homepage.js
│   │   ├── CandidateLogin.js
│   │   ├── CandidateSignup.js
│   │   ├── CandidateDashboard.js
│   │   ├── RecruiterLogin.js
│   │   ├── RecruiterDashboard.js
│   │   ├── AdminLogin.js
│   │   ├── AdminDashboard.js
│   │   └── CanvasJobDisplay.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Key Components

### 🏠 Homepage
- Modern landing page with animated login portals
- Feature showcase with smooth transitions
- Professional gradient design

### 👤 Candidate Flow
- **Registration**: Complete signup with resume upload
- **Dashboard**: Job browsing with search and filters
- **Applications**: One-click apply with match scoring
- **Tracking**: Application status and progress monitoring

### 💼 AR Recruiter Flow
- **Job Creation**: AI-powered JD parsing and auto-fill
- **Dashboard**: Job management and candidate insights
- **Progress Tracking**: Visual workflow (JD → Profiles → Emails)
- **Candidate Management**: Top 3 matches per job with resume access

### ⚙️ Admin Flow
- **Analytics Dashboard**: Platform-wide insights and metrics
- **Canvas View**: Real-time job and candidate visualization
- **Job Management**: Create and oversee all postings
- **Reporting**: Advanced filtering and report generation

## 🔧 Configuration

### Tailwind CSS
Custom configuration with:
- Primary/Secondary color schemes
- Custom animations (fade-in, slide-up, bounce-slow)
- Responsive breakpoints
- Component utilities

### Context API
Centralized state management with:
- User authentication
- Job management
- Application tracking
- Local storage persistence

## 🎯 Usage Guide

### For Candidates
1. Sign up with personal details and resume
2. Browse available jobs with smart filtering
3. Apply to jobs with one-click functionality
4. Track application status and match scores

### For Recruiters
1. Login to recruiter dashboard
2. Create jobs using AI-powered JD parsing
3. Monitor application progress with visual indicators
4. Review top matched candidates with resume access
5. Send bulk emails to qualified candidates

### For Admins
1. Access comprehensive platform analytics
2. Create and manage job postings
3. Use Canvas View for real-time visualization
4. Generate reports with advanced filtering
5. Monitor platform performance metrics

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy!

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme changes
- Update `src/index.css` for global styles
- Component-specific styles in individual files

### Features
- Add new components in `src/components/`
- Create new pages in `src/pages/`
- Extend context in `src/contexts/AppContext.js`

## 📱 Responsive Design

Fully responsive across all devices:
- **Mobile**: Optimized touch interactions
- **Tablet**: Adaptive grid layouts
- **Desktop**: Full feature experience

## 🎭 Animations

Smooth animations throughout:
- Page transitions with Framer Motion
- Component entrance animations
- Hover effects and micro-interactions
- Loading states and progress indicators

## 🔒 Security Features

- Role-based access control
- Protected routes
- Input validation
- Secure file handling

## 🧪 Testing

### Manual Testing Checklist
- [ ] All login flows work correctly
- [ ] Job creation and application process
- [ ] Resume upload and download
- [ ] Canvas view updates in real-time
- [ ] Analytics and filtering functions
- [ ] Responsive design across devices

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created for the **Hexawire Hackathon** - 2024

## 🏆 Hackathon Submission

**Project**: HireWise - AI-Powered Recruitment Platform  
**Team**: [Your Team Name]  
**Event**: Hexawire Hackathon 2024  
**Category**: Web Application  

### Key Innovations
- AI-powered JD parsing with auto-fill
- Real-time canvas visualization
- Smart candidate matching algorithms
- Multi-role dashboard system

---

**Built with ❤️ for Hexawire Hackathon 2024**
