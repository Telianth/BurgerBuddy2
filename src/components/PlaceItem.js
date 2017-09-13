import React from 'react';
import { CardItem, Text, Thumbnail, Left, Body } from 'native-base';

const PlaceItem = (props) => {
  const { logo, title, adress, open, description, id } = props;

    return (
      <CardItem key={`${id}`}>
              <Left>
                <Thumbnail source={{ uri: `${logo}` }} />
                <Body>
                  <Text>{`${title}`}</Text>
                  <Text note>{`${description}`}</Text>
                  <Text note>{`${adress}`}</Text>
                  <Text note>{`${open}`}</Text>
                </Body>
              </Left>
      </CardItem>
    );
};

export default PlaceItem;
