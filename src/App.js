import React, { Component } from 'react';
import { Row, Col, Modal, Carousel, Button } from 'react-bootstrap';
import './App.css';
import ra from './assets/img/right_arrow.svg';
import a from './assets/img/jd_349386_a.webp';
import b from './assets/img/jd_349386_b.webp';
import c from './assets/img/jd_349386_c.webp';
import d from './assets/img/jd_349386_d.webp';
import e from './assets/img/jd_349386_e.webp';
import v from './assets/video/9b17df22-bc0c-49cb-b2dc-dcf7989142ac.mp4';

const ASSET_TYPE = {
  PICTURE: 0,
  VIDEO: 1
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      data: [
        {
          title: "Adidas Originals 3-Stripes California Short Sleeve T-Shirt",
          price: 25.00,
          description: "Inspired by the archives, this men's 3-Stripes California Short Sleeve T-Shirt from adidas Originals adds a retro vibe to your look. In a fresh white colourway, this regular-fit tee is made from soft cotton fabric for laidback comfort. It features a crew neckline and short raglan sleeves, which rep adi's signature 3-Stripes in black. It's finished with a tonal Trefoil logo embroidered to the chest. Machine washable. | Our model is 6'2\" and wears a size medium.",
          assets: [
            {id: 0, src: a, type: ASSET_TYPE.PICTURE},
            {id: 1, src: b, type: ASSET_TYPE.PICTURE},
            {id: 2, src: c, type: ASSET_TYPE.PICTURE},
            {id: 3, src: d, type: ASSET_TYPE.PICTURE},
            {id: 4, src: e, type: ASSET_TYPE.PICTURE},
            {id: 5, src: v, type: ASSET_TYPE.VIDEO}
          ],
          activeAsset: 0
        }
      ]
    };
  }

  quickLook() {
    this.setState({
      showModal: true
    });
  }

  selectImage(key) {
    console.log(key)
    let data = this.state.data;
    data[0].activeAsset = key 
    this.setState({
      data
    })
  }

  handleClose() {
    this.setState({
      showModal: false
    });
  }

  render() {
    let assets = this.state.data[0].assets.map((asset) =>
      <div className="image-list-item">
        {asset.id === this.state.data[0].activeAsset ? <img className="selected-arrow" src={ra} alt="" /> : null}
        {asset.type === ASSET_TYPE.PICTURE ?
          <img className="asset" key={asset.id} onClick={() => this.selectImage(asset.id)} src={asset.src} alt="" /> :
          <p onClick={() => this.selectImage(asset.id)}>Video</p>
        }
      </div>)
    let carouselItems = this.state.data[0].assets.map((asset) =>
      asset.type === ASSET_TYPE.PICTURE ? <Carousel.Item>
        <img className="d-block w-100" src={asset.src} alt="" />
      </Carousel.Item>: null)
    let activeAsset = this.state.data[0].assets[this.state.data[0].activeAsset];
    return (
      <div className="App">
        <header className="App-header">
          <Button variant="primary" onClick={() => this.quickLook()}>Quick Look</Button>
        </header>
        

        <Modal size="xl" show={this.state.showModal} onHide={this.handleClose.bind(this)}>
          <Row>
            <Col xs={12} lg={5} className="active-asset desktop">
              {activeAsset.type === ASSET_TYPE.PICTURE ?
                <img className="asset selected" src={activeAsset.src} alt="" /> :
                <video className="asset selected" src={activeAsset.src} autoPlay={true} />
              }
            </Col>
            <Col xs={12} lg={1} className="no-padding">
              <div className="desktop">{assets}</div>
              <div className="mobile">
                <Carousel>{carouselItems}</Carousel>
              </div>
            </Col>
            <Col className="content-wrapper" xs={12} lg={6}>
              <Modal.Header closeButton={this.handleClose.bind(this)}>
                <Modal.Title>{this.state.data[0].title}</Modal.Title>        
              </Modal.Header>
              <Modal.Body>
                <h3>£{this.state.data[0].price}</h3>

                <Button className="button-buy" variant="dark">Buy Now</Button>

                <div className="description">
                  <h4>Description</h4>
                  <p>{this.state.data[0].description}</p>
                </div>
              </Modal.Body>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default App;
