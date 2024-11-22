import './createAnnouncement.scss'
import React, { useState, Component } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { useDispatch } from 'react-redux'
import { createAnnouncement } from '../../store/actions/action';
import {useNavigate} from 'react-router-dom'

// import htmlToDraft from 'html-to-draftjs';

class EditorConvertToHTML extends Component {
    state = {
      editorState: EditorState.createEmpty(),
    }
  
    onEditorStateChange = (editorState) => {
      this.setState({
        editorState,
      });
    };
  
    render() {
        const { editorState } = this.state;
       
        const submitContent = () => {
            this.props.saveContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        }

      return (
        <div>
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="newAnnouncement__editor"
            onEditorStateChange={this.onEditorStateChange}
          />
      <button onClick={submitContent} className='newAnnouncement__postBtn'>Post</button>
        </div>
      );
    }
  }


const CreateAnnouncement = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const saveContent = (data) => { 
        dispatch(createAnnouncement(data))
        navigate('/announcement')
    }

    return (
        <div className="newAnnouncement__container">
            <h1 className='newAnnouncement__title'>Create Announcement</h1>
            <EditorConvertToHTML saveContent={saveContent} />
        </div>
    )
}

export default CreateAnnouncement