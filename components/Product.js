import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconfeather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('screen');

class Product extends React.Component {
  getBathroomIcon(canPee) {
    if (canPee){
      return (
        <Icon name={"toilet-paper"} size={25} color="#2bb8b4" />
      )
    }
    else {
      return (
        <Icon name={"toilet-paper-slash"} size={25} color="#2bb8b4" />
      )
    }
  }
  wheelchairBathroom(isOpen) {
    if (isOpen){
      return (
        <Icon name={"wheelchair"} size={25} color="#d45330" />
      )
    }
  }
  wheelchairGrounds(canAccess) {
    if (canAccess) {
      return (
        <Icon name={"exclamation-triangle"} size={25} color="black" />
      )
    }
  }
  photography(canClick) {
    if (canClick) {
      return (
        <Iconfeather name={"camera"} size={25} color="#D78FF7" />
      )
    }
    else {
      return (
        <Iconfeather name={"camera-off"} size={25} color="#D78FF7" />
      )
    }
  }
  render() {
    const { navigation, product, horizontal, full, style, priceColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];



    return (
      <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Product', { product: product })}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: product.image }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Product', { product: product })}>
          <Block flex space="between" style={styles.productDescription}>
            <Text size={22} style={styles.productTitle}>{product.title}</Text>
            <Block row space="between">
              <Text size={12} color={priceColor}>{product.add}</Text>
              <Block row>
                {this.getBathroomIcon(product.restroom)}
                {this.wheelchairBathroom(product.restroomAccess)}
                {this.wheelchairGrounds(product.wheelAccess)}
                {this.photography(product.photo)}
              </Block>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

export default withNavigation(Product);

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 5,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
