import { Button, Container } from "react-bootstrap";
import LinkWrapper from "./LinkWrapper"
import './Mint.css';
interface IMintProps {
    // any props that come into the component
}

const Mint: React.FC<IMintProps> = (props) => {
    return (
        // width: 25 and marginTop: 17 is pretty ugly but it does centerish it vertically.
        <Container style={{width: '25%', marginTop: '17%'}}> 
            <div className='d-flex flex-column mt-5 justify-content-center align-items-center bg-dark' >
                <LinkWrapper className='m-3' link='https://www.google.com'>Authenticate through Discord</LinkWrapper>
                <LinkWrapper className='m-3' link='https://www.google.com'>Authenticate through Reddit</LinkWrapper>
                <LinkWrapper className='m-3' link='https://www.google.com'>Authenticate through Twitter</LinkWrapper>
                <LinkWrapper className='m-3' link='https://www.google.com'>Authenticate through GitHub</LinkWrapper>
            </div>
        </Container> 
    )
}

export { Mint };