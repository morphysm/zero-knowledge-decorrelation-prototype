import './Badges.css';

export interface IBadgesProps {
    images: string[][] //pos 0 is image, pos 1 is name. will probably be a more complex obj once I get api data.
}

const Badges: React.FC<IBadgesProps> = ({ images }) => {
    return (
        <div className='d-flex flex-column justify-content-center m-5 align-items-left bg-black'>
            <div className='d-flex flex-row flex-wrap d-inline-block text-center align-top bg-light ' > {/*style={{width: '500px'}}*/}
                {images.map((arr, i) =>
                    <div key={`player-${i}`}>
                        <img className='image' src={arr[0]}></img>
                        <span className='d-block'>{arr[1]}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export { Badges }