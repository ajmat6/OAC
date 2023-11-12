import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './users.css'
import { getAllUsers } from "../../reducers/userAuthReducer";
import AdminLayout from "../Layout/Layout";

function Users() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); 

  useEffect(() => {
    dispatch(getAllUsers());
  }, [])

  const renderProducts = () => {
    return (
      <table className="table bg-black" style={{fontSize: '16px'}}>
        <thead>
          <tr>
            <th scope="col">S.NO</th>
            <th scope="col">Name</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            auth.Users.length > 0 ?
            auth.Users.map((user, index) => 
              <tr >
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {/* <span>
                    <button className="btn btn-primary" style={{cursor: 'pointer', margin: '4px 0'}} key={product._id} data-bs-toggle="modal"
                data-bs-target={`#productModal-${product._id}`}>View</button>
                    <button className="btn btn-primary" style={{marginLeft: '3px'}} onClick={() => removeItem(product._id)}>Delete</button>
                  </span> */}
                </td>
              </tr>
            ) : null
          }            
        </tbody>
      </table>
    );
  };

  return (
    <AdminLayout sidebar="true">
      <div className="">
        <div className="row">
          <div className="col-md-12">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3> Users </h3>
            </div>
          </div>
        </div>

        {/* Table to show Products  */}
        <div className="row my-4">
          <div className="col-md-12">
            {renderProducts()}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Users;
