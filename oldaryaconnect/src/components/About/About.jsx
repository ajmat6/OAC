import React from 'react'
import './about.css'
import Me from '../../assets/myphoto.jpg'
import {FaAward} from 'react-icons/fa'
import {IoSchoolOutline} from 'react-icons/io5'
import {VscFolderLibrary} from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import Layout from '../Layout/Layout'
import {useSelector} from 'react-redux'
// import Links from '../Links/Links'

function About() {
  const mode = useSelector((state) => state.mode)
  return (
    <Layout>
      <section id='about'>
        <h5 className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Get To Know</h5>
        <h2>About Me</h2>

        <div className="container about-container">
          <div className="">
            <div className="">
              <img className='rounded-full animate-pulse border border-black mb-16 mt-4' src={Me} alt="Me" />
            </div>
          </div>

          <div className="about-content">
            <div className="about-cards">
              <article className={`about-card-content ${mode.mode === 'dark' ? 'bg-[#2c2c6c]' : ''}`}>
                <FaAward className="about-icon"/>
                <h5>Programmer</h5>
                <small>Leetcode 450+ Questions Solved</small>
              </article>
              <article className="about-card-content">
                <IoSchoolOutline className="about-icon"/>
                <h5>College CGPA</h5>
                <small>9+ CGPA till current semester</small>
              </article>
              <article className="about-card-content">
                <VscFolderLibrary className="about-icon"/>
                <h5>Projects</h5>
                <small>10+ Projects (Aggregate)</small>
              </article>
            </div>

            <p className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>"Hey there! I'm Ajmat Kathat, a versatile programmer, full stack web developer, and video editor. With a passion for creating captivating digital experiences, I specialize in crafting elegant websites and seamlessly editing videos that leave a lasting impact. Through my expertise in programming languages and creative design, I strive to bring your visions to life. Let's collaborate and make your online presence truly shine!"</p>

            <Link to="/contact" className='btn btn-primary'>Contact Me</Link>
            <Link to="/adminLogin" className='btn btn-primary ml-3'>Login as Ajmat!</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default About
