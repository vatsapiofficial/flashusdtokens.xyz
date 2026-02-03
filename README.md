# Flash USDT Sender

A modern, responsive Expo-based React Native application designed for secure USDT transactions, now enhanced with AI-powered support.

## 🚀 Features

- **AI Assistant**: Integrated AI chatbot using the Vercel AI SDK to help users with USDT-related queries.
- **Modern UI/UX**: Sophisticated dark theme with a dynamic grid background and teal accents.
- **Responsive Design**: Adapts seamlessly to various screen sizes using `useWindowDimensions`.
- **Secure Access**: Protected entry point with secure text input for access keys.
- **Cross-Platform**: Built with Expo, supporting Android, iOS, and Web from a single codebase.
- **Vercel Ready**: Pre-configured for easy deployment to Vercel with SPA routing and API route support.

## 🛠️ Tech Stack

- **Framework**: [Expo SDK 54](https://expo.dev/) (Expo Router)
- **AI**: [Vercel AI SDK (ai, @ai-sdk/react)](https://ai-sdk.dev/)
- **Core**: [React Native 0.81](https://reactnative.dev/)
- **Icons**: [@expo/vector-icons (Feather)](https://icons.expo.fyi/)
- **Web Support**: [react-native-web](https://necolas.github.io/react-native-web/)

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22 or later recommended)
- [npm](https://www.npmjs.com/)
- OpenAI API Key (or other provider key)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd flash-usdt-sender
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Configure Environment Variables:
   Create a `.env.local` file:
   ```env
   OPENAI_API_KEY=your_api_key_here
   ```

### Running the App

- **Start Development Server**:
  ```bash
  npm start
  ```
- **Run on Web**:
  ```bash
  npm run web
  ```

## 🚢 Deployment

### Vercel

This project is configured for Vercel deployment. It supports Expo Router API routes.

1. Connect your repository to [Vercel](https://vercel.com/).
2. Add your `OPENAI_API_KEY` to Vercel environment variables.
3. Vercel will deploy the web version and the API routes.

## 📄 License

This project is licensed under the MIT License.
