# Sharp Two - Weather & Crypto Dashboard

A modern React application that combines weather information and cryptocurrency tracking in a single, elegant dashboard. Built with React, Vite, and TailwindCSS.

## 🌟 Features

- **Weather Dashboard**

  - Real-time weather data from WeatherAPI API
  - Search for weather by city name
  - Detailed weather information including temperature, humidity, wind speed, and more
  - Clean and intuitive user interface

- **Cryptocurrency Tracker**

  - Live cryptocurrency price updates from CoinGecko API
  - Interactive price charts with multiple time ranges
  - Support for multiple cryptocurrencies
  - Historical price data visualization

- **Authentication System**

  - User registration and login
  - Secure password hashing
  - Protected routes
  - Persistent sessions

- **Modern UI/UX**
  - Dark/Light mode support
  - Responsive design
  - Loading states and error handling
  - Clean and modern interface using shadcn/ui components

## 🚀 Technologies

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: React Context
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router v7
- **Charts**: Chart.js with react-chartjs-2
- **UI Components**: shadcn/ui
- **Authentication**: bcryptjs for password hashing
- **API Integration**: Weather API, CoinGecko API

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd sharpetwo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API keys:

   ```env
   VITE_OPENWEATHER_API_KEY=your_weatherapi_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Environment Variables

The following environment variables are required:

- `VITE_OPENWEATHER_API_KEY` - Your OpenWeather API key

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
├── contexts/        # React Context providers
├── hooks/          # Custom React hooks
├── layouts/        # Layout components
├── pages/          # Page components
├── services/       # API service functions

```

## 🔒 Security

- Password hashing using bcryptjs
- Protected routes with authentication checks
- No sensitive data stored in localStorage
- Environment variables for API keys
- Input sanitization for city searches

## ⚡ Performance

- Debounced search inputs
- React Query for efficient data fetching and caching
- Optimized chart rendering
- Lazy Loading route components
- Proper error boundaries for stability

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop monitors
- Tablets
- Mobile phones

Breakpoints:

- Mobile: 320px - 480px
- Tablet: 481px - 768px
- Desktop: 769px+

## 🙏 Acknowledgments

- [Weather API](https://api.weatherapi.com/v1) for weather data
- [CoinGecko API](https://www.coingecko.com/en/api) for cryptocurrency data
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for the build tool
- [React Query](https://tanstack.com/query/latest) for data fetching
- [Chart.js](https://www.chartjs.org/) for charts
- [React Router](https://reactrouter.com/) for routing

## Deployed Version
(https://weathprice.vercel.app/weather)