import React, { Component } from 'react';
import { CardItem, Text, Thumbnail, Left, Body } from 'native-base';

const PlaceItem = () => {
  const { logo, title, adress, open, description, id } = this.props;

    return (
      <CardItem key={id}>
              <Left>
                <Thumbnail source={{ uri: logo }} />
                <Body>
                  <Text>{title}</Text>
                  <Text note>{description}</Text>
                  <Text note>{adress}</Text>
                  <Text note>{open}</Text>
                </Body>
              </Left>
      </CardItem>
    );
};

export default PlaceItem;
