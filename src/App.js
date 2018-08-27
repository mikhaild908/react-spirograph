import React, { Component } from 'react';
import './App.css';
import Spirograph from './Spirograph';

let R1 = 220;
let r2 = 65;
let l = 0.8;

class App extends Component {
  constructor() {
    super();

    this.state = { R1, r2, l };
    this.spirograph = React.createRef();

    this.onRChange = this.onRChange.bind(this);
    this.onrChange = this.onrChange.bind(this);
    this.onlChange = this.onlChange.bind(this);
    this.onDraw = this.onDraw.bind(this);
  }

  onRChange(event) {
    this.setState({ R1: event.target.value });
  }

  onrChange(event) {
    this.setState({ r2: event.target.value });
  }

  onlChange(event) {
    this.setState({ l: event.target.value });
  }

  onDraw() {
     this.spirograph.current.draw();
  }

  render() {
    const { R1, r2, l } = this.state;

    return (
      <div className="App">
      <Spirograph ref={this.spirograph} R1={R1} r2={r2} l={l} />
        <form>
          <input type="text" value={R1} onChange={this.onRChange}/>
          <input type="text" value={r2} onChange={this.onrChange}/>
          <input type="text" value={l} onChange={this.onlChange}/>
        </form>
        <button onClick={this.onDraw}>Draw</button>
      </div>
    );
  }
}

export default App;