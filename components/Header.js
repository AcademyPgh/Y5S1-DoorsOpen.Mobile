import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions, Keyboard } from 'react-native';
import { Button, Block, NavBar, Input, Text, theme } from 'galio-framework';
import Image from 'react-native-scalable-image';

import Icon from './Icon';
import materialTheme from '../constants/Theme';
import Tabs from './Tabs';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const ChatButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity >
  </TouchableOpacity>
);

const BasketButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity>
  </TouchableOpacity>
);

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    if (back)
      navigation.goBack();
      else
        navigation.openDrawer();
    // return (back ? navigation.goBack() : navigation.openDrawer());
  }

  renderRight = () => {
    const { white, title, navigation, scene } = this.props;
    // const { options } = scene.descriptor;
    // const routeName = options.headerTitle; // wip

    if (title ===  'Title') {
      return ([
      ]);
    }
  }

  renderBanner = () => {
    const { navigation } = this.props;
    return (
      // <Text center size={50}>Doors Open Pittsburgh</Text>
      <Image
        width={Dimensions.get('window').width * 0.8}
        source={require('./DOP-Header-Logo.png')}
        margin={0} />
    )
  }

  renderOptions = () => {
    const { navigation, optionLeft, optionRight } = this.props;
  }

  renderTabs = () => {
    const { tabs, tabIndex, navigation } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;

    if (!tabs) return null;
  }

  renderHeader = () => {
    const { search } = this.props
    if (search) {
      return (
        <Block center>
          {search ? this.renderBanner() : null}
        </Block>
      )
    }
    return null;
  }

  render() {
    const { back, title, white, transparent, navigation, scene } = this.props;
    // const { routeName } = navigation.state;
    // const { options } = scene.descriptor;
    // const routeName = scene.descriptor?.options.headerTitle ?? '';
    const noShadow = ["Search", "Profile"].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={back}
          title=""
          style={styles.navbar}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          leftStyle={{ paddingTop: 3, flex: 0.3 }}
          leftIconName={null}
          // leftIconFamily="font-awesome"
          leftIconColor={white ? theme.COLORS.WHITE : theme.COLORS.ICON}
          titleStyle={[
            styles.title,
            { color: theme.COLORS[white ? 'WHITE' : 'ICON'] },
          ]}
          onLeftPress={this.handleLeftPress}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 2 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
});
