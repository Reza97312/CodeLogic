import React, { useState } from "react";
import del from "../../assets/Icons/A/greenBasket.png";
import userr from "../../assets/Icons/A/user.png";
import RemoveMultiModal from "./RemoveMultiModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ActiveMultiAcc } from "../../core/services/api/patch/ActiveMultiAcc";
import { toast } from "react-toastify";
import { removeItem, setItem } from "../../utils/helper/storage.services";
export const MultiAccTable = ({ items, toggleClose }) => {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const handleCloseRemove = () => setOpenRemoveModal(false);
  const queryClient = useQueryClient();
  const { mutate: UpdateMulti } = useMutation({
    mutationKey: ["UPDATEMULACC"],
    mutationFn: () => ActiveMultiAcc(items.id),
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      toggleClose();
      setItem("token", data.token);
      queryClient.invalidateQueries([
        "profileInfo",
        "resCourses",
        "ALLMULTIACOUNTS",
      ]);
    },
  });
  return (
    <>
      <div
        className="flex items-center justify-between hover:bg-[rgb(230,230,230)] px-4 border-b py-3 hover:border-[#008C78]
    transition duration-300
    "
      >
        <div
          onClick={() => UpdateMulti()}
          className=" flex items-center justify-start gap-4  cursor-pointer "
        >
          <img
            className="w-[28px] h-[28px] rounded-full object-cover"
            src={items?.currentPictureAddress || userr}
          />
          {items.fName ? items.fName : "بدون اسم"}
          {items.lName ? items.lName : ""}
        </div>
        <div className="flex items-center justify-center">
          <img
            onClick={() => setOpenRemoveModal(true)}
            src={del}
            className="w-[18px] h-[17px] object-contain cursor-pointer mt-2 "
          />
        </div>
      </div>
      {openRemoveModal && (
        <RemoveMultiModal
          isOpen={openRemoveModal}
          toggleClose={handleCloseRemove}
          id={items.id}
        />
      )}
    </>
  );
};
