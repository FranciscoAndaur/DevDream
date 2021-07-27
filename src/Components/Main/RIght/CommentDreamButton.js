import React from 'react'
import { Box, Button, Layer, Text, FormField, TextArea, Form } from 'grommet';
import { Add, Close } from 'grommet-icons';

const CommentDreamButton = (props) => {
  const [show, setShow] = React.useState();
  const [comments, setComments] = React.useState('');
  const [comment, setContent] = React.useState('')

  console.log("peanut butter jelly",props.handleAddNewComment)


  //TO DO : NEED TO LINK FORM WITH BACK END AND ALSO PASS USER PROPS. 
  let postToBackend = (event) => {
    console.log(comments)
    event.preventDefault()
    fetch("https://secure-hollows-75074.herokuapp.com/comments", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: comment,
        user_id: props.user.id,
        post_id: props.dreamID,
      }),
    })
      .then((r) => r.json())
      .then((newPost) => {
        setShow(false)
        props.handleAddNewComment(newPost)

      });
  };
  return (

    <Box 
    align="end" 
    pad="large">

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

        <Add
          color="white"
          size="small"
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
                <Form onSubmit={postToBackend}>
                  <FormField label="Comments" name="comments">
                    <TextArea
                      name="content"
                      value={comment}
                      onChange={event => setContent(event.target.value)}
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
        <Text>Comment</Text>
      </Box>
    </Box>





  );
}
export default CommentDreamButton