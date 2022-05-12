import React from "react";
import PropTypes from "prop-types"
import styled from "@emotion/styled";
import {Button} from '@mui/material';
import './App.css';
// import pokemon from "./pokemon.json"

/**
 * ====== CLASS COMPONENT CODE ================
 */

const PokemonRow = ({pokemon, onSelect}) =>  (
  <tr>
  <td>{pokemon.Name}</td>
  <td>{[pokemon["Type 1"], pokemon["Type 2"]].join(',')}</td>
  <td>
    <Button variant="contained" color="primary" onClick={()=>onSelect(pokemon)}>Select</Button>
  </td>
</tr>
)

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    ID: PropTypes.number,
    Name: PropTypes.string.isRequired,
    "Type 1": PropTypes.string.isRequired,
    "Type 2": PropTypes.string,
  }),
  onSelect: PropTypes.func,
}

const PokemonInfo = ({Name, Base})=>(
  <div>
    <h1>{Name}</h1>
    <table>
    <tbody>
      {
        (Base && Object.keys(Base).length)?
          Object.keys(Base).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{Base[key]}</td>
          </tr>
          )) : <tr><td>Base not preset</td></tr>
      }
      </tbody>
    </table>
  </div>
)
PokemonInfo.prototype = {
  Name: PropTypes.string.isRequired,
  Base: PropTypes.shape({
    "HP": PropTypes.number.isRequired,
    "Attack": PropTypes.number.isRequired,
    "Defense": PropTypes.number.isRequired,
    "Sp. Atk": PropTypes.number.isRequired,
    "Sp. Def": PropTypes.number.isRequired,
    "Speed": PropTypes.number.isRequired,
  }),
}

const Container = styled.div`
  margin: auto;
  width: 80%;
  padding-top: 1rem;
`;
const Title = styled.h1`
  text-align: center;
  `;
const TwoColumnLayout = styled.div`
  display: grid; 
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;
const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      filter: '',
      pokemon: [],
      selectedItem: null,
    }
  }
  componentDidMount () {
    fetch("http://localhost:3000/startWithReact/pokemon.json")
    .then((resp) => resp.json())
    .then((pokemon) => this.setState({...this.state, pokemon}))
  }

  render () {
    return (
    <Container>
        <Title>Search</Title>
        <Input value={this.state.filter} onChange={(evt)=> this.setState({...this.state, filter: evt.target.value})} />
        <TwoColumnLayout>
          <div>
            <table width="100%">
              <thead>
                <tr>
                  <th>name</th>
                  <th>type</th>
              </tr>
              </thead>
              <tbody>
                {this.state.pokemon
                .filter((pokemon)=>
                  pokemon.Name.toLowerCase().includes(this.state.filter.toLowerCase())
                )
                .slice(0, 20)
                .map((pokemon)=>(            
                <PokemonRow pokemon={pokemon} key={[pokemon.ID, pokemon.Name].join(':')} 
                onSelect={(pokemon)=>this.setState({...this.state, selectedItem: pokemon})} />
                ))} 
              </tbody>
            </table>
          </div>
          {this.state.selectedItem && (
            <PokemonInfo {...this.state.selectedItem}/>
          )}
        </TwoColumnLayout>
      </Container>
    );
  }
}

export default App;
