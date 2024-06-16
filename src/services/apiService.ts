import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_API_URL,
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