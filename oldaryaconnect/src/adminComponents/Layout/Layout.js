import React, {useEffect} from 'react'
import './layout.css'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function AdminLayout(props) {
  let navigate = useNavigate();
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    if(!localStorage.getItem('otoken'))
    {
      navigate('/')
    }  
  }, [])  

  return (
    <>
        {
          props.sidebar ? 
          <div className='mx-3'>
              <div className='row'>
                <div className='col-md-2 sidebar' sidebar>
                  <ul>
                    <li><NavLink to='/adminHome'> Home </NavLink></li>
                    <li><NavLink to='/adminNotes'> Notes </NavLink></li>
                    <li><NavLink to='/users'> Users </NavLink></li>
                    {/* <li><NavLink to='/products'> Products </NavLink></li>
                    <li><NavLink to='/category'> Category </NavLink></li> */}
                  </ul>
                </div>
                <div className="col-md-10" style={{marginLeft: 'auto', paddingTop: '65px'}}>
                  {props.children}
                </div>
              </div>
          </div> : props.children
        }
    </>
  )
}

export default AdminLayout
