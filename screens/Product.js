import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Platform,
} from 'react-native';
// import Animated from 'react-native-reanimated';
import { Block, Text, Button, theme } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import materialTheme from '../constants/Theme';
import Images from "../constants/Images";
import { iPhoneX, HeaderHeight } from "../constants/utils";
import DropShadow from "react-native-drop-shadow";

const { height, width } = Dimensions.get('window');

export default class Product extends React.Component {
  state = {
    selectedSize: null,
  };

  scrollX = new Animated.Value(0);

  renderGallery = () => {
    const { navigation, route } = this.props;
    // const { params } = navigation && navigation.state;
    const product = route.params?.product;
    // const product = params.product;
    const productImages = [product.image, product.image, product.image, product.image];

    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        decelerationRate={0}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }], {useNativeDriver: false})}
      >
        {productImages.map((image, index) => (
          <TouchableWithoutFeedback
            key={`product-image-${index}`}
            onPress={() => navigation.navigate('Gallery', { images: productImages, index })}>
            <Image
              resizeMode="cover"
              source={{ uri: image }}
              style={{ width, height: iPhoneX() ? width + 32 : width + 32 }}
            />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    )
  }

  renderProgress = () => {
    const { route } = this.props;
    const product = route.params?.product;
    const productImages = [product.image, product.image, product.image, product.image];

    const position = Animated.divide(this.scrollX, width);
    return (
      <Block row>
        {productImages.map((_, i) => {
          const opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp'
          });
          const width = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [8, 18, 8],
            extrapolate: 'clamp'
          });
          return <Animated.View key={i} style={[styles.dots, {opacity, width}]} />;
        })}
      </Block>
    )
  }

  renderSize = (label) => {
    const active = this.state.selectedSize === label;

    return (
      <TouchableHighlight
        style={styles.sizeButton}
        underlayColor={materialTheme.COLORS.PRICE_COLOR}
        onPress={() => this.setState({ selectedSize: label })}>
        <Text color={active ? theme.COLORS.PRIMARY : null}>{label}</Text>
      </TouchableHighlight>
    );
  }

  renderChatButton = () => {
    const { navigation } = this.props;
    return (
      <Block style={styles.chatContainer}>
        <Button
          radius={28}
          opacity={0.9}
          style={styles.chat}
          color={materialTheme.COLORS.BUTTON_COLOR}
          onPress={() => navigation.navigate('Chat')}>
          <Icon size={16} family="GalioExtra" name="chat-33" color="white" />
        </Button>
      </Block>
    )
  }
  getBathroomIcon(canPee) {
    if (canPee){
      return (
        <Text size={14}><IconMaterial name={"wc"} size={25} color="#2bb8b4" /> Restrooms Available</Text>
      )
    }
    else {
      return (
        <Text size={14}><IconMaterial name={"do-not-disturb"} size={25} color="#d45330" /> Restrooms Not Available</Text>
      )
    }
  }
  wheelchairBathroom(isOpen) {
    if (isOpen){
      return (
        <Text size={14}><IconMaterial name={"accessible"} size={25} color="#2bb8b4" /> Wheelchair Accessible Bathrooms</Text>
      )
    } 
    else {
      return (
        <Text size={14}><IconMaterial name={"not-accessible"} size={25} color="#d45330" /> No Wheelchair Accessible Bathrooms</Text>
      )
    }
  }
  wheelchairGrounds(canAccess) {
    if (canAccess) {
      return (
        <Text size={14}><IconMaterial name={"accessible"} size={25} color="#2bb8b4" /> Grounds are Wheelchair Accessible</Text>
      )
    } 
    else {
      return (
        <Text size={14}><IconMaterial name={"not-accessible"} size={25} color="#d45330" /> Grounds are Not Wheelchair Accessible</Text>
      )
    }
  }
  photography(canClick) {
    if (canClick) {
      return (
        <Text size={14}><IconMaterial name={"local-see"} size={25} color="#2bb8b4" /> Photography is Allowed</Text>
      )
    }
    else {
      return (
        <Text size={14}><IconMaterial name={"no-photography"} size={25} color="#d45330" /> Photography is Not Allowed</Text>
      )
    }
  }
  render() {
    const { selectedSize } = this.state;
    const { navigation, route } = this.props;
    // const { params } = navigation && navigation.state;
    // const product = params.product;
    const product = route.params?.product;

    return (
        <Block flex style={styles.product}>
          {/* image */}
          <Block flex style={{ position: 'relative' }}>
            {this.renderGallery()}
          </Block>

          {/* text */}
          <Block flex style={styles.options}>
            <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
              <Block style={{ paddingHorizontal: theme.SIZES.BASE, paddingTop: theme.SIZES.BASE * 2 }}>
                <Text bold style={{
                  paddingBottom: 14,
                  fontSize: 28,
                  color: "#2bb8b4"}}>{product.title}</Text>
                <Text style={{
                  paddingBottom: 7,
                  fontSize: 20,
                  color: "#d45330"}}>{product.add}</Text>
                <Block row>
                  <Text bold style={{
                    marginTop: 10,
                    fontSize: 14}}>{product.start} - </Text>
                  <Text bold style={{
                    marginTop: 10,
                    fontSize: 14}}>{product.close}</Text>
                </Block>
                <Block row>
                  <Text bold style={{
                    marginTop: 10,
                    fontSize: 14}}>Capacity: </Text>
                  <Text style={{
                    marginTop: 10,
                    fontSize: 14}}>{product.capacity}</Text>
                </Block>
                <Block style={{
                  marginBottom: 10,
                  marginTop: 10}}>
                {/* text */}
                  {this.getBathroomIcon(product.restroom)}
                  {this.wheelchairBathroom(product.restroomAccess)}
                  {this.wheelchairGrounds(product.wheelAccess)}
                  {this.photography(product.photo)}
                </Block>
                <DropShadow 
                  style={{
                    shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 5,
                  }} >
                  <Block style={{
                    backgroundColor: "lightgrey",
                    marginBottom: 10,
                    marginTop: 20}}>
                    <Text center>History</Text>
                  </Block>
                  </DropShadow>
                  <Block style={styles.shadow}>
                    <Text size={14} style={{ paddingBottom: 14 }} bold>{product.history}</Text>
                  </Block>
                
                <Block style={{backgroundColor: "lightgrey"}}>
                  <Text center>Visitor Experience</Text>
                </Block>
                <Block>
                  <Text size={14} Muted>{product.visitorExperience}</Text>
                </Block>
              </Block>
            </ScrollView>
          </Block>
        </Block>
    );
  }
}

