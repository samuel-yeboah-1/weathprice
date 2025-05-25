# Sharp Two - Application Sitemap

```
📱 Sharp Two Dashboard
│
├── 🏠 Root (/)
│   └── → Redirects to /weather
│
├── 🌤️ Weather Dashboard (/weather)
│   ├── City Search
│   └── Weather Display
│       ├── Current Temperature
│       ├── Weather Conditions
│       ├── Wind Speed
│       ├── Humidity
│       ├── Visibility
│       ├── High/Low Temperature
│       └── Pressure
│
├── 💰 Cryptocurrency Dashboard (/price)
│   ├── Coin Selection
│   ├── Price Display
│   │   ├── Current Price
│   │   └── 24h Price Change
│   └── Price Chart
│       ├── Time Range Selection (24H/7D/30D)
│       └── Interactive Price Graph
│
├── 🔐 Authentication (/auth)
│   ├── Sign In (/auth/signin)
│   │   ├── Username Input
│   │   └── Password Input
│   │
│   └── Sign Up (/auth/signup)
│       ├── Username Input
│       └── Password Input
│
└── ❌ Not Found (404) (*)

```

## 🗺️ Route Structure

### Public Routes
- `/auth/signin` - Sign In Page
- `/auth/signup` - Sign Up Page

### Protected Routes (Requires Authentication)
- `/` - Root (redirects to /weather)
- `/weather` - Weather Dashboard
- `/price` - Cryptocurrency Price Dashboard

### Error Routes
- `*` - 404 Not Found Page

## 🧩 Components Hierarchy

### Layouts
- `AppLayout`
  - Protected route wrapper
  - Navigation
  - Theme toggle
  - Main content area
- `AuthLayout`
  - Authentication pages wrapper
  - Logo/branding
  - Form container

### Core Components
- `Nav` - Main navigation
- `WeatherCard` - Weather information display
- `CoinCard` - Cryptocurrency information
- `CoinChart` - Price history visualization
- `ErrorBoundary` - Error handling wrapper

### Authentication Components
- `SignInForm` - Login form
- `SignUpForm` - Registration form
- `ProtectedRoute` - Route protection wrapper

### UI Components
- Button
- Card
- Dropdown Menu
- Input
- Label
- Loading Spinner
- Select
- Sheet
- Skeleton
- Spinner

## 🔄 Data Flow

### Weather Flow
1. User enters city name
2. Debounced API call to OpenWeather
3. Display weather information or error

### Cryptocurrency Flow
1. User selects cryptocurrency
2. Real-time price update from CoinGecko
3. Historical data fetching for charts
4. Display price information and charts

### Authentication Flow
1. User enters credentials
2. Validation and API call
3. Store authentication token
4. Redirect to protected routes
