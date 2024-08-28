
// @ts-nocheck
import { useState,useRef } from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import "./RichEditor.css";
import 'draft-js/dist/Draft.css';
import { useDispatch } from "react-redux";
import { setSummaryInstruction } from "../../components/feature/AudioSlice";
import {convertFromRaw } from 'draft-js'

const RichEditor = ({text,type}:any) => {
  // const initialContentState = text
  // ? convertFromRaw({ blocks: [{ text }], entityMap: {} })
  // : convertFromRaw({ blocks: [], entityMap: {} });

const [editorState, setEditorState] = useState(
  text
  // EditorState.createWithContent(initialContentState)
  );

  const focus = () => {
    editorRef.current.focus();
  };
  const dispatch=useDispatch()
  

  const onChange = (newEditorState) => {
    
    setEditorState(newEditorState);
    try {
      const contentState = editorState.getCurrentContent();
      // const rawContentState =JSON.stringify(convertToRaw(contentState));
      dispatch(
        setSummaryInstruction({
          SummaryInstruction:contentState
        })
      )
    } catch (error) {
      console.error('Error saving draft data:', error);
    }
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  let className = 'RichEditor-editor';

  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  const editorRef = useRef(null);

  const blockStyleFn = (block) => {
    switch (block.getType()) {
      case 'blockquote':
        return 'RichEditor-blockquote';
      default:
        return null;
    }
  };

  const StyleButton = (props) => {
    const onToggle = (e) => {
      e.preventDefault();
      props.onToggle(props.style);
    };

    let className = 'RichEditor-styleButton';
    if (props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={onToggle}>
        {props.label}
      </span>
    );
  };

  const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' },
  ];

  const BlockStyleControls = (props) => {
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) => (
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
  ];

  const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map((type) => (
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="RichEditor-root">
      <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
      <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
      <div className={className} onClick={focus}>
        <Editor
          blockStyleFn={blockStyleFn}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={onChange}
          placeholder="Tell a story..."
          ref={editorRef}
          spellCheck={true}
          
          
        />
      </div>
      {/* <button className="bg-red-200 h-10 w-14 rounded-md font-medium"  type="submit">ADD</button> */}
    </div>
  );
};

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

export default RichEditor;

