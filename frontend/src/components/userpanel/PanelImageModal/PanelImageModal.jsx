import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Avatar,
} from "@mui/material";

import img1 from "../../../assets/Images/userinfo2.jpg";
import img3 from "../../../assets/Images/plus.png";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddProfileImage } from "../../../core/services/api/post/AddProfileImage";
import { SelectPictureImage } from "../../../core/services/api/post/SelectPictureImage";
import { DeleteProfileImage } from "../../../core/services/api/delete/DeleteProfileImage";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";

const MAX_IMAGES = 6;

const PanelImageModal = ({
  open,
  onClose,
  onConfirm,
  apiImagesData = [],
  currentProfileUrl,
}) => {
  const { t } = useTranslation();

  const [selectedImage, setSelectedImage] = useState(currentProfileUrl || img1);

  const [selectedImageId, setSelectedImageId] = useState(null);

  const fileInputRef = useRef(null);

  const fixedImages = [{ id: null, puctureAddress: img1 }];

  const allImages = [
    ...fixedImages,
    ...apiImagesData.filter(
      (img) =>
        !fixedImages.some(
          (fImg) => fImg.puctureAddress === img.puctureAddress
        ) && img.puctureAddress
    ),
  ];

  const queryClient = useQueryClient();

  const getSelectedImageInfo = (address = selectedImage) => {
    return allImages.find((img) => img.puctureAddress === address);
  };

  const addImageMutation = useMutation({
    mutationFn: AddProfileImage,
    onSuccess: () => {
      toast.success("عکس جدید با موفقیت اضافه شد");
      queryClient.invalidateQueries(["profileInfo"]);
    },
    onError: () => {
      toast.error("خطا در افزودن عکس");
    },
  });

  const selectImageMutation = useMutation({
    mutationFn: SelectPictureImage,
    onSuccess: () => {
      toast.success("عکس پروفایل با موفقیت انتخاب شد");
      queryClient.invalidateQueries(["profileInfo"]);
    },
    onError: () => {
      toast.error("خطا در انتخاب عکس");
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: DeleteProfileImage,
    onSuccess: () => {
      toast.success("عکس با موفقیت حذف شد");
      queryClient.invalidateQueries(["profileInfo"]);
    },
    onError: () => {
      toast.error("خطا در حذف عکس");
    },
  });

  useEffect(() => {
    if (open) {
      const currentInfo = getSelectedImageInfo(currentProfileUrl);

      if (currentProfileUrl) {
        setSelectedImage(currentProfileUrl);
        setSelectedImageId(currentInfo?.id);
      } else if (allImages.length > 0) {
        setSelectedImage(allImages[0].puctureAddress);
        setSelectedImageId(allImages[0].id);
      } else {
        setSelectedImage(img1);
        setSelectedImageId(null);
      }
    }
  }, [open, currentProfileUrl, apiImagesData.length]);

  const handleImageClick = (imgAddress, imgId) => {
    if (imgAddress === img3) {
      if (apiImagesData.length < MAX_IMAGES) {
        fileInputRef.current.click();
      } else {
        toast.info(`شما مجاز به آپلود حداکثر ${MAX_IMAGES} عکس هستید.`);
      }
      return;
    }

    setSelectedImage(imgAddress);
    setSelectedImageId(imgId);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await addImageMutation.mutateAsync(file);
    }
    e.target.value = null;
  };

  const handleDeleteImage = () => {
    if (selectedImageId) {
      deleteImageMutation.mutate(selectedImageId);
    }
  };

  const handleConfirm = () => {
    const selectedInfo = getSelectedImageInfo();

    if (selectedInfo?.id) {
      selectImageMutation.mutate(selectedInfo.id, {
        onSuccess: () => {
          onConfirm(selectedImage);
          onClose();
        },
      });
    } else {
      onConfirm(selectedImage);
      onClose();
    }
  };

  const isPending =
    addImageMutation.isPending ||
    selectImageMutation.isPending ||
    deleteImageMutation.isPending;

  const isUploadLimitReached = apiImagesData.length >= MAX_IMAGES;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          width: "100%",
          backgroundColor: "#fff",
        },
      }}
    >
      <DialogContent className="dark:bg-[#333]">
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar
            src={selectedImage}
            alt="Profile"
            sx={{
              width: 160,
              height: 160,
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          />

          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
            {allImages.map((img, i) => (
              <Avatar
                key={`available-${img.id || img.puctureAddress}`}
                src={img.puctureAddress}
                alt={`Image ${i}`}
                onClick={() => handleImageClick(img.puctureAddress, img.id)}
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: "8px",
                  border:
                    selectedImage === img.puctureAddress
                      ? "2px solid #008C78"
                      : "2px solid transparent",
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
            ))}

            <Avatar
              src={img3}
              alt="Add"
              onClick={() => handleImageClick(img3, null)}
              sx={{
                width: 70,
                height: 70,
                borderRadius: "8px",
                border: "2px solid transparent",
                cursor: isUploadLimitReached ? "not-allowed" : "pointer",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
                opacity: isUploadLimitReached ? 0.6 : 1,
              }}
            />
          </Box>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            disabled={isPending || isUploadLimitReached}
          />
        </Box>
      </DialogContent>

      <DialogActions
        className="dark:bg-[#333]"
        sx={{ justifyContent: "space-between", px: 3, pb: 2, pt: 0 }}
      >
        <Button
          onClick={handleDeleteImage}
          variant="contained"
          // disabled={!canDelete}
          sx={{
            backgroundColor: "#ff0000ff",
            color: "#ffffffff",
            borderRadius: "12px",
            px: 3,
            fontFamily: "Estedad",
          }}
        >
          {deleteImageMutation.isPending ? (
            <div className="flex items-center justify-center gap-3">
              <p> در حال حذف... </p>
              <ClockLoader size={20} color="white" />
            </div>
          ) : (
            t("userinfo.modal.Delete")
          )}
        </Button>

        <Button
          onClick={handleConfirm}
          variant="contained"
          // disabled={!canConfirm}
          sx={{
            fontFamily: "Estedad",
            backgroundColor: "#008C78",
            color: "#fff",
            borderRadius: "12px",
            px: 3,
          }}
        >
          {addImageMutation.isPending ? (
            <div className="flex items-center justify-center gap-3">
              <p> درحال انجام... </p>
              <ClockLoader size={20} color="white" />
            </div>
          ) : (
            t("userinfo.modal.confirm")
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PanelImageModal;
