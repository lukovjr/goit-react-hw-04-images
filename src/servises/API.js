import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34851334-286cf58f2651b78053c9b207d';

export const fetchImages = async (query, page) => {
    const params = new URLSearchParams({
        q: query,
        page: page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
    });

    const response = await axios.get(`${BASE_URL}?${params}`);
    return response.data;
};