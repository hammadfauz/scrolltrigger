import React from 'react';

class ScrollTrigger extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      container : null
    };
    this.setRef = this.setRef.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.isInView = this.isInView.bind(this);
  }
  setRef (el) {
    this.setState({container : el},this.handleScroll);
  }
  componentDidMount () {
    window.addEventListener('scroll',this.handleScroll, false);
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll, false);
  }
  handleScroll () {
    if (!this.props.triggered && this.state.container) {
      if (this.isInView()) {
        this.props.onTrigger();
      }
    }
  }
  isInView () {
    if (this.state.container) {
      var rect = this.state.container.getBoundingClientRect();
      var html = document.documentElement;
      return (
        rect.top+100 <= (window.innerHeight || html.clientHeight)
      );
    }
    return false;
  }
  render () {
    return (<div ref={this.setRef}>{this.props.children}</div>);
  }
};

module.exports = ScrollTrigger;
