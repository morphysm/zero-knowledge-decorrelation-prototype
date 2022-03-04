import { Container, Button } from 'react-bootstrap';
import { useState, ReactNode } from 'react';
import { LinkButton } from './LinkButton';
import { Badges } from './Badges';
interface ILandingBodyProps {

}

const hTextSize = 32; 
const pTextSize = 24;
const LandingBody: React.FunctionComponent<ILandingBodyProps> = (props) => {
    return (
        <Container className='d-flex mt-5 justify-content-center flex-column align-items-center'>
            <div>
                <header className='text-center' style={{ fontSize: hTextSize }}><b>Show off your Web3 Contributions via Zeko ZK badges</b></header>
                <p className='text-center' style={{ fontSize: pTextSize }}>ZK badges are proof-of-membership for DAOs - it's a member badge that gets you access to perks. The badge is an Ethereum NFT, or non fungible token, that members can keep inside their Ethereum wallet</p>
                <LinkButton to='mint'>Get your ZK Badges!</LinkButton>
            </div>
            <div className='d-flex justify-content-center flex-column align-items-center' style={{ marginTop: '10%'}}>
                <header className='text-center' style={{fontSize: hTextSize}}>Why Claim Badge?</header>
                <p>Claiming a ZK Badges gives you bragging rights, project drops, raffles, governance, access to badge-only discord room and so much more</p>
                <Button className='bg-dark border border-dark '>Check for Claimable Badges</Button>
            </div>
            <div>
                <Badges images={[['discord.png', 'discord'], ['bufficorn.png', 'bufficorn'], ['mod.png', 'mod']]}></Badges>
            </div>
            <div>
                <header className='text-center' style={{ fontSize: hTextSize }}>Badges Supported</header>
                <Badges images={[['bufficorn.png', 'bufficorn'], ['mod.png', 'mod']]}></Badges>
                <p className='text-center'>Add your DAO as Zeko Badge issuer</p>
            </div>

        </Container>
    )
}


export { LandingBody }
