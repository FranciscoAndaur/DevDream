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
            pad: "xlarge",
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

    setComments = () => {
        this.setState(prevState => ({
            hideComments: !prevState.hideComments,
            setComments: !prevState.setComments
        }))
    }

    render() {
console.log(this.props.comment.user.name
)
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
                                    title={this.props.comment.user.name}
                                    subTitle={this.props.comment.post.content}

                                >
                                    <a className="button"><div><span className="heart"></span></div>  </a>

                                </Identifier>


                                
                                <CommentDreamButton /><Down onClick={this.setComments} size="medium" /> 
                                </div>



                            </CardBody>
                            {this.state.hideComments && (
                                <Box
                                    animation={[
                                        { type: 'fadeIn', duration: 600 },
                                        { type: 'slideDown', size: 'medium', duration: 600 },
                                    ]}
                                >
                                    <CardFooter pad={{ horizontal: 'medium', vertical: 'large' }}>
                                        <Box pad="medium" elevation="medium" gap="medium">
                                            <Text size="medium">{this.props.comment.content}</Text>
                                        </Box>
                                    </CardFooter>
                                </Box>)}
                        </Card>


                    </Grid>
                </Box>
            </Grommet>
        )
    }
}

export default DreamCard