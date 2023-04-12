import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import FormModal from "./FormModal";


function DataTable() {
  const [profile, setProfile] = useState([]);
  const[editable,setEditable]=useState({});
  const[showEditModal, setShowEditModal] = useState(false)
  const API_URI = "https://api.thomso.in/apiV1/assignment";


  //get data
  const getProfiles = async () => {
    try {
      const fetchData = await axios.get(API_URI);
      setProfile(fetchData.data);
    } catch (error) {
      console.log(error);
    }
  };



  //sending update data info
  const updateUser = (ids) => {
   setShowEditModal(true);
   setEditable(profile.find(user=>user.id===ids))
  };



  //delete data
  const removeUser = async (id) => {
    try {
      const res = await axios.delete(`${API_URI}/${id}`);
      console.log("Item successfully deleted.");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getProfiles();
  }, [profile]);

  return (
    <>
    <FormModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)} 
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        profile={profile}
        editable={editable}
        />
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.No</th>
          <th>First Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {profile.map((e) => {
          return (
            <tr>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.contact}</td>
              <td>
                <div>
                  <Button
                    variant="outline-dark"
                    style={{ marginRight: "10px" }}
                    onClick={() => updateUser(e.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => removeUser(e.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
    </>
  );
}

export default DataTable;
