import { Component } from 'react';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => this.setState(prev => ({ showModal: !prev.showModal }));

  render() {
    const { image } = this.props;

    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={image.webformatURL}
          alt={image.tags}
          onClick={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal
            alt={image.tags}
            url={image.largeImageURL}
            onModalClick={this.toggleModal}
          />
        )}
      </li>
    );
  }
}
