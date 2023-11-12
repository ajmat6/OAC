import React, {useState, useEffect} from 'react'
import LFNavbar from '../LFNavbar/LFNavbar'
import Layout from '../../Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Modal from '../../Modal/Modal'
import { addItem, getAllItems } from '../../../reducers/itemReducer'

const LFLayout = (props) => {
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [question, setQuestion] = useState('');
    const [itemImages, setItemImages] = useState([]);
    const [itemType, setItemType] = useState('');

    useEffect(() => {
        if (!auth.authenticate) {
            navigate('/signin')
        }
    }, [])

    const handlePostItemSubmit = () => {
        const form = new FormData();

        form.append('itemName', itemName);
        form.append('description', description);
        form.append('itemType', itemType);
        form.append('question', question);

        for (let image of itemImages) {
            form.append('itemImages', image);
        }

        dispatch(addItem(form));
        // dispatch(getAllItems());
    }

    const handleItemImages = (e) => {
        setItemImages([...itemImages, e.target.files[0]])
    }

    const renderPostItemModel = () => {
        return (
            <Modal
                modaltitle="Post Lost Item"
                add="Post Item"
                handleSubmit={handlePostItemSubmit}
                modalId="post"
            >
                <input
                    type="text"
                    placeholder='Add Item Name'
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
    return (
        <>
            <Layout>
                <LFNavbar />
                {props.children}

                {renderPostItemModel()}
            </Layout>
        </>
    )
}

export default LFLayout