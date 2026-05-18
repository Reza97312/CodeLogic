import React, { useState, useEffect, useRef } from "react";
import StarRating from "../../../assets/Icons/StarRating";
import { courseRate } from "../../../core/services/api/post/courseRate";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const StarsRating = ({ course, totalStars = 5 }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const courseId = course?.courseId;
  const token = localStorage.getItem("token");

  const initialUserRate = course?.currentUserRateNumber ?? 0;

  const [rating, setRating] = useState(initialUserRate);
  const [hover, setHover] = useState(0);

  const updatingRef = useRef(false);

  const mutation = useMutation({
    mutationFn: ({ courseId: cid, starValue }) => courseRate(cid, starValue),

    onSuccess: (_data, variables) => {
      setRating(variables.starValue);
      toast.success(t("userSatisfaction.successToast"));
      queryClient.invalidateQueries({ queryKey: ["GETCOURSEBYID"] });
    },

    onError: (error) => {
      if (error?.response?.status === 401) return;
      if (error?.response?.status === 400) {
        toast.info(t("userSatisfaction.infoToast"));
      } else {
        toast.error(t("userSatisfaction.errorToast"));
      }
    },
  });

  useEffect(() => {
    if (!updatingRef.current) {
      setRating(initialUserRate);
    }
  }, [initialUserRate]);

  const onSetRating = (starValue) => {
    if (mutation.isLoading) return;

    if (course?.currentUserSetRate) {
      toast.info(t("userSatisfaction.infoToast"));
      return;
    }

    mutation.mutate({ courseId, starValue });
  };

  return (
    <div className="flex gap-2">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            style={{
              cursor: "pointer",
              color: starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
              fontSize: "2rem",
              transition: "color 0.2s",
            }}
            onClick={() => onSetRating(starValue)}
            onMouseEnter={() => token && setHover(starValue)}
            onMouseLeave={() => token && setHover(0)}
          >
            <StarRating />
          </span>
        );
      })}
    </div>
  );
};

export default StarsRating;
