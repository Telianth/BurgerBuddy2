import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ListView} from 'react-native';
import axios from 'axios';
import { Container, Footer, ListItem, Button, Icon, Text, Content, CardItem, Left, Body, Thumbnail } from 'native-base';
import PlaceItem from './PlaceItem';

class PlaceList extends Component {
  state = {
    status: false,
    burgers: [],
    initialRegion: {
      latitude: 41.9960995,
      longitude: 21.4303442,
  },
  }

  componentWillMount() {
    axios.get('https://api.myjson.com/bins/14b53h')
    .then(response => this.setState({ burgers: response.data })); 
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }); 

    this.dataSource = ds.cloneWithRows(['row 1', 'row 2']);
  }

  renderRow() {
    return this.state.burgers.map(burger =>
      <CardItem key={burger.id}>
      <Left>
        <Thumbnail source={{ uri: burger.logo }} />
        <Body>
          <Text>{burger.title}</Text>
          <Text note>{burger.description}</Text>
          <Text note>{burger.adress}</Text>
          <Text note>{burger.open}</Text>
        </Body>
      </Left>
</CardItem>);
  }

  render() {
    return (
      <ListView 
      style={{ flex: 1 }}
      dataSource={this.dataSource}
      renderRow={this.renderRow()}
      />
    );
  }
}

export default PlaceList;
