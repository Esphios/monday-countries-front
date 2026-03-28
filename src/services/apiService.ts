import axios from 'axios';

const weatherApiUrl =
  import.meta.env.VITE_WEATHER_API_URL ||
  import.meta.env.REACT_APP_WEATHER_API_URL ||
  '';

if (!weatherApiUrl) {
  throw new Error('REACT_APP_WEATHER_API_URL or VITE_WEATHER_API_URL must be configured.');
}

const apiClient = axios.create({
  baseURL: weatherApiUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface WeatherResponse {
  temperature: number;
  condition: string;
  icon: string;
  wind_speed_kph: number;
  wind_direction: string;
}

const getWeatherData = async (inputString: string): Promise<WeatherResponse> => {
  try {
    const response = await apiClient.get(`/${inputString}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export { getWeatherData };
