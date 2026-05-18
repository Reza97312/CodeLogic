import React from 'react'
import CourseComment from '../../common/CourseComment/CourseComment'
import CourseCommentForm from '../CourseCommentForm/CourseCommentForm'
import getCourseComments from '../../../core/services/api/get/getCourseComments'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'


const CourseComments = ({course}) => {

  const {t} = useTranslation();

  const courseCommentsDataa = [
    {id:1 , commentUserName: 'ادوارد جانسون', commentDate: '9 خرداد 1404', commentTitle: 'عنوان کامنت', commentDescribe: 'متن کامنت',
    commentLikeCount: 200, commentDisLikeCount: 200},
    {id:2 , commentUserName: 'ادوارد جانسون', commentDate: '9 خرداد 1404', commentTitle: 'عنوان کامنت', commentDescribe: 'متن کامنت',
    commentLikeCount: 200, commentDisLikeCount: 200},
    {id:3 , commentUserName: 'ادوارد جانسون', commentDate: '9 خرداد 1404', commentTitle: 'عنوان کامنت', commentDescribe: 'متن کامنت',
    commentLikeCount: 200, commentDisLikeCount: 200},
  ]

  const {data: courseCommentsData, isLoading} = useQuery({
    queryKey: ['GETCOURSECOMMENTS'], queryFn: () => getCourseComments(course.courseId)
  })

  return (
    <div className='flex flex-col gap-6 w-full mt-[20px] p-8 bg-[#FFFFFF] rounded-[25px]   dark:bg-[#393939]'>
      <h3 className='font-bold text-[18px] text-[#1E1E1E]   dark:text-[#DDDDDD]'>{t('courseComments.title')}</h3>
      <CourseCommentForm course={course}/>
      <div className='flex flex-col gap-8'>
        {
          courseCommentsDataa?.map((item , index) => {
            return <CourseComment item={item} key={index}/>
          })
        }
      </div>
    </div>
  )
}

export default CourseComments