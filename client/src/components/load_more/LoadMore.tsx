import './LoadMore.scss';
interface ILoadMore {
  onClick: () => void;
}
const LoadMore = ({ onClick }: ILoadMore) => {
  return (
    <div className="load-more">
      <div className="load-more-cotainer">
        <button className="more-btn" onClick={onClick}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default LoadMore;
