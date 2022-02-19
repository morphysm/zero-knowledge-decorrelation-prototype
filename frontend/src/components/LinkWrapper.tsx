import React,{useState} from 'react';
import { Modal, Button } from "react-bootstrap";
import {HOSTNAME} from '../environment';

//https://www.pluralsight.com/guides/create-a-link-that-an-app-will-open-in-a-popup

//{link} means destructure props and grab the link from it. :{link: string} means that link is of type string.
//{children} is the text between the <LinkWrapper> </LinkWrapper> tags
export default function LinkWrapper({link, children, className}: {link: string, children: string, className: string}) { 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const url = new URL(link)
    console.log(url)
    if (url.hostname === HOSTNAME ) return <a target="_blank" href={link}>{link}</a>
    else
    return (
      <>
        <Button className={className} onClick={handleShow}>
          {children}
        </Button>
  
        <Modal show={show} onHide={handleClose}>
            <Modal.Title>Link Popup</Modal.Title>
          <Modal.Body><iframe src={link} style={{width:'100%',height:'400px'}}/></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }