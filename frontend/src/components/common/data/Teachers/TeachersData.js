const dataTeachers = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    pictureAddress: `/images/teachers/teachers${Math.floor(Math.random() * 4) + 1}.png`,
    fullName: `استاد شماره ${i + 1}`,
    courseCounts: Math.floor(Math.random() * 20),
    blogs: Math.floor(Math.random() * 10),
}));

// [
//     { id: 1, img: "./images/teachers/teachers1.png", title: 'دکتر محمدحسین بحرالعلومی', courses: '12', blogs: '3' },
//     { id: 2, img: "./images/teachers/teachers2.png", title: 'مهندس ترنر میجی', courses: '5', blogs: '0' },
//     { id: 3, img: "./images/teachers/teachers3.png", title: 'خانم لینا سیمون', courses: '15', blogs: '5' },
//     { id: 4, img: "./images/teachers/teachers4.png", title: 'دکتر جردن توماس', courses: '3', blogs: '8' },
//     { id: 5, img: "./images/teachers/teachers1.png", title: 'دکتر محمدحسین بحرالعلومی', courses: '12', blogs: '3' },

//     { id: 1, img: "./images/teachers/teachers1.png", title: 'دکتر محمدحسین بحرالعلومی', courses: '12', blogs: '3' },
//     { id: 2, img: "./images/teachers/teachers2.png", title: 'مهندس ترنر میجی', courses: '5', blogs: '0' },
//     { id: 3, img: "./images/teachers/teachers3.png", title: 'خانم لینا سیمون', courses: '15', blogs: '5' },
//     { id: 4, img: "./images/teachers/teachers4.png", title: 'دکتر جردن توماس', courses: '3', blogs: '8' },
//     { id: 5, img: "./images/teachers/teachers1.png", title: 'دکتر محمدحسین بحرالعلومی', courses: '12', blogs: '3' },

//     { id: 1, img: "./images/teachers/teachers1.png", title: 'دکتر محمدحسین بحرالعلومی', courses: '12', blogs: '3' },
//     { id: 2, img: "./images/teachers/teachers2.png", title: 'مهندس ترنر میجی', courses: '5', blogs: '0' },
//     { id: 3, img: "./images/teachers/teachers3.png", title: 'خانم لینا سیمون', courses: '15', blogs: '5' },
//     { id: 4, img: "./images/teachers/teachers4.png", title: 'دکتر جردن توماس', courses: '3', blogs: '8' },

// ]

export default dataTeachers;
