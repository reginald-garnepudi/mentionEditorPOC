import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import 'draft-js/dist/Draft.css';
import './editorStyles.css';
import './mention-plugin.css';

import mentionsStyles from './mentionsStyles.css';
import mentions from './mentions';


export default class CustomMentionEditor extends Component {

  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin({
      mentions,
      entityMutability: 'IMMUTABLE',
      theme: mentionsStyles,
      mentionPrefix: '@',
      mentionTrigger: "@",
      supportWhitespace: true
    });
  }

  state = {
    editorState: EditorState.createEmpty(),
    suggestions: mentions,
  };

  onChange = (editorState) => {
    console.log(editorState)
    this.setState({
      editorState,
    });
  };

  onSearchChange = ({ value }) => {
    console.log(value)
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    });
  };

  onAddMention = () => {
    console.log("on Add Mention")
  }

  focus = () => {
    this.editor.focus();
  };

  componentDidCatch(error, info) {
    console.log(error)
  }

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin];

    return (
      <div className="editor" onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
          autoComplete="off" // THIS MADE IT WORK
          autoCorrect="off"  // THIS MADE IT WORK
        />
        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          onAddMention={this.onAddMention}
        />
      </div>
    );
  }
}