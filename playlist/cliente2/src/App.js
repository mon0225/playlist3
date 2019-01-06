import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      busqueda: "",
      resultado: "",
      datos:[]
    };
  }

  handleChange = (e) => {
    // console.log("handleChange");
    // console.log(e.target.value);
    // console.log(this.state.busqueda);
    this.setState({busqueda:e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.busqueda);
    // fetch("/api/playlist/" + this.state.busqueda)
    fetch("/api/playlist/" + this.state.busqueda)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({datos: result})
          console.log(this.state.datos);
        },
        (error) => {
          console.log(error);
        }
      )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Hola esto es React
          </p>
          <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <label> Buscar: <input type="text" name="name" /></label>
            <input type="submit" value="Submit"/>
          </form>
          <p>
            Resultado {this.state.resultado}
          </p>
          <table>

              <tr>
                <th>Album</th>
              </tr>
              {this.state.datos.map(album=>{
                    return (<tr key={album.id}>
                              <th>{album.name}</th>
                              
                            </tr>)
              })}
          </table>
        </header>
      </div>
    );
  }
}

export default App;
