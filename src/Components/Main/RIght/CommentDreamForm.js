import React from 'react'
import { Box, Button, Layer, Text, FormField, TextArea, Form } from 'grommet';
import { CloudUpload, Close } from 'grommet-icons';

const CommentDreamForm = (props) => {
  // console.log("bet", props.user.id)

    const [show, setShow] = React.useState();
    const [comments, setComments] = React.useState('');
    const [content, setContent] = React.useState('')


    let postToBackend = (event) => {
    console.log("clicked")
    // event.preventDefault()
    fetch("http://localhost:3000/posts", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content, 
        user_id: props.user.id
      }),
    })
      .then((r) => r.json())
      .then((newDream) => {
        setShow(false)
        console.log(newDream)

      });
  };
    console.log(content)
//TO DO : NEED TO LINK FORM WITH BACK END AND ALSO PASS USER PROPS.  CHANGE TO CLASS COMPONENT
    return ( 
      
        <Box justify="center" align="center" pad="large">
      
      <Box
        border
        pad="xsmall"
        align="center"
        round
        gap="small"
        hoverIndicator
        onClick={() => { 
        }}
      >
        
 <CloudUpload
 size="medium"  
 onClick={() => setShow(true)} />
        {show && (
          
          <Layer 
            onEsc={() => setShow(false)}
            onClickOutside={() => setShow(false)}
          >
            <Close color="red"
 size="medium" align="end" onClick={() => setShow(false)} />
            <Box fill align="center" justify="center">
        <Box width="medium">
            <Form onSubmit={postToBackend} >
            <FormField label="New Dream" name="content">
              <TextArea
                name="content"
                value={content}
                onChange={event => setContent(event.target.value)}
              />
            </FormField>
            <Box direction="row" justify="between" margin={{ top: 'medium' }}>
              
              <Button  type="submit" label="post" primary/>
            </Box>

            </Form>
            </Box>
            </Box>
          </Layer>
        )}
        <Text>Upload Dream</Text>
      </Box>
    </Box>
          
       
       
        
      
    );
  }
export default CommentDreamForm