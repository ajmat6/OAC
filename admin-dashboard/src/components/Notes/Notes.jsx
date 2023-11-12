import React, { useState } from 'react'
import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Layout from '../Layout/Layout'
import './notes.css'
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal/Modal'
import { addNotesTopic, getFrontTopicsAdmin } from '../../reducers/noteReducer'
import { AiOutlinePlus } from 'react-icons/ai'

function Notes(props) {
  let navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const notes = useSelector((state) => state.aNotes);

  const dispatch = useDispatch();

  const [notesTitle, setNotesTitle] = useState('');
  const [notesImage, setNotesImage] = useState('');
  const [notesLink, setNotesLink] = useState('');
  const [notesParentId, setNotesParentId] = useState('');

  const handleNotesImage = (e) => {
    setNotesImage(e.target.files[0]);
    console.log(notesImage)
  }

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getFrontTopicsAdmin());
    }
  }, [])

  const createNotesList = (notes, option = []) => {
    for (let note of notes) {
      option.push({
        value: note._id,
        title: note.title,
      });
    }

    return option;
  }

  const handleTopicSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('title', notesTitle);
    form.append('link', notesLink);
    form.append('notesImage', notesImage);
    if(notesParentId !== '') form.append('parentId', notesParentId);

    dispatch(addNotesTopic(form));
  }

  const renderTopicModal = () => {
    return (
      <Modal
        modaltitle="Add Notes Topic"
        add="Add Topic"
        handleSubmit={handleTopicSubmit}
        modalId="topic"
      >
        <input
          type="text"
          placeholder='Add Notes Title'
          className='form-control'
          value={notesTitle}
          onChange={(e) => setNotesTitle(e.target.value)}
        />

        <select
          className="form-control my-3"
          value={notesParentId}
          onChange={(e) => setNotesParentId(e.target.value)}
        >
          <option value={0}>Select Notes Parent</option>
          {createNotesList(notes.topics).map((value) => (
            <option key={value.value} value={value.value}>
              {value.title}
            </option>
          ))}
        </select>

        <label className='mt-3' style={{ marginLeft: '5px' }}>Notes Image</label>
        <input
          type="file"
          className='form-control mt-1 mb-1'
          onChange={handleNotesImage}
        />

        <input
          type='text'
          placeholder='Enter Link for the Notes'
          className='form-control mt-3'
          value={notesLink}
          onChange={(e) => setNotesLink(e.target.value)}
        />
      </Modal>
    )
  }

  // const renderBannersModal = () => {
  //   return (
  //     <Modal
  //       modaltitle="Add Home Page Banners"
  //       add="Add Banners"
  //       handleSubmit={handleBannersSubmit}
  //       modalId="banners"
  //     >
  //       <input
  //         type="text"
  //         placeholder='Add Title'
  //         className='form-control'
  //         value={title}
  //         onChange={(e) => settitle(e.target.value)}
  //       />

  //       <input
  //         type="text"
  //         placeholder='Add Description'
  //         className='form-control mt-3    '
  //         value={description}
  //         onChange={(e) => setdescription(e.target.value)}
  //       />

  //       <label className='mt-3'>Banner Images</label>
  //       <input
  //         type="file"
  //         className='form-control mt-1 mb-1'
  //         onChange={handleBanners}
  //       />

  //       {
  //         banners.length > 0 ? banners.map((banner, index) => <div key={index}>{banner.name}</div>) : null
  //       }
  //     </Modal>
  //   )
  // }

  // const renderProductsModal = () => {
  //   return (
  //     <Modal
  //       modaltitle="Add Home Page Products"
  //       add="Add Product"
  //       handleSubmit={handleProductsSubmit}
  //       modalId="products"
  //     >
  //       {/* Selecting the topic of the product */}
  //       <select
  //         className="form-control my-3"
  //         value={productTopic}
  //         onChange={(e) => setproductTopic(e.target.value)}
  //       >
  //         <option value={0}>Select Product Topic</option>
  //         {createTopicList(home.topics).map((value) => (
  //           <option key={value.value} value={value.value}>
  //             {value.title}
  //           </option>
  //         ))}
  //       </select>

  //       <input
  //         type="text"
  //         placeholder='Add Product Title'
  //         className='form-control'
  //         value={productTitle}
  //         onChange={(e) => setProductTitle(e.target.value)}
  //       />

  //       <select
  //         className="form-control my-3"
  //         value={productCategory}
  //         onChange={(e) => setproductCategory(e.target.value)}
  //       >
  //         <option value={0}>Select Category</option>
  //         {createCategoryList(category.categories).map((value) => (
  //           <option key={value.value} value={value.value}>
  //             {value.name}
  //           </option>
  //         ))}
  //       </select>

  //       <input
  //         type='number'
  //         placeholder='Add Front Price'
  //         className='form-control'
  //         value={frontPrice}
  //         onChange={(e) => setfrontPrice(e.target.value)}
  //       />

  //       <label className='mt-3' style={{ marginLeft: '5px' }}>Product Image</label>
  //       <input
  //         type="file"
  //         className='form-control mt-1 mb-1'
  //         onChange={handleProductImage}
  //       />

  //       {/* {
  //         productPic != '' ? <div>{productPic}</div> : null
  //       } */}
  //     </Modal>
  //   )
  // }

  // const renderUsers = () => {
  //   return (
  //     <table className="table" style={{fontSize: '16px'}}>
  //       <thead>
  //         <tr>
  //           <th scope="col">S.NO</th>
  //           <th scope="col">Name</th>
  //           <th scope="col">UserName</th>
  //           <th scope="col">Email</th>
  //           <th scope="col">Actions</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {
  //           auth.Users.length > 0 ?
  //           auth.Users.map((user, index) => 
  //             <tr >
  //               <th scope="row">{index + 1}</th>
  //               <td>{user.name}</td>
  //               <td>{user.username}</td>
  //               <td>{user.email}</td>
  //               <td>
  //                 {/* <span>
  //                   <button className="btn btn-primary" style={{cursor: 'pointer', margin: '4px 0'}} key={product._id} data-bs-toggle="modal"
  //               data-bs-target={`#productModal-${product._id}`}>View</button>
  //                   <button className="btn btn-primary" style={{marginLeft: '3px'}} onClick={() => removeItem(product._id)}>Delete</button>
  //                 </span> */}
  //               </td>
  //             </tr>
  //           ) : null
  //         }            
  //       </tbody>
  //     </table>
  //   );
  // };


  return (
    <Layout sidebar="true">
      <div className='container'>
        <div className="row">
          <div className='col-md-12'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Notes</h3>
              <div className='actionButtons' style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>Actions:</span>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#topic"><AiOutlinePlus style={{ marginRight: '4px' }} /><span>Add Notes Topics</span></button>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#products"><AiOutlinePlus style={{ marginRight: '4px' }} /><span>Add Notes</span></button>
              </div>
            </div>
          </div>
        </div>

        {/* Table to show users  */}
        <div className="row my-4">
          <div className="col-md-12">
            {renderUsers()}
          </div>
        </div>
      </div>


      {renderTopicModal()}
      {/* {renderBannersModal()}
      {renderProductsModal()} */}
    </Layout>
  )
}

export default Notes
