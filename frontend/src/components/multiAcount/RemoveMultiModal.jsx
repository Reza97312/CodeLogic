import React from "react";
import { Modal } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RemoveMultiAcc } from "../../core/services/api/patch/RemoveMultiAcc";
import { toast } from "react-toastify";
import { removeItem, setItem } from "../../utils/helper/storage.services";
const RemoveMultiModal = ({ isOpen, toggleClose, id }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate: removeAcc, isPending } = useMutation({
    mutationKey: ["REMOVEMULACC"],
    mutationFn: () => RemoveMultiAcc(id),
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
    <Modal open={isOpen} onClose={toggleClose}>
      <div className="w-full max-w-md mx-auto mt-20 py-6 flex flex-col items-center  px-6 bg-white dark:bg-[#454545] rounded-xl shadow-lg">
        <h2 className="text-[19px] text-[#008C78] dark:text-[#008C78]  font-bold mb-4">
          {t("multi.delete")}
        </h2>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => removeAcc()}
            className=" cursor-pointer bg-[#008C78]
                    text-white px-3 py-2 rounded-2xl hover:shadow-md inline"
          >
            {t("multi.del")}
          </button>
          <button
            onClick={toggleClose}
            className=" cursor-pointer dark:border dark:border-[#EAEAEA] dark:text-white px-3 py-2 rounded-2xl"
          >
            {t("deleteModal.cancel")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveMultiModal;
