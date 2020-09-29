import React from 'react'
import { Box, Button, Layer, Text, FormField, TextArea, Form } from 'grommet';
import { CloudUpload, Close } from 'grommet-icons';

const CommentDreamForm = () => {
    const [show, setShow] = React.useState();
    const [comments, setComments] = React.useState('');
    
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
            <Form>
            <FormField label="Comments" name="comments">
              <TextArea
                name="comments"
                value={comments}
                onChange={event => setComments(event.target.value)}
              />
            </FormField>
            <Box direction="row" justify="between" margin={{ top: 'medium' }}>
              
              <Button type="submit" label="post" primary />
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