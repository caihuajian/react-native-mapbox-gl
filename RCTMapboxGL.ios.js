'use strict';

var NativeMethodsMixin = require('NativeMethodsMixin');
var Platform = require('Platform');
var React = require('React');
var ReactIOSViewAttributes = require('ReactIOSViewAttributes');
var View = require('View');
var createReactIOSNativeComponentClass = require('createReactIOSNativeComponentClass');
var requireNativeComponent = require('requireNativeComponent');

var MapView = React.createClass({
  mixins: [NativeMethodsMixin],
  _onChange(event: Event) {
    if (!this.props.onRegionChange) {
      return;
    }
    this.props.onRegionChange(event.nativeEvent.region);
  },
  _onOpenAnnotation(event: Event) {
    if (!this.props.onOpenAnnotation) {
      return;
    }
    this.props.onOpenAnnotation(event.nativeEvent.annotation);
  },
  propTypes: {
    showsUserLocation: React.PropTypes.bool,
    rotateEnabled: React.PropTypes.bool,
    accessToken: React.PropTypes.string.isRequired,
    zoomLevel: React.PropTypes.number,
    direction: React.PropTypes.number,
    styleURL: React.PropTypes.string,
    clipsToBounds: React.PropTypes.bool,
    debugActive: React.PropTypes.bool,
    centerCoordinate: React.PropTypes.shape({
      latitude: React.PropTypes.number.isRequired,
      longitude: React.PropTypes.number.isRequired
    }),
    style: View.propTypes.style,
    annotations: React.PropTypes.arrayOf(React.PropTypes.shape({
      latitude: React.PropTypes.number.isRequired,
      longitude: React.PropTypes.number.isRequired,
      title: React.PropTypes.string,
      subtitle: React.PropTypes.string,
    })),
    onRegionChange: React.PropTypes.func,
    onOpenAnnotation: React.PropTypes.func
  },

  render: function() {
    var props = this.props;

    if (!this.props.styleURL) {
      props.styleURL = "https://www.mapbox.com/mapbox-gl-styles/styles/mapbox-streets-v7.json";
    }

    return <MapboxGLView {...props} onChange={this._onChange} onBlur={this._onOpenAnnotation} />;
  }
});

var MapboxGLView = requireNativeComponent('RCTMapboxGL', MapView);

module.exports = MapView;
