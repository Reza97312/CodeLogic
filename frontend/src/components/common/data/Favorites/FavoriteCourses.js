const titles = ['آموزش ری اکت', 'آموزش نکست جی اس'];
const mode = ['انلاین', 'حضوری'];

export const FavoriteCoursesData = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    courses: titles[Math.floor(Math.random() * titles.length)],
    coursesImage: `/images/courses/${Math.floor(Math.random() * 2) + 1}.png`,
    caption: 'لورم ایپسوم متن ساختگی با',
    meetingMode: mode[Math.floor(Math.random() * mode.length)],
    lastUpdate: `140${Math.ceil(Math.random() * 4)}/0${Math.ceil(Math.random() * 10)}/${Math.ceil(
        Math.random() * 30
    )}`,
}));
