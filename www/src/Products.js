import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable'
import { Button, ButtonGroup, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import ProductRow from './ProductRow'
import './Products.css';



function Products({ toDos, addToDo, deleteToDo, completeToDo }) {
  const [filter, setFilter] = useState('all');
  const [state, setState] = useState({changes: []})

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const callback = (item) => {
    
   setState(prevState => {
     //return { ...prevState,...prevState.changes.append(item)}
     //changes.append(item)
   })
  };



  return (
    <div className="Products">
      <Row>
        {/* <Col xs="12" className="mt-1 mb-1">
          <Form inline>
            <FormGroup>
              <Label for="newToDo" hidden>ToDo</Label>
              <Input type="text" name="todo" id="newToDo" placeholder="new item" />
            </FormGroup>
            <Button onClick={addToDo} color="primary" className="ml-1">Add</Button>
          </Form>
        </Col> */}
        
        {/* <Col xs="12" className="mt-1 mb-1">
          <ButtonGroup>
            <Button onClick={(e) => changeFilter('Added')} color={(filter === 'Added') ? 'primary' : 'secondary'}>Added</Button>
            <Button onClick={(e) => changeFilter('Changed')} color={(filter === 'Changed') ? 'primary' : 'secondary'}>Changed</Button>
            <Button onClick={(e) => changeFilter('Deleted')} color={(filter === 'Deleted') ? 'primary' : 'secondary'}>Deleted</Button>
          </ButtonGroup>
        </Col> */}
        <Col xs="12" className="mt-1 mb-1">
          <ul className="list-group">
          <Button onClick={()=>console.log("EXPORTING...")}>EXPORT</Button>
            {/* {toDos.filter(item => ((filter === 'Added') && item.change == 1 || (filter === 'Changed') && item.change == 0 || (filter === 'Deleted' ) && item.change == 2)).map((item, index) => (
              <li className="list-group-item" key={item.ERP}>
              
              <ProductRow addToDo={addToDo} deleteToDo={deleteToDo} item={item} index={index}/>       
              </li>
            ))} */}
            
          </ul>
        </Col>
      </Row>
    </div >
  );
}

export default Products;
