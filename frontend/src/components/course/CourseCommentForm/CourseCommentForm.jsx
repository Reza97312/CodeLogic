import React, { useState } from 'react'
import { addCommentCourses } from '../../../core/services/api/post/addCommentCourses';
import { useTranslation } from 'react-i18next'
import {useMutation} from '@tanstack/react-query'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup'


const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required('عنوان نظر الزامی است')
    .min(5, 'عنوان باید حداقل 5 کاراکتر باشد')
    .max(100, 'عنوان نمی‌تواند بیشتر از 100 کاراکتر باشد'),
  describe: yup
    .string()
    .required('متن نظر الزامی است')
    .min(10, 'متن نظر باید حداقل 10 کاراکتر باشد')
    .max(1000, 'متن نظر نمی‌تواند بیشتر از 1000 کاراکتر باشد'),
});


const CourseCommentForm = ({course}) => {

  const {t} = useTranslation();

  const fieldClass = 'py-4 font-regular text-base text-[#848484] indent-4 bg-[#F3F4F6] rounded-[25px] outline-0 dark:bg-[#1E1E1E]'

  const token = localStorage.getItem('token')
  const mutation = useMutation({
    mutationFn: ({ title, describe }) => addCommentCourses(course.courseId, title, describe, token),
    onSuccess: () => toast.success(t('courseCommentForm.successToast')),
    onError: () => toast.error(t('courseCommentForm.errorToast')),
  })
  const onSubmit = (values, { resetForm }) => {
    if (!token) return toast.error(t('login.loginToast'))
    mutation.mutate(values)
    resetForm()
  }

  
  return (
    <Formik initialValues={{ title: '', describe: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form className='flex flex-col gap-6 
      md:w-[336px]
      lg:w-[823px]'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4'>
            {
              <label className='font-bold text-base text-[#1E1E1E]
              dark:text-[#CCCCCC]'>{t('courseCommentForm.titleInputsTitle')}</label>
            }
            <Field name='title' type="text" placeholder={t('courseCommentForm.titleInputsPlcholder')} className={fieldClass}/>
          </div>
          <ErrorMessage name='title' component={'span'} className='font-regular text-sm text-[#CC0000]'/>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4'>
            {
              <label className='font-bold text-base text-[#1E1E1E]
              dark:text-[#CCCCCC]'>{t('courseCommentForm.textInputsTitle')}</label>
            }
            <Field name='describe' type="text" placeholder={t('courseCommentForm.textInputsPlcholder')} className={fieldClass}/>
          </div>
          <ErrorMessage name='describe' component={'span'} className='font-regular text-sm text-[#CC0000]'/>
        </div>
        <button 
        type='submit' 
        className='py-2 px-4 text-[#FFFFFF] bg-[#008C78] rounded-3xl cursor-pointer   active:brightness-80'>
          {t('courseCommentForm.sendBtn')}
        </button>
      </Form>
    </Formik>
  )
}

export default CourseCommentForm