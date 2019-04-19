import React, { Component } from 'react';
import 'draft-js-static-toolbar-plugin/lib/plugin.css'
import 'draft-js-undo-plugin/lib/plugin.css'

import { EditorState, convertToRaw } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createUndoPlugin from 'draft-js-undo-plugin';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';
import {stateToHTML} from 'draft-js-export-html';
import editorStyles from './style.scss';

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;
const plugins = [toolbarPlugin, undoPlugin];
const text = 'In this editor a toolbar shows up once you select part of the text …';

export default class CustomToolbarEditor extends Component {

  state = {
    editorState: createEditorStateWithText(text),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  generatePreview(){
    const raw = convertToRaw(this.state.editorState.getCurrentContent())
    let options = {
      defaultBlockTag: 'div',
    };
    const html = stateToHTML(this.state.editorState.getCurrentContent(), options)
    console.log(raw);
    console.log(html);
    return (
      <div dangerouslySetInnerHTML={{ __html: html }}/>
    )
  }

  render() {
    return (
      <div className="page">
        <div className="editor" onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          <Toolbar>
            {
              // may be use React.Fragment instead of div to improve perfomance after React 16
              (externalProps) => (
                <div>
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <CodeButton {...externalProps} />
                  <Separator {...externalProps} />
                  <HeadlineOneButton {...externalProps} />
                  <HeadlineTwoButton {...externalProps} />
                  <HeadlineThreeButton {...externalProps} />
                  <UnorderedListButton {...externalProps} />
                  <OrderedListButton {...externalProps} />
                  <BlockquoteButton {...externalProps} />
                  <CodeBlockButton {...externalProps} />
                </div>
              )
            }
          </Toolbar>
          <UndoButton />
          <RedoButton />
        </div>
        <div className="preview-container">
          {this.generatePreview()}
        </div>
      </div>
    );
  }
}
