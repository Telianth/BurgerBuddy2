import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { FlatList } from 'react-native';
import axios from 'axios';
import { Container, Footer, ListItem, Button, Icon, Text, Content, Header, CardItem, Item, Input, Left, Body, Thumbnail } from 'native-base';


class PlaceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      status: false,
      burgers: [],
      initialRegion: {
        latitude: 41.9960995,
        longitude: 21.4303442,
    },
    }; 
  }


  componentWillMount() {
    axios.get('https://api.myjson.com/bins/14b53h')
    .then(response => this.setState({ burgers: response.data }));
  }

  renderSinleItem({ item }) {
      const { title, logo, description, adress, open } = item;
      if (!title) return null;

      return (
        <ListItem onPress={() => Actions.burgerplace({ item, title, })} style={{ borderBottomColor: 'rgba(58, 51, 53, 1)' }}>
          <CardItem style={{ backgroundColor: 'none', borderBottomColor: 'rgba(58, 51, 53, 1)', borderBottomWidth: 1 }}>
            <Left>
              <Thumbnail source={logo ? { uri: logo } : require('../Images/Burger-icon-color.png')} />
              <Body>
                <Text style={{ color: 'rgba(58, 51, 53, 1)' }}>{title}</Text>
                <Text note>{description}</Text>
                <Text note>{adress}</Text>
                <Text note>{open}</Text>
              </Body>
            </Left>
          </CardItem>
        </ListItem>
      );
  }

  render() {
    return (
      <Container>
      <Header searchBar rounded style={{ backgroundColor: 'rgb(228, 82, 11)' }}>
      <Item style={{ backgroundColor: 'rgba(227, 227, 227, 0.85)' }}>
        <Icon name="md-search" />
        <Input placeholder="Search" />
        <Icon name="md-people" />
      </Item>
     </Header>
      <FlatList 
      style={{ flex: 1, backgroundColor: 'rgba(217, 93, 57, 0.4)' }}
      data={this.state.burgers}
      keyExtractor={item => item.id}
      renderItem={this.renderSinleItem}
      
      />
      </Container>
    );
  }
}

export default PlaceList;
