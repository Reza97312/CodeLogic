import React, { useState, useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import img1 from "../../assets/Images/jordantomas.png";
import { Field, Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PanelImageModal from "../../components/userpanel/PanelImageModal/PanelImageModal";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import GetProfileInfo from "../../core/services/api/Get/GetProfileInfo";
import { UpdateProfileInfo } from "../../core/services/api/put/UpdateProfileInfo";
import { toast } from "react-toastify";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMarker = ({ lat, lng, setAddress, setLat, setLng }) => {
  const map = useMap();

  const [position, setPosition] = useState({
    lat: lat || 35.6892,
    lng: lng || 51.389,
  });

  useEffect(() => {
    if (lat && lng) {
      const newPos = { lat: parseFloat(lat), lng: parseFloat(lng) };
      setPosition(newPos);
      map.flyTo(newPos, 15);
    }
  }, [lat, lng, map]);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      handleChange({ lat, lng });
    },
  });

  const handleChange = async ({ lat, lng }) => {
    setPosition({ lat, lng });
    setLat(lat);
    setLng(lng);

    try {
      const res = await fetch(
        `  https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=fa  `,
      );
      const data = await res.json();

      if (data && data.address) {
        const addr = data.address;

        const preferredOrder = [
          "state",
          "county",
          "city",
          "city_district",
          "suburb",
          "neighbourhood",
          "village",
          "road",
          "house_number",
        ];

        const pieces = [];

        for (const key of preferredOrder) {
          if (addr[key]) {
            const val = String(addr[key]).trim();

            if (key === "city_district") {
              const hasPersian = /[\u0600-\u06FF]/.test(val);
              pieces.push(hasPersian ? val : `منطقه ${val}`);
            } else if (key === "state") {
              const hasPersian = /[\u0600-\u06FF]/.test(val);
              pieces.push(hasPersian ? val : `استان ${val}`);
            } else {
              pieces.push(val);
            }
          }
        }

        if (pieces.length === 0 && data.display_name) {
          const parts = data.display_name
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean);
          const reversed = parts.reverse();
          setAddress(reversed.join(" - "));
          return;
        }

        const finalAddress = pieces.join(" - ");
        setAddress(finalAddress);
        return;
      }

      if (data && data.display_name) {
        const parts = data.display_name
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean);
        const reversed = parts.reverse();
        setAddress(reversed.join(" - "));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const lat = e.target.getLatLng().lat;
          const lng = e.target.getLatLng().lng;
          handleChange({ lat, lng });
        },
      }}
    />
  );
};

