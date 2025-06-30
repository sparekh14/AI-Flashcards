# 🧠 AI Flashcards SaaS

![Next.js](https://img.shields.io/badge/Next.js-14.2.8-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=for-the-badge&logo=openai&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)

A modern, AI-powered SaaS application that transforms any text into intelligent flashcards for enhanced studying and learning. Built with cutting-edge technologies and designed for seamless user experience.

## 🌟 Key Features

### 🤖 **AI-Powered Generation**
- Utilizes OpenAI's GPT-4o model to intelligently break down complex text into concise, effective flashcards
- Automatically generates 12 optimized flashcards per input with perfect question-answer formatting
- Smart content analysis ensures optimal learning outcomes

### 💳 **Subscription Management**
- **Basic Plan** ($5/month): Essential flashcard features with limited storage
- **Pro Plan** ($10/month): Unlimited flashcards, storage, and priority support
- Secure payment processing through Stripe integration

### 🔐 **Robust Authentication**
- Seamless sign-up and login experience powered by Clerk
- Secure user session management
- Protected routes and personalized user experiences

### 📚 **Collection Management**
- Save and organize flashcards into named collections
- Persistent storage with Firebase Firestore
- Easy access to previously created flashcard sets

### 🎨 **Interactive User Interface**
- Beautiful 3D flip animations for engaging flashcard interactions
- Responsive design optimized for all device sizes
- Modern Material-UI components for professional appearance

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 14.2.8** - React framework for production-ready applications
- **React 18** - Modern UI library with hooks and context
- **Material-UI 6.0.2** - Professional React component library
- **Emotion** - CSS-in-JS styling solution

### **Backend & APIs**
- **OpenAI API** - GPT-4o model for intelligent flashcard generation
- **Stripe API** - Secure payment processing and subscription management
- **Firebase Firestore** - NoSQL database for scalable data storage
- **Clerk** - Complete authentication and user management

### **Development Tools**
- **ESLint** - Code quality and consistency
- **Next.js Dev Server** - Hot reload development environment

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Firebase project setup
- OpenAI API key
- Stripe account for payments
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-flashcards.git
   cd ai-flashcards
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Stripe Payment Processing
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
   STRIPE_SECRET_KEY=your_stripe_secret_key

   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Application Flow

### 1. **Landing Page**
- Clean, professional interface showcasing key features
- Pricing plans with clear value propositions
- Easy navigation to sign-up/sign-in

### 2. **Authentication**
- Streamlined registration and login process
- Secure user session management
- Immediate access to application features

### 3. **Flashcard Generation**
- Simple text input interface
- One-click AI generation powered by GPT-4o
- Interactive preview with flip animations

### 4. **Collection Management**
- Save flashcards with custom collection names
- Browse and access previously created sets
- Organized storage for efficient studying

## 🎯 Core Functionality

### AI Generation Process
```javascript
// Intelligent flashcard generation with OpenAI
const completion = await openai.chat.completions.create({
    messages: [
        {role: 'system', content: systemPrompts},
        {role: 'user', content: userInput}
    ],
    model: "gpt-4o",
    response_format: {type: "json_object"}
});
```

### Secure Data Management
```javascript
// Firebase Firestore integration for user data
const userDocRef = doc(collection(db, 'users'), user.id);
const batch = writeBatch(db);
// Atomic operations ensure data consistency
```

## 🔮 Future Enhancements

- **AI Study Analytics** - Performance tracking and learning insights
- **Collaborative Collections** - Share flashcard sets with teams
- **Mobile Application** - Native iOS and Android apps
- **Advanced AI Models** - Integration with latest language models
- **Spaced Repetition Algorithm** - Optimized learning schedule
- **Multi-language Support** - Global accessibility features

## 📊 Technical Highlights

- **Scalable Architecture** - Built for growth with modern React patterns
- **Secure by Design** - Industry-standard authentication and payment processing
- **Performance Optimized** - Server-side rendering and optimized React components
- **Type Safety** - Comprehensive error handling and validation
- **Responsive Design** - Seamless experience across all devices

## 🤝 Contributing

This project demonstrates proficiency in:
- **Full-Stack Development** - End-to-end application architecture
- **AI Integration** - Practical implementation of GPT models
- **SaaS Business Model** - Subscription management and payment processing
- **Modern React Ecosystem** - Latest tools and best practices
- **Cloud Services** - Firebase, Stripe, and third-party API integration

## 📄 License

This project is part of a professional portfolio showcasing modern web development capabilities and AI integration expertise.

---

**Built with ❤️ by Samarth Parekh** | [Portfolio](https://samarthparekh.dev) | [LinkedIn](https://linkedin.com/in/samarthparekh)