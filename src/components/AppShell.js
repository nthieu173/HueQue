import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import {AppBar, Drawer, MenuItem} from 'material-ui';
import {GreetingIcon, UsersIcon, NotificationIcon} from './Icons';

const ContentStyle = {
  width: '90%',
  margin: 'auto',
  marginTop: '30px'
};

class SidebarDrawer extends React.Component {
  componentDidMount() {
    let frameCount = 0;
    const open = () => (frameCount++ > 0) ? this.props.onMounted() :
      requestAnimationFrame(open);
    requestAnimationFrame(open);
  }

  render() {
    return (
      <Drawer
        docked={false}
        width={200}
        open={this.props.open}
        onRequestChange={this.props.onRequestChange}
      >
        <MenuItem
          primaryText={'Greeting'}
          leftIcon={<GreetingIcon/>}
          containerElement={<Link to={'/'}/>}
          onClick={this.props.onClick}
        />
        <MenuItem
          primaryText={'Users'}
          leftIcon={<UsersIcon/>}
          containerElement={<Link to={'/users'}/>}
          onClick={this.props.onClick}
        />
        <MenuItem
          primaryText={'Notification'}
          leftIcon={<NotificationIcon/>}
          containerElement={<Link to={'/notification'}/>}
          onClick={this.props.onClick}
        />
      </Drawer>
    );
  }
}

class AppShell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      drawer : false
    };
  }

  handleDrawerToggle = (e) => {
    if (!this.state.drawer) {
      this.setState({drawer: true});
      e.preventDefault();
    } else {
      this.setState({open: !this.state.open});
    }
  }

  render() {
    // using lazy loading for drawer due to reduce first meaningful time
    // all of events are managed by app shell
    const LazySidebarDrawer = this.state.drawer && (<SidebarDrawer
      open={this.state.open}
      onMounted={() => this.setState({open: true})}
      onClick={() => this.setState({open: false})}
      onRequestChange={open => this.setState({open: open})}
    />)

    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={this.props.title}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.handleDrawerToggle}
          />
          {LazySidebarDrawer}
          <div id="content" style={ContentStyle}>
            {React.cloneElement(this.props.children)}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
};

export default AppShell;
