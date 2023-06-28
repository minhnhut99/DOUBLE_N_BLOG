import { COMMENT_ICON, LIKE_ICON } from '@/assets/icons/Icons';
import Icon from '@/components/icon/Icon';
import './LikeComment.scss';
interface ILikeComment {
  count_comment: number;
  count_like: number;
}
const LikeComment = ({ count_comment, count_like }: ILikeComment) => {
  return (
    <div className="like-cmt-group">
      <div className="icon-like">
        <Icon icon={LIKE_ICON} />
        <small className="total-like">
          {count_like >= 100 ? '99+' : count_like}
        </small>
      </div>
      <div className="icon-cmt">
        <Icon icon={COMMENT_ICON} />
        <small className="total-cmt">
          {count_comment >= 100 ? '99+' : count_comment}
        </small>
      </div>
    </div>
  );
};

export default LikeComment;
