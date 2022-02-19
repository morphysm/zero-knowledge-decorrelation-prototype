import './Badges.css';

export interface IBadgesProps {
    discordImages: string[][]; // in array pos 0 is img pos 1 is description
    redditImages: string[][];
}

const Badges: React.FC<IBadgesProps> = ({ discordImages, redditImages }) => {
    return (
        <div className='d-flex flex-column justify-content-center m-5 align-items-left bg-black'>
            <Badge images={redditImages}></Badge>
            <Badge images={discordImages}></Badge>
        </div>
    );
}

export interface IBadgeProps {
    images: string[][];
}

const Badge: React.FC<IBadgeProps> = ({images}) => {
    return (
        <div className='d-flex flex-row flex-wrap d-inline-block text-center align-top bg-primary ' > {/*style={{width: '500px'}}*/}
            {images.map((arr, i) =>
                <div key={`player-${i}`}>
                    <img className='image' src={arr[0]}></img>
                    <span className='d-block'>{arr[1]}</span>
                </div>
            )}
        </div>
    )
}
export { Badges }