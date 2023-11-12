import React from 'react'
import './footer.css'
import {BsLinkedin} from 'react-icons/bs' // importing icons from the react-icons library
import {FaGithub} from 'react-icons/fa'
import {SiLeetcode} from 'react-icons/si'
import {BsInstagram} from 'react-icons/bs'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <Link href="/" className='footer-logo'>Old Arya Connect</Link>

      <ul className="permalinks">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Me</Link></li>
        <li><Link to="/notes">Notes</Link></li>
        <li><Link to="/lost-and-found/allItems">Lost & found</Link></li>
        <li><Link to="/contact">Contact Me</Link></li>
      </ul>

      <div className="footer-socials">
        <a href="https://linkedin.com/in/ajmat-kathat-0a5b45252" target='_blank'><BsLinkedin /></a>
        <a href="https://github.com/ajmat6" target='_blank'><FaGithub /></a>
        <a href="https://instagram.com/_ajmat6" target='_blank'><BsInstagram /></a>
      </div>

      <div className="footer-copyright">
        <small> Old Arya Connect || &copy; All Rights Reserved 2023</small>
      </div>
    </footer>
  )
}

export default Footer