const UserPanelUserInfo = () => {
  const { data: profileData } = useQuery({
    queryKey: ["profileInfo"],
    queryFn: () => GetProfileInfo(),
  });
  const ph = (field, fallback = "") => {
    if (!profileData) return fallback;
    const d = profileData;

    const map = {
      name: d.fName,
      lastname: d.lName,
      nationalcode: d.nationalCode,
      phonenumber: d.phoneNumber,
      birthday: d.birthDay?.split("T")[0],
      aboutme: d.userAbout,
      gender: d.gender,
      adress: d.homeAdderess,
      email: d.email,
      telegram: d.telegramLink,
      linkdin: d.linkdinProfile,
    };

    return map[field] || fallback;
  };

  const [openModal, setOpenModal] = useState(false);
  const [profileImage, setProfileImage] = useState(
    profileData?.currentPictureAddress,
  );

  useEffect(() => {
    if (profileData && profileData.currentPictureAddress) {
      setProfileImage(profileData.currentPictureAddress);
    }
  }, [profileData]);

  const [activeTab, setActiveTab] = useState("general");

  const containerVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  };

  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: UpdateProfileInfo,
    onSuccess: () => {
      toast.success("ویرایش پروفایل با موفقیت انجام شد");
      queryClient.invalidateQueries(["profileInfo"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const birthdayPlaceholder = profileData?.birthDay
    ? new DateObject({
        date: new Date(profileData.birthDay),
        calendar: persian,
        locale: persian_fa,
      }).format("YYYY/MM/DD")
    : ph("birthday");

  const apiImagesData = profileData?.userImage || [];
  const currentProfileUrl = profileData?.currentPictureAddress;
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="w-full bg-[#F3F4F6] mt-5 md:mt-0 h-[85%] flex items-center rounded-4xl p-5 dark:bg-[#333]"
    >
      <div className="w-full h-full">
        <div className=" border-b-2 border-[#008c78] md:border-none dark:border-[#898989] py-5 md:py-0  sm:mx-auto md:mx-0 sm:w-[80%] md:w-full mb-5 md:mb-0  sm:flex sm:justify-center lg:justify-start ">
          <motion.button
            variants={itemVariants}
            onClick={() => setActiveTab("general")}
            className={`  cursor-pointer text-[10px] sm:text-[16px] transition-all duration-300 rounded-xl py-2 px-1 sm:px-2 border-1 ${
              activeTab === "general"
                ? "text-[white] bg-[#008C78] border-none"
                : "text-[#848484] border-[#848484]"
            }`}
          >
            {t("userinfo.tabs.general")}
          </motion.button>
          <motion.button
            variants={itemVariants}
            onClick={() => setActiveTab("location")}
            className={`cursor-pointer text-[10px] sm:text-[16px] transition-all duration-300 rounded-xl py-2 px-1 sm:px-2 border-1 ${
              activeTab === "location"
                ? "text-[white] bg-[#008C78] border-none"
                : "border-[#848484] text-[#848484]"
            } ${isRtl ? " mr-1 sm:mr-5" : " ml-1 sm:ml-5"}`}
          >
            {t("userinfo.tabs.location")}
          </motion.button>
          <motion.button
            variants={itemVariants}
            onClick={() => setActiveTab("social")}
            className={` cursor-pointer text-[10px] sm:text-[16px] transition-all duration-300 rounded-xl py-2 px-1 sm:px-2 border-1 ${
              activeTab === "social"
                ? "text-[white] bg-[#008C78] border-none"
                : "border-[#848484] text-[#848484]"
            } ${isRtl ? " mr-1 sm:mr-5" : " ml-1 sm:ml-5"}`}
          >
            {t("userinfo.tabs.social")}
          </motion.button>
        </div>

        <Formik
          enableReinitialize={true}
          initialValues={{
            name: profileData?.fName,
            lastname: profileData?.lName,
            nationalcode: profileData?.nationalCode,
            gender:
              profileData?.gender === true
                ? "male"
                : profileData?.gender === false
                  ? "female"
                  : "",
            birthday: profileData?.birthDay,
            phonenumber: profileData?.phoneNumber,
            aboutme: profileData?.userAbout,
            adress: profileData?.homeAdderess,
            lat: profileData?.latitude,
            lng: profileData?.longitude,
            email: profileData?.email,
            telegram: profileData?.telegramLink,
            linkdin: profileData?.linkdinProfile,
          }}
          onSubmit={(values) => {
            updateProfileMutation.mutate(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="w-full h-[92%]">
              <AnimatePresence mode="wait">
                {/* {activeTab === "general" && (
                  <motion.div
                    key="general"
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    <motion.div
                      variants={itemVariants}
                      className="w-full h-[20%] flex items-center justify-center relative  "
                    >
                      <div className="  h-full w-[10%] relative inline-block ">
                        <img
                          className="h-full   cursor-pointer rounded-full object-cover"
                          src={profileImage}
                          onClick={() => setOpenModal(true)}
                        />

                        <div
                          className={`absolute bottom-1 ${
                            isRtl ? "right-1" : "left-1"
                          } bg-[#EAEAEA] shadow-lg p-2 sm:p-1.5 rounded-full cursor-pointer flex items-center justify-center`}
                        >
                          <CreateIcon className="text-[#848484] !text-[20px] sm:!text-[16px]" />
                        </div>
                      </div>

                      <PanelImageModal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        onConfirm={(selectedImage) => {
                          setProfileImage(selectedImage);
                          setOpenModal(false);
                        }}
                        apiImagesData={apiImagesData}
                        currentProfileUrl={currentProfileUrl}
                      />
                    </motion.div>

                    <div
                      className={`w-full h-[80%] sm:grid sm:grid-cols-2  sm:grid-cols-2  sm:gap-x-0 sm:gap-y-3    ${
                        isRtl ? "sm:pr-13" : "pl-13"
                      }`}
                    >
                      <motion.div
                        variants={itemVariants}
                        className="w-[90%] mx-auto sm:mx-0 mb-3 sm:mb-0"
                      >
                        <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                          {t("userinfo.fields.name")}
                        </p>
                        <Field
                          type="text"
                          name="name"
                          placeholder={ph("name")}
                          className="dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                        />
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="w-[90%] mx-auto sm:mx-0 mb-3 sm:mb-0"
                      >
                        <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                          {t("userinfo.fields.lastname")}
                        </p>
                        <Field
                          type="text"
                          name="lastname"
                          placeholder={ph("lastname")}
                          className="dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                        />
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="w-[90%] mx-auto sm:mx-0 mb-3 sm:mb-0"
                      >
                        <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                          {t("userinfo.fields.nationalcode")}
                        </p>
                        <Field
                          type="text"
                          name="nationalcode"
                          placeholder={ph("nationalcode")}
                          className="dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                        />
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="w-[90%] mx-auto sm:mx-0 mb-3 sm:mb-0"
                      >
                        <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                          {t("userinfo.fields.gender")}
                        </p>
                        <div className="relative w-full">
                          <Field
                            as="select"
                            name="gender"
                            className="dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc]
                            outline-none w-full mb-1 bg-[white] focus:outline-none focus:ring-2
                            focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1
                            border-[#EAEAEA] text-[#848484] rounded-2xl appearance-none cursor-pointer"
                          >
                            <option value="" disabled>
                              {ph("gender")}
                            </option>
                            <option value="male">
                              {t("userinfo.gender.male")}
                            </option>
                            <option value="female">
                              {t("userinfo.gender.female")}
                            </option>
                          </Field>

                          <div
                            className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-[#848484] ${
                              isRtl ? "left-4" : "right-4"
                            }`}
                          >
                            <ExpandMoreIcon />
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="w-[90%] mx-auto sm:mx-0 mb-3 sm:mb-0"
                      >
                        <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                          {t("userinfo.fields.birthday")}
                        </p>

                        <DatePicker
                          calendar={persian}
                          locale={persian_fa}
                          containerClassName="w-full"
                          inputClass=" cursor-pointer  dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                          value={values.birthday}
                          onChange={(date) => {
                            setFieldValue(
                              "birthday",
                              date?.toDate?.()?.toISOString(),
                            );
                          }}
                          placeholder={birthdayPlaceholder}
                        />
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="w-[90%] mx-auto sm:mx-0 mb-3 sm:mb-0"
                      >
                        <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                          {t("userinfo.fields.phonenumber")}
                        </p>
                        <Field
                          name="phonenumber"
                          type="text"
                          placeholder={ph("phonenumber")}
                          className="dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                        />
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="w-[90%] mx-auto sm:mx-0 mb-3 sm:mb-0"
                      >
                        <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                          {t("userinfo.fields.aboutme")}
                        </p>
                        <Field
                          name="aboutme"
                          type="text"
                          placeholder={ph("aboutme")}
                          className="dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                        />
                      </motion.div>

                      <motion.div
                        className=" text-center sm:text-end w-[100%] sm:w-[91%]   "
                        variants={itemVariants}
                      >
                        <button
                          type="submit"
                          className={`bg-[#008C78] text-[white] rounded-2xl p-3 mt-8 cursor-pointer w-[60%] sm:w-auto `}
                        >
                          {t("userinfo.buttons.edit")}
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                )} */}

                {activeTab === "general" && (
                  <motion.div
                    key="general"
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0 }}
                    className="w-full h-full  "
                  >
                    <motion.div
                      variants={itemVariants}
                      className="w-full h-[20%] flex items-center justify-center relative md:mt-3 md:mb-1 lg:mb-0 xl:mt-0 "
                    >
                      <div className="  h-full w-[100px] sm:w-[115px] md:w-[90px] lg:w-[100px]  2xl:w-[10%] relative md:inline-block  flex justify-center  ">
                        <img
                          className="h-[98px] w-[98px] sm:h-[110px] sm:w-[110px] md:h-[90px] md:w-[90px] lg:h-[98px] lg:w-[98px]  cursor-pointer rounded-full object-cover "
                          src={profileImage}
                          onClick={() => setOpenModal(true)}
                        />

                        <div
                          className={`absolute bottom-1 ${
                            isRtl ? "right-[5%]" : "left-[5%]"
                          } bg-[#EAEAEA] shadow-lg p-2 sm:p-1.5 rounded-full cursor-pointer flex items-center justify-center`}
                        >
                          <CreateIcon className="text-[#848484] !text-[20px] sm:!text-[16px]" />
                        </div>
                      </div>

                      <PanelImageModal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        onConfirm={(selectedImage) => {
                          setProfileImage(selectedImage);
                          setOpenModal(false);
                        }}
                        apiImagesData={apiImagesData}
                        currentProfileUrl={currentProfileUrl}
                      />
                    </motion.div>

                    <div
                      className={`w-full h-[80%] sm:grid sm:grid-cols-2  sm:grid-cols-2  sm:gap-x-0 sm:gap-y-3    ${
                        isRtl ? "sm:pr-13" : "sm:pl-13"
                      }`}
                    >
                      <motion.div
                        variants={itemVariants}
                        className="w-[90%] mx-auto sm:mx-0 mb-3 sm:mb-0"
                      >
                        <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                          {t("userinfo.fields.name")}
                        </p>
                        <Field
                          type="text"
                          name="name"
                          placeholder={ph("name")}
                          className="dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full md:mb-0 lg:mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                        />
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="w-[90%] mx-auto sm:mx-0 mb-3 sm:mb-0"
                      >
                        <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                          {t("userinfo.fields.lastname")}
                        </p>
                        <Field
                          type="text"
                          name="lastname"
                          placeholder={ph("lastname")}
                          className="dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full  md:mb-0 lg:mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                        />
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="w-[90%] mx-auto sm:mx-0 mb-3 sm:mb-0"
                      >
                        <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                          {t("userinfo.fields.nationalcode")}
                        </p>
                        <Field
                          type="text"
                          name="nationalcode"
                          placeholder={ph("nationalcode")}
                          className="dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full  md:mb-0 lg:mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                        />
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="w-[90%] mx-auto sm:mx-0 mb-3 sm:mb-0"
                      >
                        <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                          {t("userinfo.fields.gender")}
                        </p>
                        <div className="relative w-full">
                          <Field
                            as="select"
                            name="gender"
                            className="dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc]
                            outline-none w-full  md:mb-0 lg:mb-1 bg-[white] focus:outline-none focus:ring-2
                            focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1
                            border-[#EAEAEA] text-[#848484] rounded-2xl appearance-none cursor-pointer"
                          >
                            <option value="" disabled>
                              {ph("gender")}
                            </option>
                            <option value="male">
                              {t("userinfo.gender.male")}
                            </option>
                            <option value="female">
                              {t("userinfo.gender.female")}
                            </option>
                          </Field>

                          <div
                            className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-[#848484] ${
                              isRtl ? "left-4" : "right-4"
                            }`}
                          >
                            <ExpandMoreIcon />
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="w-[90%] mx-auto sm:mx-0 mb-3 sm:mb-0"
                      >
                        <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                          {t("userinfo.fields.birthday")}
                        </p>

                        <DatePicker
                          calendar={persian}
                          locale={persian_fa}
                          containerClassName="w-full"
                          inputClass=" cursor-pointer  dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full  md:mb-0 lg:mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                          value={values.birthday}
                          onChange={(date) => {
                            setFieldValue(
                              "birthday",
                              date?.toDate?.()?.toISOString(),
                            );
                          }}
                          placeholder={birthdayPlaceholder}
                        />
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="w-[90%] mx-auto sm:mx-0 mb-3 sm:mb-0"
                      >
                        <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                          {t("userinfo.fields.phonenumber")}
                        </p>
                        <Field
                          name="phonenumber"
                          type="text"
                          placeholder={ph("phonenumber")}
                          className="dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full  md:mb-0 lg:mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                        />
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="w-[90%] mx-auto sm:mx-0 mb-3 sm:mb-0"
                      >
                        <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                          {t("userinfo.fields.aboutme")}
                        </p>
                        <Field
                          name="aboutme"
                          type="text"
                          placeholder={ph("aboutme")}
                          className="dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full  md:mb-0 lg:mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                        />
                      </motion.div>

                      <motion.div
                        className=" text-center sm:text-end w-[100%] sm:w-[91%]   "
                        variants={itemVariants}
                      >
                        <button
                          type="submit"
                          className={`bg-[#008C78] text-[white] rounded-2xl p-3 mt-8 cursor-pointer w-[60%] sm:w-auto `}
                        >
                          {t("userinfo.buttons.edit")}
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "location" && (
                  <motion.div
                    key="location"
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-between items-between h-full text-[#848484]"
                  >
                    <motion.div
                      variants={itemVariants}
                      className="  w-[100%] sm:w-[80%] mx-auto md:mx-0 md:w-full  mb-4  md:mt-5"
                    >
                      <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                        {t("userinfo.location.adress")}
                      </p>
                      <Field
                        type="text"
                        name="adress"
                        placeholder={t("userinfo.location.adressplace")}
                        className=" text-[11px] sm:text-[15px] dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                      />
                    </motion.div>

                    <motion.div className="flex justify-between w-full sm:w-[80%] md:w-auto mx-auto md:mx-0 mb-0 sm:mb-3 md:mb-0 ">
                      <motion.div variants={itemVariants} className="w-[45%]">
                        <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                          {t("userinfo.location.height")}
                        </p>
                        <Field
                          type="text"
                          name="lat"
                          placeholder={t("userinfo.location.heightplace")}
                          className=" text-[11px] sm:text-[15px] dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                        />
                      </motion.div>
                      <motion.div variants={itemVariants} className="w-[45%]">
                        <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                          {t("userinfo.location.width")}
                        </p>
                        <Field
                          type="text"
                          name="lng"
                          placeholder={t("userinfo.location.widthplace")}
                          className=" text-[11px] sm:text-[15px] dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                        />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="  w-full sm:w-[80%] md:w-full mx-auto md:mx-0 h-[100px] sm:h-[120px] md:h-[45%] mt-3 mb-3  "
                    >
                      <MapContainer
                        center={[35.6892, 51.389]}
                        zoom={15}
                        className="w-full h-full rounded-4xl border-2 border-[#008c78] "
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <LocationMarker
                          className="border-5 border-red-400"
                          lat={values.lat}
                          lng={values.lng}
                          setAddress={(val) => setFieldValue("adress", val)}
                          setLat={(val) => setFieldValue("lat", val)}
                          setLng={(val) => setFieldValue("lng", val)}
                        />
                      </MapContainer>
                    </motion.div>

                    <div className=" w-full sm:w-[80%] md:w-full mx-auto md:mx-0 ">
                      <motion.div
                        variants={itemVariants}
                        className="bg-[#008C78] text-[white] rounded-2xl text-[12px] sm:text-[16px] p-3 w-[50%] sm:w-[30%] md:w-[35%] 2xl:w-[20%] text-center cursor-pointer"
                      >
                        <button className="cursor-pointer ">
                          {t("userinfo.location.button")}
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "social" && (
                  <motion.div
                    key="social"
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0 }}
                    className="flex flex-col  justify-evenly  h-full text-[#848484] "
                  >
                    <div className="flex justify-between flex-col md:flex-row ">
                      <motion.div
                        variants={itemVariants}
                        className=" w-full sm:w-[80%] md:w-[47%] mx-auto md:mx-0"
                      >
                        <p className="mb-2 indent-3 text-[11px]  sm:text-[16px] dark:text-[white]">
                          {t("userinfo.social.email")}
                        </p>
                        <Field
                          type="text"
                          name="email"
                          placeholder={ph("email")}
                          className="dark:bg-[#454545]  dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full mb-5 md:mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                        />
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className=" w-full sm:w-[80%] md:w-[47%] mx-auto md:mx-0 "
                      >
                        <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                          {t("userinfo.social.telegram")}
                        </p>
                        <Field
                          type="text"
                          name="telegram"
                          placeholder={ph("telegram")}
                          className="dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full mb-5 md:mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      variants={itemVariants}
                      className="w-full sm:w-[80%] md:w-[47%] mx-auto md:mx-0"
                    >
                      <p className="mb-2 indent-3 text-[11px] sm:text-[16px] dark:text-[white]">
                        {t("userinfo.social.linkdin")}
                      </p>
                      <Field
                        type="text"
                        name="linkdin"
                        placeholder={ph("linkdin")}
                        className="dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#EAEAEA] text-[#848484] rounded-2xl"
                      />
                      <motion.button
                        variants={itemVariants}
                        type="submit"
                        className="bg-[#008C78]  text-[white] w-[50%] sm:w-[40%] md:w-auto text-[12px] sm:text-[15px] md:text-[16px] rounded-2xl p-3 w-[15%] text-center cursor-pointer mt-8 md:mt-16"
                      >
                        {t("userinfo.social.button")}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
};

export default UserPanelUserInfo;
