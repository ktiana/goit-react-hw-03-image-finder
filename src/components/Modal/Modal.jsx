import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRootRef = document.getElementById('modal-root');

export default class Modal extends Component {
  componentDidMount = () => {
    document.addEventListener('keydown', this.closeModal);
  };

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.closeModal);
  };

  closeModal = () => {
    this.props.onModalClick();
  };

  handleClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onModalClick();
    }
  };

  render() {
    const { alt, url } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.handleClick}>
        <div className="Modal">
          <img src={url} alt={alt} />
        </div>
      </div>,
      modalRootRef
    );
  }
}
