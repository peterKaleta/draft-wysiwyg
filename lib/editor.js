'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _draftJsPluginsEditorWysiwyg = require('draft-js-plugins-editor-wysiwyg');

var _draftJsPluginsEditorWysiwyg2 = _interopRequireDefault(_draftJsPluginsEditorWysiwyg);

var _createPlugins = require('./create-plugins');

var _createPlugins2 = _interopRequireDefault(_createPlugins);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Plugin-Editor


/*// Components
import PlaceholderGithub from '../components/placeholder-github';
import BlockText from '../components/block-text';*/

var WysiwygEditor = function (_Component) {
  _inherits(WysiwygEditor, _Component);

  function WysiwygEditor(props, context) {
    _classCallCheck(this, WysiwygEditor);

    var _this = _possibleConstructorReturn(this, (WysiwygEditor.__proto__ || Object.getPrototypeOf(WysiwygEditor)).call(this, props));

    _initialiseProps.call(_this);

    _this.plugins = (0, _createPlugins2.default)(props);
    _this.state = {
      editorState: props.value ? _draftJs.EditorState.push(_draftJs.EditorState.createEmpty(), (0, _draftJs.convertFromRaw)(props.value)) : _draftJs.EditorState.createEmpty(),
      draggingOver: false
    };

    _this.blockRenderMap = _draftJs.DefaultDraftBlockRenderMap.merge(_this.customBlockRendering(props));
    return _this;
  }

  _createClass(WysiwygEditor, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      if (this.suppress) return false;
      if (this.props.value !== props.value && props.value !== this.__raw) {
        this.__raw = props.value;
        this.setState({
          editorState: !props.value ? _draftJs.EditorState.createEmpty() : _draftJs.EditorState.push(this.state.editorState, (0, _draftJs.convertFromRaw)(props.value))
        });
        return true;
      } else if (this.state.active !== state.active || this.state.editorState !== state.editorState || this.state.readOnly !== state.readOnly || this.props.readOnly !== props.readOnly || this.props.fileDrag !== props.fileDrag || this.props.uploading !== props.uploading || this.props.percent !== props.percent || this.force) {
        this.force = false;
        return true;
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var editorState = this.state.editorState;

      var _props = this.props,
          isDragging = _props.isDragging,
          progress = _props.progress,
          readOnly = _props.readOnly,
          value = _props.value,
          blockTypes = _props.blockTypes,
          onChange = _props.onChange,
          rest = _objectWithoutProperties(_props, ['isDragging', 'progress', 'readOnly', 'value', 'blockTypes', 'onChange']);

      return _react2.default.createElement(_draftJsPluginsEditorWysiwyg2.default, _extends({ readOnly: readOnly, editorState: editorState,
        plugins: this.plugins,
        blockRenderMap: this.blockRenderMap,
        blockRendererFn: this.blockRendererFn,
        onChange: this.onChange,
        ref: 'editor'
      }, rest));
    }
  }]);

  return WysiwygEditor;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onChange = function (editorState) {
    var force = false;
    if (_this2.suppress && !force) return;
    _this2.setState({ editorState: editorState });
    if (_this2.props.onChange) {
      _this2.__raw = (0, _draftJs.convertToRaw)(editorState.getCurrentContent());
      _this2.props.onChange(_this2.__raw, editorState);
    }
  };

  this.focus = function () {
    _this2.refs.editor.focus();
  };

  this.blockRendererFn = function (contentBlock) {
    var blockTypes = _this2.props.blockTypes;

    var type = contentBlock.getType();
    if (blockTypes[type]) {
      return {
        component: blockTypes[type]
      };
    }return undefined;
  };

  this.customBlockRendering = function (props) {
    var blockTypes = props.blockTypes;

    var newObj = {
      'paragraph': {
        element: 'div'
      },
      'unstyled': {
        element: 'div'
      },
      'block-image': {
        element: 'div'
      },
      'block-table': {
        element: 'div'
      }
    };
    for (var key in blockTypes) {
      newObj[key] = {
        element: 'div'
      };
    }return (0, _immutable.Map)(newObj);
  };
};

exports.default = WysiwygEditor;