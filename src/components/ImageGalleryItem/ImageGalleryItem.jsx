import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({ photos, showModal }) => {
  return photos.map(
    ({ id, webformatURL, tags, likes, views, comments, downloads }, idx) => (
      <li className={css.photoCard} key={id} onClick={showModal} id={idx}>
        <img className={css.galleryImg} src={webformatURL} alt={tags} />
        <div className={css.info}>
          <p className={css.infoItem}>
            <b>Likes : {likes}</b>
          </p>
          <p className={css.infoItem}>
            <b>Views: {views}</b>
          </p>
          <p className={css.infoItem}>
            <b>Comments: {comments}</b>
          </p>
          <p className={css.infoItem}>
            <b>Downloads: {downloads}</b>
          </p>
        </div>
      </li>
    )
  );
};
