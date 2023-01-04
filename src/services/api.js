import axios from 'axios';

const API_KEY = '31516994-28cd1dbd22a95ac70e77e6b45';
axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImages = async (query, page) => {
  const response = await axios.get(
    `/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};

export const normalizeImages = images =>
  images.map(({ id, tags, largeImageURL, webformatURL }) => ({
    id,
    tags,
    largeImageURL,
    webformatURL,
  }));
