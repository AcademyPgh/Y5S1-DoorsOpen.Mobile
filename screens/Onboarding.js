import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Image from 'react-native-scalable-image';
import { Block, Button, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';

export default class Onboarding extends React.Component {
  render() {
    const image = (
      <Image
        width={Dimensions.get('window').width / 2}
        source={require('./cormac_logo.png')}
        style={styles.logo} />
    );
    const { navigation } = this.props;

    return (
      <Block center flex style={styles.container}>
        <StatusBar barStyle="light-content" />
          {image}
          <Block flex={1.3} space="between" style={styles.padded}>
            <Block style={{ paddingTop: 50, position: 'relative' }}>

              <Block style={{ marginBottom: theme.SIZES.BASE * 4, paddingHorizontal: theme.SIZES.BASE * 2, zIndex: 3 }}>
                <Block>
                  <Text center color="#2bb8b4" size={60}>Doors Open Pittsburgh</Text>
                </Block>
              </Block>
              <Block style={{ paddingHorizontal: theme.SIZES.BASE * 2,  zIndex: 3 }}>
                <Text center size={22} color='#d45330'>
                We love Pittsburgh buildings and the history behind them
                </Text>
              </Block>
            </Block>
            <Block center style={{ paddingBottom: 30 }}>
              <Button
                shadowless
                style={styles.button}
                color="#2bb8b4"
                onPress={() => navigation.navigate('App')}>
                START
            </Button>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    marginTop: 150,
  },
  container: {
    backgroundColor: "white",
  },
  padded: {
    // paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 8,
    marginLeft: 12,
    borderRadius: 2,
    height: 22
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    top: 33 + theme.SIZES.BASE,
    left: 0,
    right: 0,
    height: 90,
  },
});
