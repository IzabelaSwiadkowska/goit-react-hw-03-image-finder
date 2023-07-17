import React, { Component } from 'react';
import fetchImages from './api/fetchApi';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { Modal } from './Modal/Modal';
import { Notify } from 'notiflix';
import notifySettings from 'components/api/notiflix';

import { animateScroll } from 'react-scroll';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    per_page: 12,
    isLoading: false,
    loadMore: false,
    showModal: false,
    id: null,
    largeImageURL: '',
  };

  getImages = async (query, page) => {
    this.setState({ isLoading: true });
    if (!query) {
      return;
    }
    try {
      const { hits, totalHits } = await fetchImages(query, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.getImages(searchQuery, page);
    }
  }
  onSearch = query => {
    this.setState({
      searchQuery: query,
      images: [],
      page: 1,
      isLoading: false,
      loadMore: false,
    });
    if (query === '') {
      Notify.info('Please enter something to find', notifySettings);
    }
  };
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
    this.scrollOnButton();
  };

  scrollOnButton = () => {
    animateScroll.scrollToBottom({
      duration: 1500,
      delay: 1,
      smooth: 'easeInQuint',
    });
  };
  onClickImage = url => {
    this.setState({ showModal: true, largeImageURL: url });
  };
  onModalClose = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };
  render() {
    const { images, isLoading, loadMore, showModal, largeImageURL } =
      this.state;

    return (
      <div>
        <Searchbar onSubmit={this.onSearch} />
        {isLoading && <Loader />}
        <ImageGallery images={images} onClickImage={this.onClickImage} />
        {loadMore && <Button onLoadMore={this.onLoadMore} />}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onModalClose={this.onModalClose}
          />
        )}
      </div>
    );
  }
}