const styles = StyleSheet.create({
  history: {
    padding: 10,
    paddingBottom: 5,    
    borderTopColor: "white",
    borderRightColor: "white",
    borderBottomColor: "white",
    borderLeftColor: "white",
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    marginBottom: 10,
  },

  // shadow: {
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 5 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 5,  
  //   elevation: 2,
  // },
  product: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  options: {
    position: 'relative',
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 2,
    marginBottom: 0,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2
  },
  galleryImage: {
    width: width,
    height: 'auto'
  },
  size: {
    height: theme.SIZES.BASE * 3,
    width: (width - theme.SIZES.BASE * 2) / 3,
    borderBottomWidth: 0.5,
    borderBottomColor: materialTheme.COLORS.BORDER_COLOR,
    overflow: 'hidden',
  },
  sizeButton: {
    height: theme.SIZES.BASE * 3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: materialTheme.COLORS.PRICE_COLOR,
  },
  roundTopLeft: {
    borderTopLeftRadius: 4,
    borderRightColor: materialTheme.COLORS.BORDER_COLOR,
    borderRightWidth: 0.5,
  },
  roundBottomLeft: {
    borderBottomLeftRadius: 4,
    borderRightColor: materialTheme.COLORS.BORDER_COLOR,
    borderRightWidth: 0.5,
    borderBottomWidth: 0,
  },
  roundTopRight: {
    borderTopRightRadius: 4,
    borderLeftColor: materialTheme.COLORS.BORDER_COLOR,
    borderLeftWidth: 0.5,
  },
  roundBottomRight: {
    borderBottomRightRadius: 4,
    borderLeftColor: materialTheme.COLORS.BORDER_COLOR,
    borderLeftWidth: 0.5,
    borderBottomWidth: 0,
  },
});
