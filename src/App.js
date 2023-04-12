import './App.css';
import React,{useState} from 'react';
import DataTable from './Components/DataTable';
import Button from 'react-bootstrap/Button';
import { Container } from './styles/Container';
import FormModal from './Components/FormModal';


function App() {
const[viewModal, setViewModal]=useState(false);

  return (
    <Container>
      <h1 className="mb-3 mt-3">Employee Management Software</h1>
      <FormModal
        show={viewModal}
        onHide={() => setViewModal(false)} 
        viewModal={viewModal}
        setViewModal={setViewModal}
        />
      <div className="mb-5 mt-3">
        <Button variant="primary" size="lg" onClick={()=>setViewModal(true)}>
          Add Employee
        </Button>
      </div>
     <DataTable/>
    </Container>
  );
}

export default App;
