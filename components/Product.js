import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('screen');

class Product extends React.Component {
  getBathroomIcon(canPee) {
    if (canPee){
      return (
        <IconMaterial name={"wc"} size={25} color="#2bb8b4" />
      )
    }
    else {
      return (
        <IconMaterial name={"do-not-disturb"} size={25} color="#d45330" />
      )
    }
  }
  wheelchairBathroom(isOpen) {
    if (isOpen){
      return (
        <IconMaterial name={"accessible"} size={25} color="#2bb8b4" />
      )
    }
    else {
      return (
        <IconMaterial name={"not-accessible"} size={25} color="#d45330" />
      )
    }
  }
  wheelchairGrounds(canAccess) {
    if (canAccess) {
      return (
        <IconMaterial name={"accessible"} size={25} color="#2bb8b4" />
      )
    }
    else {
      return (
        <IconMaterial name={"not-accessible"} size={25} color="#d45330" />
      )
    }
  }
  photography(canClick) {
    if (canClick) {
      return (
        <IconMaterial name={"local-see"} size={25} color="#2bb8b4" />
      )
    }
    else {
      return (
        <IconMaterial name={"no-photography"} size={25} color="#d45330" />
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
            <Image source={{ uri: product.imageURL }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Product', { product: product })}>
          <Block flex space="between" style={styles.productDescription}>
            <Text size={22} style={styles.productTitle}>{product.building}</Text>
            <Block row space="between">
              <Text size={12} color={priceColor}>{product.address1}</Text>
              <Block row>
                {this.getBathroomIcon(product.restroomsAvailable)}
                {this.wheelchairBathroom(product.wheelchairAccessibleRestroom)}
                {this.wheelchairGrounds(product.wheelchairAccessible)}
                {this.photography(product.photographyAllowed)}
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
