const teachersDetail = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    imageAddress: `/images/teachersDetail/${Math.floor(Math.random() * 3) + 1}.png`,
    title: `استاد شماره ${i + 1}`,
    describe: "ری‌اکت یک فریمورک قدرتمند و مدرن جاوااسکریپت است که برای ساخت رابط‌های  کاربری تعاملی و واکنش‌گرا طراحی شده است. با استفاده از ...",
    teacherName: `استاد شماره ${i + 1}`,
    levelName: "حرفه ای",
    cost: Math.floor(Math.random() * 100),
    likeCount: Math.floor(Math.random() * 10)
}))
export default teachersDetail