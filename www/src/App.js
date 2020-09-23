import React, { useState, useEffect } from 'react';
import { Container, Jumbotron, Row, Col, Alert, Button, ButtonGroup } from 'reactstrap';
import axios from 'axios';
import ToDo from './ToDo'
import Products from './Products'

import './App.css';
import logo from './aws.png';

import config from './config';

function App() {
  const [alert, setAlert] = useState();
  const [alertStyle, setAlertStyle] = useState('info');
  const [page, setPage] = useState('changes');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertDismissable, setAlertDismissable] = useState(false);
  const [idToken, setIdToken] = useState('');
  const [toDos, setToDos] = useState([]);
  const [products, setProducts] = useState([]);
  

  useEffect(() => { 
    getIdToken();
    if (idToken.length > 0) {
      getAllTodos();
    }
  }, [idToken]);

  axios.interceptors.response.use(response => {
    console.log('Response was received');
    return response;
  }, error => {
    window.location.href = config.redirect_url;
    return Promise.reject(error);
  });

  function onDismiss() {
    setAlertVisible(false);
  }

  function updateAlert({ alert, style, visible, dismissable }) {
    setAlert(alert ? alert : '');
    setAlertStyle(style ? style : 'info');
    setAlertVisible(visible);
    setAlertDismissable(dismissable ? dismissable : null);
  }

  const clearCredentials = () => {
    window.location.href = config.redirect_url;
  }

  const getIdToken = () => {
    const hash = window.location.hash.substr(1);
    const objects = hash.split("&");
    objects.forEach(object => {
      const keyVal = object.split("=");
      if (keyVal[0] === "id_token") {
        setIdToken(keyVal[1]);
      }
    });
  };

  const getAllTodos = async () => {
    console.log("GETTING ALL TODOS")
    console.log(config.api_base_url)
    console.log(`${config.api_base_url}/item/`)
    const result = await axios({
      url: `${config.api_base_url}/item/`,
      headers: {
        Authorization: idToken
      }
    }).catch(error => {
      console.log(error);
    });
    //console.log(result)

    if (result && result.status === 401) {
      //clearCredentials();
    } else if (result && result.status === 200) {
      setToDos(result.data.Items);
    }
  };

  const getAllProducts = async () => {
    console.log("GETTING ALL PRODUCTS")
    console.log(`${config.api_base_url}/item/`)
    const result = await axios({
      url: `${config.api_base_url}/products/item/`,
      headers: {
        Authorization: idToken
      }
    }).catch(error => {
      console.log(error);
    });
    console.log(result)

    if (result && result.status === 401) {
      //clearCredentials();
    } else if (result && result.status === 200) {
      console.log(result.data.Items);
      setProducts(result.data.Items);
    }
  };

  const addToDo = async (index,event) => {
    
    //const newToDoInput = document.getElementById('newToDo');
    //const item = newToDoInput.value;

    if (!event || event === '') return;

    const newProduct = event;
    console.log('EVENT')
    console.log(JSON.stringify(event))

    const result = await axios({
      method: 'POST',
      url: `${config.api_base_url}/item/`,
      headers: {
        Authorization: idToken
      },
      data: newProduct
    });
    console.log('RESULTTTTT==',result)
    if (result && result.status === 401) {
      //clearCredentials();
    } else if (result && result.status === 200) {
      //getAllTodos();
      deleteToDo(index,newProduct.ERP)
    }
  }

  const deleteToDo = async (indexToRemove, itemId) => {
    if (indexToRemove === null) return;
    if (itemId === null) return;
    console.log("DELET PARAMS=="+indexToRemove+" "+itemId)
    const result = await axios({
      method: 'DELETE',
      url: `${config.api_base_url}/item/${itemId}`,
      headers: {
        Authorization: idToken
      }
    });

    if (result && result.status === 401) {
      //clearCredentials();
    } else if (result && result.status === 200) {
      const newToDos = toDos.filter((item, index) => index !== indexToRemove);
      setToDos(newToDos);
    }
  }

  const completeToDo = async (itemId) => {
    if (itemId === null) return;

    const result = await axios({
      method: 'POST',
      url: `${config.api_base_url}/item/${itemId}/done`,
      headers: {
        Authorization: idToken
      }
    });

    if (result && result.status === 200) {
      getAllTodos();
    }
  }


  const changePage = (newPage) => {
    setPage(newPage);

  };

  return (
    <div className="App">
      <Container>
        <Alert color={alertStyle} isOpen={alertVisible} toggle={alertDismissable ? onDismiss : null}>
          <p dangerouslySetInnerHTML={{ __html: alert }}></p>
        </Alert>
        <Jumbotron>
          <Row>
            {/* <Col md="6" className="logo">
              <h1>Serverless Todo</h1>
              <p>This is a demo that showcases AWS serverless.</p>
              <p>The application is built using the SAM CLI toolchain, and uses AWS Lambda, Amazon DynamoDB, and Amazon API Gateway for API services and Amazon Cognito for identity.</p>

              <img src={logo} alt="Logo" />
            </Col> */}
          <ButtonGroup>
            <Button onClick={(e) => changePage('changes')} color={(page === 'changes') ? 'primary' : 'secondary'}>Changes</Button>
            <Button onClick={(e) => changePage('products')} color={(page === 'products') ? 'primary' : 'secondary'}>Products</Button>
          </ButtonGroup>
            <Col md="12">
              {(idToken.length > 0 && page === 'changes') ?
                (
                  <ToDo updateAlert={updateAlert} toDos={toDos} addToDo={addToDo} deleteToDo={deleteToDo} completeToDo={completeToDo} />
                ) : (idToken.length > 0 && page === 'products') ? 
                (
                  <Products products={products}/>
                ) :
                 (
                  <Button
                    href={`https://${config.coginto_hosted_domain}/login?response_type=token&client_id=${config.aws_user_pools_web_client_id}&redirect_uri=${config.redirect_url}`}
                    color="primary"
                    className="mt-5 float-center"
                  >
                    Log In
                  </Button>
                )
              }
            </Col>
          </Row>
        </Jumbotron>
      </Container>
    </div >
  );
}

export default App;
