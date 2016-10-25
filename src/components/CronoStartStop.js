import React, { Component, PropTypes } from 'react';
import { extractTimeParts } from '../lib/utils';

const Header = () => (
  <div className="header">
    <h2>Cronómetro</h2>
  </div>
);

const Screen = (props) => (
  <div className="timer">
    <span className="timer-m">{ props.minutes }</span>
    <span className="timer-s">:{ props.seconds }</span>
    <span className="timer-ms">:{ props.milliseconds }</span>
  </div>
);

const Buttons = (props) => (
  <div className="actions">
    <button onClick={ props.onReset } disabled={ props.resetButtonDisabled }>
      Reset
    </button>
    <button onClick={ props.onStartStop } className={ props.actionButtonText.toLowerCase() }>
      { props.actionButtonText }
    </button>
  </div>
);

Buttons.propTypes = {
  onStartStop: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  actionButtonText: PropTypes.string
};

class Cronometro extends Component {
  constructor(){
    super();
    this.state = {
      isRunning: false,
      startTime: 0,
      endTime: 0,
      currentTime: 0,
      actionButtonText: "Start",
      resetButtonDisabled: true
    };
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleStartStop() {
    if(this.state.isRunning){
      // detener crono
      clearInterval(this._interval);
      const { endTime, startTime, currentTime } = this.state;
      this.setState({
        isRunning: false,
        startTime: 0,
        endTime: 0,
        currentTime: endTime - startTime + currentTime,
        actionButtonText: "Start",
        resetButtonDisabled: false
      });
    }
    else {
      this.setState({
        isRunning: true,
        startTime: Date.now(),
        endTime: Date.now(),
        actionButtonText: "Stop",
        resetButtonDisabled: true
      });

      this._interval = setInterval(() => {
        this.setState({
          endTime: Date.now()
        });
      }, 50);
    }
  }

  handleReset() {
    if(this.state.isRunning){
      return;
    }
    else {
      // poner a 0 el crono
      this.setState({
        startTime: 0,
        endTime: 0,
        currentTime: 0,
        resetButtonDisabled: true
      });
    }
  }

  render(){
    const { 
      startTime, 
      endTime, 
      currentTime, 
      actionButtonText, 
      resetButtonDisabled
    } = this.state;
    const { 
      minutes,
      seconds,
      milliseconds
    } = extractTimeParts(endTime - startTime + currentTime);

    return (
      <div className="crono">
        <Header />
        <div className="content">
          <Screen 
            minutes={ minutes }
            seconds= { seconds }
            milliseconds= { milliseconds }/>
          <Buttons
            onStartStop={ this.handleStartStop }
            onReset={ this.handleReset }
            actionButtonText={ actionButtonText }
            resetButtonDisabled={ resetButtonDisabled }
          />
        </div>
      </div> 
    );
  }
}

export default Cronometro;