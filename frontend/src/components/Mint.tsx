import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import LinkWrapper from "./LinkWrapper"
interface IMintProps {
    // any props that come into the component
}

const Mint: React.FC<IMintProps> = (props) => {
    return (
        // width: 25 and marginTop: 17 is pretty ugly but it does centerish it vertically.
        <Container style={{width: '25%', marginTop: '17%'}}> 
            <div className='d-flex flex-column mt-5 justify-content-center align-items-center bg-dark' >
                <Button className='m-3' onClick={openDisc}>Authenticate through Discord</Button>
            </div>
        </Container> 
    )
}

function openDisc() {
    const pathName = 'https://discord.com/api/oauth2/authorize?client_id=945061636400627783&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fmint%2Fdiscord&response_type=code&scope=identify%20guilds.members.read';
    window.open(pathName, '_self');
}

export { Mint };