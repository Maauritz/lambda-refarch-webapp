import React from 'react'
import ContentEditable from 'react-contenteditable'
import {Row, Col, Button } from 'reactstrap';
class ProductRow extends React.Component {
  constructor(props) {
    super()
    this.contentEditable = React.createRef();
    this.state = {item:props.item, index:props.index };
    this.addToDo = props.addToDo;
    this.deleteToDo = props.deleteToDo;
    this.index = props.index;
  };

  handleChange = index => (evt) => {
    this.state.item[index] = evt.target.value;
    console.log("ERPPP==="+this.state.item[index].ERP)
  };

  render = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
              <Row>
                  <h4>
                  {this.state.item.change === 0 ? 'CHANGED' : this.state.item.change === 1 ? 'ADDED' : this.state.item.change === 2 ? 'DELETED' : ''}

                  </h4>
              </Row>
              
              {Object.entries(this.state.item).map(([value, index]) => {
                      return (
                        <Row xs="2" sm="3" className={this.state.item.completed ? 'completed' : ''} style={{display: 'flex', flexDirection: 'row'}}>
                          <Col xs='5'>
                              {value.toString()}
                          </Col>
                          <Col xs='7' >
                              <ContentEditable
                                  //innerRef={this.contentEditable}
                                  html={this.state.item[value.toString()]} // innerHTML of the editable div
                                  disabled={false}       // use true to disable editing
                                  onChange={this.handleChange(value.toString())} // handle innerHTML change
                                  //tagName='product' // Use a custom HTML tag (uses a div by default)
                                  disabled={this.state.item.change == 2 ? true : false}
                              />
                          </Col>
                    
                        </Row>
                      )
              })}

            <Row xs="5" sm="4">
                <Button data-index={this.index} onClick={(e) => this.deleteToDo(this.state.index,this.state.item.ERP)} color="danger" size="sm" className="float-right toDoButton" title="Delete ToDo">
                  <span className="oi oi-delete"></span>
                </Button>
                <Button data-index={this.index} onClick={(e) => this.addToDo(this.index,this.state.item)} color="success" size="sm" className="float-right toDoButton" title="Complete ToDo">
                  <span className="oi oi-check"></span>
                </Button>
            </Row>
              
        </div>
    )
  }
};
export default ProductRow;