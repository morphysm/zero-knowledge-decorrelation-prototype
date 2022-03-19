import './App.css';
import { Header } from './components/Header';
import { Badges, IBadgesProps } from './components/Badges';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LinkWrapper from './components/LinkWrapper';
import ConnectMM from './components/ConnectMM'
import { LandingBody } from './components/LandingBody';

const redditImages = [['reddit_logo.png', 'Reddit'], ['reddit_3_year_trophy.png', '3 years'], ['reddit_trophy_whitehat.png', 'white hat hacker'], ['karma.png', 'karma']];
const discordImages = [['discord.png', 'Discord'], ['bufficorn.png', 'EthDenver'], ['mod.png', 'moderator']];

interface IAppProps {
  // any props that come into the component
}

const App: React.FC<IAppProps> = (props) => {
  return (

    <div className='d-flex justify-content-center flex-column align-items-center' style={{backgroundColor: '#DCDCDC'}}>
      <LandingBody></LandingBody>
    </div>
  )
}

export default App;
