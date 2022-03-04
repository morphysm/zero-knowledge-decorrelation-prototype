import { Button, Container } from "react-bootstrap";
import LinkWrapper from "./LinkWrapper"
import ConnectMM from './ConnectMM';

interface IMintProps {
    // any props that come into the component
}

const Mint: React.FC<IMintProps> = (props) => {
    return (
        // width: 25 and marginTop: 17 is pretty ugly but it does centerish it vertically.
        // style={{width: '25%', marginTop: '17%'}}
        <Container > 
            <div className='d-flex flex-column mt-5 justify-content-center align-items-center' >
                {/* <LinkWrapper className='m-3' link='https://www.google.com'>Authenticate through Discord</LinkWrapper> */}
                <h1>Get your Zeko Badges</h1>
                <p className ='justify-content-center align-items-center text-center'style={{width: 500}}>By connecting your wallet, we can grant you NFTs based on certain milestones or roles on different social medias.</p>
                <ConnectMM></ConnectMM>
            </div>
        </Container> 
    )

}

export { Mint };