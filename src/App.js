import React, {Component} from 'react';
import './styles.css'

let someVal = 0,
    x, 
    input_box, 
    timer, 
    wrapper,
    btn_start;

class App extends Component {

  state = {
      time : "00:00:00:00",
  }

  start = () => {

      btn_start = document.getElementsByTagName('button')[0];
      btn_start.disabled = true;

      if(someVal === 0) {
         input_box = document.getElementById('val');
         someVal   = input_box.value;
         someVal   = Math.max(someVal, -someVal)
      } 
      timer = document.getElementById('display');


      x = setInterval(this.changeState, 1000);

      input_box.classList.add('hide');
      timer.classList.add('display')
      timer.classList.add('center');

      wrapper = document.getElementById('wrapper');
  }


  stop = () => {
      clearInterval(x);
  }


  reset = () => {      
      clearInterval(x);
      this.setState((prev) => ({
            time : "00:00:00:00"

      }));

      input_box.classList.remove('hide');
      timer.classList.remove('center');      
      someVal = 0;
      wrapper.classList.remove('red');
      wrapper.classList.remove('yellow');
      btn_start.disabled = false;
  }

  colorize = (dd, hh, mm, ss)=>{
      if(dd === 0 && hh === 0 && mm == 0) {
          if(ss <= 10) {
              wrapper.classList.add('red');
          } else if(ss <= 50) {
              wrapper.classList.add('yellow');
          }
      } else {
             wrapper.classList.add('green');
      }
  }

  changeState = () => {

      if(someVal <= 0) {
        clearInterval(x);
      }


      let seconds = someVal;
      let minutes = 0 , hours = 0 , days = 0;
      
      if (seconds > 60) {
        minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
      }

      if (minutes > 60) {
         hours = Math.floor(minutes / 60);
         minutes  = minutes % 60;
      }

      if(hours > 24) {
          days = Math.floor(hours / 24);
          hours = hours % 24;

      }

      this.colorize(days, hours, minutes, seconds);

      if(seconds < 10) {
         seconds = "0" + seconds;
      }

      if (minutes < 10) {
         minutes = "0" + minutes;
      }

      if(days < 10) {
         days = "0" + days;
      }

      if (hours < 10) {
          hours = "0" + hours;
      }

      this.setState({
            time : `${days}:${hours}:${minutes}:${seconds}`
      });

      someVal -= 1;
  }

  render() {
    return (  
        <div className = 'my-class' id ='wrapper'>      
            <span className="display" id = 'display'>{this.state.time}</span>
            <input type="number" id = 'val' title="enter time in seconds" min="0" />
            <div className="buttons">
              <button className = 'btn-start' onClick= {this.start}>Start</button>
              <button className = 'btn-stop' onClick= {this.stop}>Stop</button>
              <button className = 'btn-reset' onClick= {this.reset}>Reset</button>
            </div>
        </div>
      );
  }
}

export default App;

