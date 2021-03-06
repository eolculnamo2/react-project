import './scss/main.scss';
import React from 'react';
import { checkIfRendered, fetchData, scrollToTop } from './accessories/helpers';

//Material
import Fab from '@material-ui/core/Fab';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress'

//Components
import Attendee from './components/Attendee';
import Info from './components/Info';
import ScrollHeader from './library/ScrollHeader';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            meetup: [],
            rsvps: [],
            going: true,
            waitList: true,
            displayFab: '',
            scrollHeaderDisplay: '',
            heroHeight: ''
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        fetchData('/get-meetup-data')
        .then( meetup => this.setState({meetup: meetup[0]}, () => this.retrieveRsvps() ));
        if(checkIfRendered()) {
            window.addEventListener('scroll', this.handleScroll.bind(this));

            //needed to guarantee matching heights for bg photos and information overlay

            this.heroRef = React.createRef();

            window.addEventListener('resize', () => this.matchHeights.bind(this) );
        }
    }

    retrieveRsvps() {
        const { meetup } = this.state;

        if(meetup && meetup.id) {
            fetchData('/get-meetup-rsvps?id='+meetup.id)
            .then( rsvps => this.setState({rsvps}, () => this.matchHeights() ));
        }
    }

    handleCheckbox(type) {
        const currentValue = this.state[type];
        const update = !currentValue;

        type === 'going' ? this.setState({going: update}) 
                         : this.setState({waitList: update});

    }

    handleScroll() {
        if(checkIfRendered()) {
            if(window.pageYOffset > 300) {
                this.setState({displayFab: "App__fab-display", 
                               scrollHeaderDisplay: "Info__scroll-sticky--show"});
            } else {
                this.setState({displayFab: "", 
                               scrollHeaderDisplay: ""});
            }
        }

        //guarantee matching heights for bg image and info
        this.matchHeights();
    }

    matchHeights() {
        let heroHeight = this.heroRef.current ? this.heroRef.current.offsetHeight+'px' : '';
        this.setState({heroHeight})
    }

    render() {
        if(this.state.rsvps.length !== 0) {
            return (
                <div>
                    <ScrollHeader info={this.state.meetup} 
                                  displayClass={this.state.scrollHeaderDisplay}
                                  />
                    <div className="App__upper-bar"></div>
                        <Info  heroHeight={this.state.heroHeight}
                               heroRef={this.heroRef}
                               meetup={this.state.meetup} />
                    <div className="App__lower-wrap">
                        <div className="App__attendee-wrap">
                            <div className="App__attendee-head-flex">
                                <h2 className="App__subtitle">Who's Going</h2>
                                <div>
                                    <Checkbox checked={this.state.going}
                                              color="primary" 
                                              onClick={this.handleCheckbox.bind(this,'going')}
                                              style={{padding: '5px'}}/><span className="App__check-label">Going</span>
                                    <Checkbox checked={this.state.waitList}
                                              color="primary"
                                              onClick={this.handleCheckbox.bind(this,'waitList')}
                                              style={{padding: '5px'}}/><span className="App__check-label">Wait List</span>
                                </div>
                             </div>
                            <div className="App__flex-attendees">
                                {this.state.rsvps.map( x => <Attendee key={x.member.id} 
                                                                      rsvps={x}
                                                                      showGoing={this.state.going}
                                                                      showWaitList={this.state.waitList} />)}
                            </div>
                        </div>
                    </div>
                    <div className={"App__fab-wrap "+this.state.displayFab}>
                        <Fab onClick={scrollToTop} disableRipple={true} color='primary'>Top</Fab>
                    </div>
                </div>
            )
        } else if(typeof window !== 'undefined') {
            return <div className="App__spinner-wrap"><CircularProgress/></div>
        } else {
            return null;
        }
    }
}

export default App;