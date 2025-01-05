import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt consequatur iure aperiam nemo et vel rerum quisquam eos. Nihil eaque consequatur perferendis repellat iusto tempora laudantium aut numquam sapiente eum.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae voluptate repellat explicabo deleniti, totam quos labore laborum quia illo doloremque! Iusto in assumenda neque at libero ullam porro quia.</p>
      <b className='text-gray-800'> Our Mission</b>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptas quos facilis eligendi aut. Necessitatibus, optio minima exercitationem culpa consectetur animi, voluptatem amet iure reiciendis possimus officiis eligendi cumque ea nostrum consequatur libero eum aspernatur nam maxime est, cupiditate sint!
      </p>
      </div>
      </div>
      <div className='text-4xl py-4 '>
      <Title text1={'WHY'} text2={"CHOOSE US"} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10  md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-800'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum dolore accusantium sed aliquam, aperiam deserunt rem error quia tempora facilis.</p>
        </div>
        <div className='border px-10  md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convinennce</b>
          <p className='text-gray-800'>Consectetur adipisicing elit. Rerum dolore accusantium sed aliquam, aperiam deserunt rem error quia tempora facilis.</p>
        </div>
        <div className='border px-10  md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Services</b>
          <p className='text-gray-800'> Rerum dolore accusantium sed aliquam, aperiam deserunt rem error quia tempora facilis. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos debitis non expedita!</p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default About
