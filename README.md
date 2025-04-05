# CambioML - AI Integration Hub

CambioML is a Next.js-based platform that provides seamless integration with multiple AI services, featuring real-time audio, video, and text interactions with AI models.

Deployed Url: https://cambio-ml.vercel.app/
Author: Muhammad Shahzaib

## Features

- **Multi-Provider Support**: Integrates with Google's Gemini model
- **Real-time Video Conference**: Share webcam feed with AI models
- **Screen Sharing**: Share your screen with AI for context-aware interactions
- **Voice Interaction**: Talk directly to AI models and receive audio responses
- **Text Chat**: Traditional text-based interaction with AI
- **Modern UI**: Beautiful and responsive user interface built with Tailwind CSS

## Project Structure

```
.
├── app/                      # Next.js application directory
│   ├── (auth)/               # Authentication related routes
│   ├── (platform)/           # Main application routes
│   │   ├── contact/          # Contact pages
│   │   ├── features/         # Feature showcase pages
│   │   ├── pricing/          # Pricing pages
│   │   ├── layout.tsx        # Platform layout wrapper
│   │   └── page.tsx          # Home page
│   ├── globals.css           # Global CSS
│   ├── layout.tsx            # Root layout
│   └── prism.css             # Code highlighting styles
├── components/               # UI components
│   ├── ai-hub/               # AI integration components
│   │   ├── audio-pulse/      # Audio visualization components
│   │   ├── beam/             # UI beam effects
│   │   ├── control-tray/     # Controls for AI interaction
│   │   ├── logger/           # Logging components
│   │   ├── side-panel/       # Side panel UI
│   │   └── index.tsx         # Main AI Hub component
│   ├── features/             # Feature-specific components
│   ├── icons/                # Icon components
│   ├── navbar/               # Navigation components
│   ├── testimonials/         # Testimonial components
│   ├── ui/                   # Reusable UI components
│   └── ...                   # Various page-specific components
├── constants/                # Application constants
├── contexts/                 # React contexts
│   └── LiveAPIContext.tsx    # Context for AI API integration
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions and services
│   ├── ai-clients/           # AI service integrations
│   ├── worklets/             # Audio worklets for voice processing
│   ├── audio-recorder.ts     # Audio recording functionality
│   ├── audio-streamer.ts     # Audio streaming to AI services
│   ├── multimodal-live-client.ts # Client for multimodal interaction
│   └── ...                   # Other utility functions
├── public/                   # Static assets
├── .env.local                # Environment variables
├── next.config.mjs           # Next.js configuration
├── package.json              # Dependencies and scripts
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Required for Gemini API integration
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# Required for OpenAI integration (if using OpenAI features)
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

### How to Get API Keys

#### Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Create an account or sign in
3. Navigate to the API section
4. Create a new API key


## Installation

1. Clone the repository:

```bash
git clone https://github.com/mshahzaib101/CambioML
cd CambioML
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables as described above.

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Using the AI Hub

### Switching Between AI Models

1. Use the model selector dropdown in the control panel to switch between:
   - Gemini 2.0 Flash
   - Gemini 2.0 Pro


### Starting an AI Interaction

1. Select your preferred AI model from the dropdown
2. Click the "Connect" button to start a session
3. Use the control tray buttons to enable different input modes:
   - Microphone for voice input
   - Camera for video input
   - Screen for screen sharing

### Modes of Interaction

- **Text Chat**: Type messages in the chat panel
- **Voice Chat**: Toggle microphone to speak with the AI
- **Video Feed**: Toggle camera to share your webcam feed
- **Screen Share**: Toggle screen sharing to show your screen to the AI

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting

## Dependencies

The project uses several key technologies:

- **Next.js** - React framework for web applications
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Unstyled UI components
- **Framer Motion** - Animation library
- **Google Generative AI** - Integration with Google's Gemini models
- **React Player** - Video playback component

## Limitations

- Video processing capabilities may vary between AI providers
- Some advanced features may be provider-specific


