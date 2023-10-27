import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  handlePressESC = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handlePressESC);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressESC);
  }

  render() {
    const { closeModal, photos, id } = this.props;
    return (
      <div className={css.overlay}>
        <div className={css.modal}>
          <img src={photos[id].largeImageURL} alt="" />
          <button className={css.btnClose} onClick={closeModal}>
            ❌
          </button>
        </div>
      </div>
    );
  }
}
