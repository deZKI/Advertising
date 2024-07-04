import axios from 'axios';
import {TItem} from '../types/item.type';

const API_URL = process.env.REACT_APP_API_URL;

export async function fetchAdverts(): Promise<TItem[]> {
    try {
        const response = await axios.get(`${API_URL}/advert/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
}
