const titles = ['آموزش ری اکت', 'آموزش نکست جی اس'];

export const FavoriteNewsData = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    newsTitle: titles[Math.floor(Math.random() * titles.length)],
    newsImage: `/images/courses/${Math.floor(Math.random() * 2) + 1}.png`,
    commentsCount: Math.ceil(Math.random() * 23),
    viewsCount: Math.ceil(Math.random() * 1000),
    likesCount: Math.ceil(Math.random() * 600),
    lastUpdate: `140${Math.ceil(Math.random() * 4)}/0${Math.ceil(Math.random() * 10)}/${Math.ceil(
        Math.random() * 30
    )}`,
}));
