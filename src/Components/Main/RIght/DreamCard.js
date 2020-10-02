import React from 'react';
import './favorite.scss'


import { Cloud, Down } from 'grommet-icons';
import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Grid,
    Grommet,
    Text,
    Button,
} from 'grommet';
import CommentDreamButton from './CommentDreamButton'


const theme = {
    themeMode: 'dark',
    global: {
        font: {
            family: `-apple-system,
           BlinkMacSystemFont, 
           "Segoe UI"`,
        },
    },
    card: {
        
        container: {
            pad: { horizontal: 'medium', vertical: 'medium' },
            justify: "center",
           
            background: '#FFFFFF12',
            elevation: 'none',
            background: "linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)"
        },
        footer: {
            pad: { horizontal: 'medium', vertical: 'small' },
            background: '#FFFFFF06',
        },
    },
};








const Identifier = ({ children, title, subTitle, ...rest }) => (
    <Box gap="large" align="center" direction="row" pad="small" {...rest}>
        {children}
        <Text weight="bold">
            @{title}
        </Text>
        <Text >{subTitle}</Text>
    </Box>

);


export class DreamCard extends React.Component {

    state = {
        hideComments: false,
        setComments: true,
    }

    mapComments() {
        console.log("what is this:", this.props.dream)
        return this.props.dream.comments.map((comment) => (
            <CardFooter pad={{ horizontal: 'small', vertical: 'small' }}>
            <Box pad="medium" elevation="medium" gap="medium">
                
                <Text key={comment.id} size="medium">{comment.content}</Text>
            </Box>
            </CardFooter>
        ))
    }

    handleDelete = () => {
        
        fetch(`http://localhost:3000/posts/${this.props.dream.id}`, {
           method: "DELETE"
        })
        .then(r => r.json())
        .then(justinTimberlake => {
            this.props.handleDeleteDream(justinTimberlake)
        })
    }

    setComments = () => {
        this.setState(prevState => ({
            hideComments: !prevState.hideComments,
            setComments: !prevState.setComments
        }))
    }

    render() {  
        // console.log("dream card ", this.props)

        return (

            <Grommet theme={theme} full>

                <Box
                    pad="small" height="fixed"
                    background="dark-1"  >
                    <Grid >
                        <Card>
                            <Cloud size="large" />
                            <CardBody pad="small">
                            <div align="end">
                                <Identifier
                                    title={this.props.dream.user.name}
                                    subTitle={this.props.dream.content}

                                >
                                    <a className="button" onClick={this.handleDelete}><div><span className="heart" ></span></div>  </a>

                                </Identifier>


                                
                                <CommentDreamButton user={this.props.user} handleAddNewComment={this.props.handleAddNewComment} dreamID={this.props.dream.id}  /><Down onClick={this.setComments} size="medium" /> 
                                </div>



                            </CardBody>
                            {this.state.hideComments && (
                                <Box
                                    animation={[
                                        { type: 'fadeIn', duration: 600 },
                                        { type: 'slideDown', size: 'medium', duration: 600 },
                                    ]}
                                >
                                    
                                        
                                           {this.mapComments()}
                                    
                                    
                                </Box>)}
                        </Card>


                    </Grid>
                </Box>
            </Grommet>
        )
    }
}

export default DreamCard