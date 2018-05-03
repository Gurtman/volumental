import React, { Component } from 'react';
import './styles/index.css';

const url =  'https://homeexercise.volumental.com/sizingsample'

class App extends Component {
  constructor() {
    super();
    this.state = {
      gender: "",
      sizes: [],
      system: "",
      nextPage: "",
      data: [],
      username: ["admin", "manager", "store"],
      password: ["ToPsEcReT", "12345", "november17"],
      page: "0"
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(this.state.username[this.state.page] + ":" + this.state.password[this.state.page]));

    fetch(url, {
      method: 'GET',
      headers: headers,
    })
    .then(res =>{
      res.json()
      .then(json =>{
        let _data = json.data["0"]
        this.setState({
          data: _data.sizes,
          gender: _data.gender,
          sizes:  Object.keys(_data.sizes).sort(function(a, b) {return a - b;}),
          system: _data.system,
          nextPage: json["next-page"]
        })
      })
      .catch(err =>{
        console.log('err', err)
      })
    })
    .catch(err =>{
      console.log('err', err)
    })
  }

  createPanels() {
    let panels = [];
    for (let a = 0; a < this.state.sizes.length; a++) {
      let boxes = [];

      let size = this.state.sizes[a]
      let quantities = Object.values(this.state.data[this.state.sizes[a]])
      let models = Object.keys(this.state.data[this.state.sizes[a]])

      for (let b = 0; b < models.length; b++) {
        let model = models[b]
        let quantity = quantities[b]

        boxes.push(<div key={size + (b + 1)} className="box"><p className="model-text">{model}</p><p className="quantity-text">{quantity}</p></div>);
      }
      panels.push(<div key={size} className="panel">{boxes}<p className="size-text">{size}</p></div>)
    }
    return panels;
  }

  handleChange = (e) => {
    this.setState({ page: e.target.value }, () => this.getData())
  }

  render() {
    return (
      <div id="wrapper">
        <div id="chart-container">
          <div id="chart-details">
            <p id="system-text">
              {this.state.system}
            </p>
            <p id="gender-text">
              {this.state.gender}
            </p>
            <select id="change" onChange={this.handleChange}>
              <option value="0">1</option>
              <option value="1">2</option>
              <option value="2">3</option>
            </select>
          </div>
          <div id="panel-container">
            {this.createPanels()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
