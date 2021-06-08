import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

const profileImageSize = 36;
const padding = 12;

export default class Item extends React.Component {
  state = {};

  componentDidMount() {
    if (!this.props.imageWidth) {
      // Get the size of the web image
      Image.getSize(this.props.image, (width, height) => {
        this.setState({ width, height });
      });
    }
  }

  render() {
    const { text, name, imageWidth, imageHeight, uid, image } = this.props;

    // Reduce the name to something
    const imgW = imageWidth || this.state.width;
    const imgH = imageHeight || this.state.height;
    const aspect = imgW / imgH || 1;

    return (
      <View>
        <Header image={{ uri: image }} name={name} />
        <Image
          resizeMode="contain"
          style={{
            backgroundColor: '#D8D8D8',
            width: '100%',
            aspectRatio: aspect,
          }}
          source={{ uri: image }}
        />
        <Metadata name={name} description={text} />
      </View>
    );
  }
}

export const Metadata = ({ name, description }) => (
  <View style={styles.padding}>
    <Text style={styles.text}>{name}</Text>
    <Text style={styles.subtitle}>{description}</Text>
  </View>
);

export const Header = ({ name, image }) => (
  <View style={[styles.row, styles.padding]}>
    <View style={styles.row}>
      <Image style={styles.avatar} source={image} />
      <Text style={styles.text}>{name}</Text>
    </View>
  </View>
);

export const Icon = ({ name }) => (
<Ionicons style={{ marginRight: 8 }} name={name} size={26} color="black" />
);

export const IconBar = (props) => (
  
  <View style={styles.row}>
    <View style={styles.rowe}>
    <TouchableHighlight onPress={props.onLike} >
      <Icon name="ios-heart-outline" />
  </TouchableHighlight>

      <Icon name="ios-chatbubbles-outline" />
    </View>
    <Icon name="ios-bookmark-outline" />
  </View>

);

const styles = StyleSheet.create({
  text: { fontWeight: '600' },
  subtitle: {
    opacity: 0.8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5
  },
  padding: {
    padding,
  },
  avatar: {
    aspectRatio: 1,
    backgroundColor: '#2e2d2d',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2e2d2d',
    borderRadius: profileImageSize / 2,
    width: profileImageSize,
    height: profileImageSize,
    resizeMode: 'cover',
    marginRight: padding,
  },
});