import React, { useState } from 'react';
import CourseCommentImg from '../../../assets/Images/commentUser.png';
import Comment from '../../../assets/Icons/Comment';
import Like from '../../../assets/Icons/Like';
import DisLike from '../../../assets/Icons/DisLike';
import { likeCourseComments } from '../../../core/services/api/post/likeCourseComments';
import { disLikeCourseComments } from '../../../core/services/api/post/disLikeCourseComments';
import { useTranslation } from 'react-i18next';
import CourseReplyForm from '../../course/CourseReplyForm/CourseReplyForm';
import CommentReplyModal from '../../course/commentReplyModal/CommentReplyModal';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

const CourseComment = ({ item }) => {
  const { t } = useTranslation();

  const token = localStorage.getItem('token');
  const key = `like_comment_${item.id}`;
  const saved = JSON.parse(localStorage.getItem(key) || '{}');

  const [liked, setLiked] = useState(saved.liked || false);
  const [disliked, setDisliked] = useState(saved.disLiked || false);
  const [likeCount, setLikeCount] = useState(item.commentLikeCount);
  const [dislikeCount, setDislikeCount] = useState(item.commentDisLikeCount);

  const likeMutation = useMutation({
    mutationFn: () => likeCourseComments(item.id),
    onSuccess: () => toast.success(t('imageInfo.addLikeSuccessToast')),
  });
  const dislikeMutation = useMutation({
    mutationFn: () => disLikeCourseComments(item.id),
    onSuccess: () => toast.success(t('imageInfo.addDisLikeSuccessToast')),
  });
  const onLike = () => {
    if (!token) {
      toast.error(t('login.loginToast'));
      return;
    }
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
      toast.success(t('imageInfo.removeLikeSuccessToast'));
    } else {
      setLiked(true);
      setDisliked(false);
      setLikeCount(likeCount + 1);
      if (disliked) setDislikeCount(dislikeCount - 1);
      likeMutation.mutate();
    }
  };
  const onDislike = () => {
    if (!token) {
      toast.error(t('login.loginToast'));
      return;
    }
    if (disliked) {
      setDisliked(false);
      setDislikeCount(dislikeCount - 1);
      toast.success(t('imageInfo.removeDisLikeSuccessToast'));
    } else {
      setDisliked(true);
      setLiked(false);
      setDislikeCount(dislikeCount + 1);
      if (liked) setLikeCount(likeCount - 1);
      dislikeMutation.mutate();
    }
  };
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ liked, disLiked: disliked }));
  }, [liked, disliked, key]);


  const [isOpen, setIsOpen] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  
  
  return (
    <>
      <div>
        <div className="flex items-end gap-4">
          <img src={CourseCommentImg} alt="user" />
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-base text-[#1E1E1E]">{item.commentUserName}</h4>
            <span className="font-regular text-sm text-[#848484]">{item.commentDate}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-[10px]">
          <span className="font-regular text-sm text-[#1E1E1E]">{item.commentTitle}</span>
          <span className="font-regular text-sm text-[#848484]">{item.commentDescribe}</span>
        </div>

        <div className="flex items-center gap-6 mt-4">
          <button className="flex gap-1 text-[#1E1E1E]" onClick={() => setIsOpen(false)}>
            <Comment />
            <span className="font-regular text-xs cursor-pointer">
              {t('courseComment.closeReplyBtn')}
            </span>
          </button>

          {/* Like Button */}
          <button onClick={onLike} className="flex gap-1 text-[#1E1E1E] cursor-pointer">
            {liked ? <Like /> : <DisLike className="rotate-180 scale-x-[-1]" />}
            <span className="font-regular text-xs">{likeCount}</span>
          </button>

          {/* Dislike Button */}
          <button onClick={onDislike} className="flex gap-1 text-[#1E1E1E] cursor-pointer">
            {disliked ? (
              <Like className="rotate-180 scale-x-[-1]" />
            ) : (
              <DisLike />
            )}
            <span className="font-regular text-xs">{dislikeCount}</span>
          </button>

          <button
            onClick={() => setShowReplies(true)}
            className="font-regular text-xs text-[#1E1E1E] cursor-pointer"
          >
            {t('courseComment.replyNumber')}
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="font-regular text-xs text-[#008C78] cursor-pointer"
          >
            {t('courseComment.openReplyBtn')}
          </button>
        </div>

        {isOpen && (
          <div className="mt-8">
            <CourseReplyForm course={item} />
          </div>
        )}
      </div>

      {showReplies && (
        <>
          <div
            onClick={() => setShowReplies(false)}
            className="fixed inset-0 bg-[#1E1E1E] opacity-50 z-40"
          />
          <CommentReplyModal />
        </>
      )}
    </>
  );
};

export default CourseComment;