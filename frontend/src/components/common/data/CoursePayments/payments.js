const statuses = ["تایید شده", "در انتظار تایید", "تایید نشده"]

export const paymentsData = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    courseGroup: `گروه ${i + 1}`,
    paymentDate: `1404/05/${Math.ceil(Math.random() * 30)}`,
    enteredDate: `140${Math.ceil(Math.random() * 4)}/0${Math.ceil(Math.random() * 10)}/${Math.ceil(Math.random() * 30)}`,
    paymentStatus: statuses[Math.floor(Math.random() * statuses.length)],
    amount: Math.floor(Math.random() * 200000)
}))