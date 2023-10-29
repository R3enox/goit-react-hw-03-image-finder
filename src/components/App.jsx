import { Component } from 'react';
import { Search } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Notify } from 'notiflix';
import { PixabayApi } from './helpers/pixabay-api';
import { LoadMoreBtn } from './LodaMoreBtn/LoadMoreBtn';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    photos: [],
    searchQ: '',
    page: 1,
    isLoading: false,
    loadMore: false,
    totalPages: 0,
  };

  componentDidUpdate(_, prevState) {
    const { page, searchQ } = this.state;
    if (prevState.searchQ !== searchQ || page !== prevState.page) {
      this.getPhotos();
    }
  }

  handleSearch = searchQ => {
    this.setState({ searchQ, page: 1, photos: [] });
  };

  getPhotos = async () => {
    this.setState({ isLoading: true });

    const pixabayApi = new PixabayApi(12);

    pixabayApi.q = this.state.searchQ;
    pixabayApi.page = this.state.page;

    if (!this.state.searchQ) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    try {
      const { totalHits, hits } = await pixabayApi.getContent();

      if (totalHits === 0) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      Notify.success(`Hooray! We found ${totalHits} images.`);
      this.setState(prevState => ({
        photos: [...prevState.photos, ...hits],
        totalPages: Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      Notify.failure(`${error}`);
    } finally {
      this.setState({ isLoading: false, loadMore: true });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { photos, searchQ, page, loadMore, totalPages } = this.state;
    return (
      <>
        <Search handleSearch={this.handleSearch} />
        {this.state.isLoading && <Loader />}
        {this.state.searchQ !== null && (
          <ImageGallery photos={photos} searchQ={searchQ} />
        )}
        {loadMore && page !== totalPages && (
          <LoadMoreBtn loadMore={this.loadMore} />
        )}
      </>
    );
  }
}
