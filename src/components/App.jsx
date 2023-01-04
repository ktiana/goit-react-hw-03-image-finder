import { Component } from 'react';
import { getImages, normalizeImages } from 'services/api';

import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';

import css from './App.module.css';

export default class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalImages: 0,
    loading: false,
    error: '',
  };

  componentDidUpdate = async (_, prevState) => {
    const { page, query } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });
      try {
        const data = await getImages(query, page);
        const normalizedImages = normalizeImages(data.hits);

        this.setState(prev => {
          return {
            images: [...prev.images, ...normalizedImages],
            totalImages: data.totalHits,
            error: '',
          };
        });
      } catch (error) {
        this.setState({ error: 'something went wrong' });
      } finally {
        this.setState({ loading: false });
      }
    }
  };

  getQuery = query => this.setState({ query, images: [], page: 1 });

  incrementPage = () =>
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });

  // componentDidMount = async () => {
  //   const responce = await getImages();
  //   console.log(responce);
  // };

  render() {
    const { images, totalImages, loading, error } = this.state;
    const showButton =
      totalImages > 0 && images.length !== totalImages && !loading;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.getQuery} />
        {images.length > 0 && <ImageGallery images={this.state.images} />}

        {showButton && <Button onClick={this.incrementPage} />}

        {loading && <Loader />}

        {error && <p>{error}</p>}
      </div>
    );
  }
}
