import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from 'components/LodaMoreBtn/LoadMoreBtn';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayApi } from 'components/helpers/pixabay-api';

import css from './ImageGallery.module.css';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    photos: null,
    page: 1,
    isLoading: false,
    error: null,
    isShowModal: false,
    id: null,
    loadMore: true,
  };

  showModal = evt => {
    this.setState({ isShowModal: true, id: evt.currentTarget.id });
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };
  loadMore = () => {
    const pixabayApi = new PixabayApi(12);
    pixabayApi.q = this.props.searchQ;
    pixabayApi.page = this.state.page + 1;
    pixabayApi
      .getContent()
      .then(({ hits, totalHits }) =>
        this.setState(prevState => ({
          photos: [...prevState.photos, ...hits],
          page: prevState.page + 1,
          loadMore: this.state.page < Math.floor(totalHits / 12),
          isLoading: false,
        }))
      )
      .catch(error => this.setState({ error: error.message }))
      .finally(this.setState({ isLoading: true }));
  };

  componentDidUpdate(prevProps, _) {
    const pixabayApi = new PixabayApi(12);
    pixabayApi.q = this.props.searchQ;

    if (prevProps.searchQ !== this.props.searchQ) {
      pixabayApi
        .getContent()
        .then(({ hits, totalHits }) => {
          this.setState({
            photos: hits,
            page: 1,
            isLoading: false,
          });
          if (totalHits === 0) {
            return Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          } else {
            Notify.success(`Hooray! We found ${totalHits} images.`);
          }
        })
        .catch(error => this.setState({ error: error.message }))
        .finally(this.setState({ isLoading: true }));
    }
  }
  render() {
    return (
      <ul className={css.gallery}>
        {this.state.isLoading && <Loader />}
        {this.state.photos !== null && (
          <ImageGalleryItem
            photos={this.state.photos}
            showModal={this.showModal}
          />
        )}
        {this.state.photos !== null &&
          this.state.photos.length > 0 &&
          this.state.loadMore && <LoadMoreBtn loadMore={this.loadMore} />}
        {this.state.isShowModal && (
          <Modal
            photos={this.state.photos}
            id={this.state.id}
            closeModal={this.closeModal}
          />
        )}
      </ul>
    );
  }
}
