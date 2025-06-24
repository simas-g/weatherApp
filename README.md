## Project Installation

### Prerequisites

- Make sure you have `Node.js` installed on your machine (latest version recommended)

### Environment Variables

Create a `.env` file in the `server/` folder based on `.env.example`:

```env
WEATHER_API_KEY=your_api_key
```

You can get a free API key from: https://openweathermap.org/api

### Frontend (React)

1. Navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm run dev
    ```

---

### Backend (Express)

1. Navigate to the `server` directory:

    ```bash
    cd server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the Express server:

    ```bash
    npm run dev
    ```


### Running Tests

To run backend tests (using Jest), navigate to the `server/` directory and run:

```bash
npm test
```
