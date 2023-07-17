import { Component } from 'react';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  render() {
    const { images, onClickImage } = this.props;

    return (
      <ul className={styles.imageGallery}>
        {images.map(({ webformatURL, largeImageURL, id, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            onClickImage={onClickImage}
          />
        ))}
      </ul>
    );
  }
}
ImageGallery.propTypes = {
  onClickImage: PropTypes.func,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
export default ImageGallery;
