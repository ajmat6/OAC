import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, editItem, foundItem, getItemById, responseReply } from '../../../reducers/itemReducer';
import { useParams, useNavigate } from 'react-router-dom'
import LFLayout from '../LFLayout/LFLaoyout';
import { generatePublicURL } from '../../../urlConfig';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Modal from '../../Modal/Modal'
import monkey from '../../../assets/sorryMonkey.png'
import './ud.css'

const UserItemDetail = () => {
    const item = useSelector((state) => state.item.itemDetails);
    const loading = useSelector((state) => state.item.loading);
    const deleting = useSelector((state) => state.item.deletingItem);
    const editing = useSelector((state) => state.item.editing);
    const auth = useSelector((state) => state.auth);
    const mode = useSelector((state) => state.mode)

    const dispatch = useDispatch();
    const params = useParams();
    const id = params.itemId.split('=')[1];
    const navigate = useNavigate();

    const [itemName, setItemName] = useState("");
    console.log(itemName)
    const [description, setDescription] = useState("");
    const [question, setQuestion] = useState("");
    const [itemImages, setItemImages] = useState([]);
    const [itemType, setItemType] = useState("");

    const [foundAnswer, setFoundAnswer] = useState('');

    const [answered, setAnswered] = useState('false')

    useEffect(() => {
        dispatch(getItemById(id))
    }, [])

    useEffect(() => {
        if (item.length > 0) {
            setItemName(item[0].itemName)
            setDescription(item[0].description)
            setQuestion(item[0].question)
            setItemType(item[0].itemType)
            setItemImages(item[0].itemImages)
        }
    }, item)

    const formatDate = (date) => {
        if (date) {
            const d = new Date(date);
            return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
        }
    }

    const capitalize = (word) => {
        let character = word.charAt(0).toUpperCase();
        return character + word.slice(1)
    }

    const deleteItemm = () => {
        console.log("delete")
        dispatch(deleteItem(id))
            .then(() => {
                navigate('/lost-and-found/yourItems')
            })
    }

    const handleItemImages = async (e) => {
        setItemImages([...itemImages, e.target.files[0]])
    }

    const handleEditItemSubmit = () => {
        setItemName(item[0].itemName)
        const form = new FormData();

        form.append('id', id);
        form.append('itemName', itemName);
        form.append('description', description);
        form.append('itemType', itemType);
        form.append('question', question);

        for (let image of itemImages) {
            form.append('itemImages', image);
        }

        dispatch(editItem(form));
        dispatch(getItemById(id))
    }


    const renderEditItemModel = () => {
        return (
            <Modal
                modaltitle="Edit Item"
                add="Edit Item"
                handleSubmit={handleEditItemSubmit}
                modalId="edit"
            >
                <input
                    type="text"
                    // placeholder='Add Item Name'
                    className='form-control bg-[#636375]'
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder='Add Description'
                    className='form-control mt-3 bg-[#636375]'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    type="text"
                    placeholder='Add a question you want to ask who claims item found/lost'
                    className='form-control mt-3 bg-[#636375]'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />

                <select
                    className="form-control my-3 bg-[#636375]"
                    value={itemType}
                    onChange={(e) => { setItemType(e.target.value); console.log(itemType) }}
                    placeholder='Select Item Type'
                >
                    <option value='0'>Select Item Type</option>
                    <option value='lost'>Lost Item</option>
                    <option value='found'>Found Item</option>
                </select>

                <label className='' style={{ marginLeft: '5px' }}>Add Item Image</label>
                <input
                    type="file"
                    className='form-control mt-1 mb-1 bg-[#636375]'
                    onChange={handleItemImages}
                />

                {
                    itemImages.length > 0 ? itemImages.map((image, index) => (<div key={index}>{image.name}</div>)) : null
                }
            </Modal>
        )
    }

    const handleFoundSubmit = () => {
        const form = {
            itemId: id,
            response: foundAnswer
        }

        dispatch(foundItem(form));
    }

    const renderFoundModel = () => {
        return (
            <Modal
                modaltitle="Answer below question!"
                add="Submit"
                handleSubmit={handleFoundSubmit}
                modalId="found"
            >
                {item.length > 0 && <label>{item[0].question}</label>}
                <input
                    type="text"
                    placeholder='Give Response..'
                    className='form-control bg-[#636375]'
                    value={foundAnswer}
                    onChange={(e) => setFoundAnswer(e.target.value)}
                />
            </Modal>
        )
    }

    const respondingYes = (itemId, responseId) => {
        const form = {
            itemId,
            responseId,
            reply: 'yes'
        }

        dispatch(responseReply(form))
    }

    const respondingNo = (itemId, responseId) => {
        const form = {
            itemId,
            responseId,
            reply: 'no'
        }

        dispatch(responseReply(form))
    }

    return (
        <LFLayout>
            <section id='notes'>
                <h5 className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Item Details</h5>
                <h2>Do Share with your friends!</h2>

                {
                    item.length == 0 || deleting || editing?
                    <div id='loader' className='w-full mx-auto'></div> 
                    :
                    (
                        <div className='md:flex note-container container'>
                            <div className="md:flex">
                                <article className="note-item mx-auto">
                                    <h3 className='mb-2'>{item[0].itemName}</h3>
                                    <p><strong className='text-[#4db5ff]'>Description: </strong>{item[0].description}</p>
                                    <p><strong className='text-[#4db5ff]'>Type: </strong>{capitalize(item[0].itemType)}</p>
                                    <h2 className='mb-2'><strong className='text-[#4db5ff]'>Date: </strong>{formatDate(item[0].date)}</h2>
                                    {
                                        auth.userInfo._id === item[0].userId._id ?
                                            <div className='flex justify-center items-center gap-3 mt-3'>
                                                <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#edit">Edit</button>
                                                <button className='btn bg-[#d19494] text-black' onClick={deleteItemm}>Delete</button>
                                            </div> :
                                            <div className='flex justify-center items-center gap-3 mt-3'>
                                                <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#found">{item[0].itemType === 'lost' ? 'Found Item?' : 'Claim Item'}</button>
                                            </div>
                                    }
                                </article>
                            </div>
                            <div className=''>
                                <article className="note-item">
                                    <div className="note-item-image">
                                        <div className=''>
                                            <Carousel
                                                renderThumbs={() => { }} // to remove the small pics of the large one at bottom
                                                autoPlay={true} // or just autoPlay (true is the default value)
                                                infinite={true}
                                                mobileFirst={true}
                                            >
                                                {
                                                    item[0].itemImages.map((image, index) =>
                                                        <div key={index} className='h-[385px]'>
                                                            <img className='max-h-[350px] max-w-[100%] object-contain' src={generatePublicURL(image.img)} />
                                                        </div>
                                                    )
                                                }
                                            </Carousel>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    )
                }

                {
                    item.length > 0 && auth.userInfo._id === item[0].userId._id &&
                    <>
                        <h2 className='mt-[50px]'>RESPONSES</h2>
                        {
                            loading ?
                            <div id='loader' className='w-full mx-auto'></div> :
                            item[0].responses.length == 0 ?
                            <div className={`text-center`}>
                                <img src={monkey} alt="not available"  className='w-[200px] h-[200px] inline'/>
                                <div className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>No Responses Yet!</div>
                            </div> :
                            <div className="contact-options flex flex-row flex-wrap container">
                                {
                                    item[0].responses.map((response, index) =>
                                        <article className="contact-option w-[363px]" key={index}>
                                            <strong className='text-[#4db5ff]'>Question: </strong>
                                            <h2> {item[0].question}</h2>
                                            <strong className='text-[#4db5ff]'>Response: </strong>
                                            <h6 className='box-border'>{response.response}</h6>
                                            <a href="mailto:ajmat1130666@gmail.com" target="_blank">Give Response Appropriately!</a>
                                            <div>
                                                {
                                                    response.status === 'Pending' ?
                                                        <>
                                                            <button className='btn btn-primary' onClick={() => respondingYes(item[0]._id, response._id)}>Approve</button>
                                                            <button className='btn bg-[#d19494] text-black ml-2' onClick={() => respondingNo(item[0]._id, response._id)}>Discard</button>
                                                        </>
                                                        :
                                                        <div>You Have Already answered!</div>
                                                }
                                            </div>
                                        </article>
                                    ) 
                                }
                            </div>
                        }
                    </>
                }

                {renderEditItemModel()}
                {renderFoundModel()}
            </section >
        </LFLayout >
    )
}

export default UserItemDetail