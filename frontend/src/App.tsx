import './App.css';
import { Header } from './components/Header';
import { Badges, IBadgesProps } from './components/Badges';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LinkWrapper from './components/LinkWrapper';
import ConnectMM from './components/ConnectMM'

const redditImages = [['reddit_logo.png', 'Reddit'], ['reddit_3_year_trophy.png', '3 years'], ['reddit_trophy_whitehat.png', 'white hat hacker'], ['karma.png', 'karma']];
const discordImages = [['discord.png', 'Discord'], ['bufficorn.png', 'EthDenver'], ['mod.png', 'moderator']];

interface IAppProps {
  // any props that come into the component
}

const App: React.FC<IAppProps> = (props) => {
  return (

    <div className='d-flex justify-content-center flex-column align-items-center'>
      <ConnectMM/>
      <div>
        <p className='mt-5'>Prove you’re trustworthy without ever saying who you are</p>
      </div>
      <Badges redditImages={redditImages} discordImages={discordImages}></Badges>
    </div>
  )
}

export default App;
