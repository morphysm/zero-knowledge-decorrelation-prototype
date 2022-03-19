import { Container, Button } from 'react-bootstrap';
import { useState, ReactNode } from 'react';
import { LinkButton } from './LinkButton';
import { Badges } from './Badges';
import './LandingBody.css';
interface ILandingBodyProps {

}

const LandingBody: React.FunctionComponent<ILandingBodyProps> = (props) => (
    // <Container className='d-flex mt-5 justify-content-center flex-column align-items-center'>
    <Container className='d-flex mt-5 justify-content-center flex-column align-items-center'>
        <div>
            <h1 className='text-center'><b>Get a Zeko Badge that certifies your contribution to DAOs on Discord.</b></h1>
            <h1 className='text-center'><b>Keep your privacy intact</b></h1>
            <LinkButton to='discord'>Claim your Zeko Badges!</LinkButton>
        </div>
        <div className='d-flex justify-content-center flex-column align-items-center mt-5'>
            <p className='text-center small'>
                Zeko badges are proof-of-contribution for DAOs based on the role you cover in their Discord server.
                The badge is a non-transferable NFT that will always be tied to your on-chain identity.
                This is done through Zero Knowledge Proofs. It means your Discord ID will never be tied to the wallet address that owns the NFT
            </p>
        </div>
        <div className='d-flex justify-content-center flex-column align-items-center mt-5'>
            <h1 className='text-center'><b>Why Zeko Badge is your next virtual Lamborghini?</b></h1>
            <p className='text-center small mt-3'>
                Zeko Badges streamline how DAOs engage with thier contributors.
                DAOs may allocate higher governance power to Badge Owners and distribute grant and payments straight to Badge  Owners without any off-chain address collection.
            </p>
            <p className='text-center small'>
                Once your Discord role is certified on-chain the applications that can be built are endless. Zeko Badges can be integrated into web3 social media as a sybil-resistant authentication mechanism, or it can be a crucial component of your on-chain resume.
            </p>

        </div>
        <div>
            <Badges images={[['discord.png', 'discord'], ['bufficorn.png', 'bufficorn'], ['mod.png', 'mod']]}></Badges>
        </div>
        <div style={{ marginTop: '10%' }}>
            <h1 className='text-center'> How does it work?</h1>
            <div className='d-flex flex-row'>
                <div className='d-flex flex-column justify-content-center align-items-center bg-dark mr-5'>
                    <img src='ambassadors.png'></img>
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <img src='zkp_magic.png' className='m-5 d-flex justify-content-center align-items-center' style={{ height: 100, width: 300 }}></img>
                    <p className='text-center small mt-5'>No association whatsoever between your Discord ID and the Ethereum address that owns the NFT</p>
                    {/* <p className='text-center small'></p> */}
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <Badges images={[['mod.png', 'mod']]}></Badges>
                </div>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <Button className='text-center p-3' style={{ backgroundColor: '#996633', borderColor: '#996633' }}>More advanced explanation</Button>
            </div>
        </div>
        <div style={{marginTop: '15%', marginBottom: '15%'}}>
            <Button className='bg-dark border border-dark'><p>Add your DAO as Zeko Badge Issuer</p></Button>
        </div>
    </Container>
)



export { LandingBody }
