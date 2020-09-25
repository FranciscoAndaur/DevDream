import React from 'react';
import './favorite.scss'

import { Cloud } from 'grommet-icons';
import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Grid,
    Grommet,
    Text,
    Button,
    InfiniteScroll,

} from 'grommet';

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








const Identifier = ({ children, title, subTitle, size, ...rest }) => (
    <Box gap="large" align="center" direction="row" pad="small" {...rest}>
        {children}
        <Box>
            <Text size={size} weight="bold">
                {title}
            </Text>
            <Text size={size}>{subTitle}</Text>
        </Box>
    </Box>
);


export const DreamCard = (props) => {


    return (

        <Grommet theme={theme} full>

            <Box
                pad="large" height="100%"
                background="dark-1"  >
                <Grid >
                    
                    <Card>
                        <Cloud size="large" />
                        <CardBody pad="small">
                            <Identifier
                                title={props.post.user.name}
                                subTitle={props.post.content}
                                
                            >
                                <a className="button"><div><span className="heart"></span></div>  </a>
                                
                            </Identifier>

                            <Button primary label="Comment" size="small" alignSelf="center" />


                        </CardBody>
                        <CardFooter pad={{ horizontal: 'medium', vertical: 'large' }}>
                            <Text size="medium">{props.post.content}</Text>
                        </CardFooter>
                    </Card>


                </Grid>
            </Box>
        </Grommet>
    )
}

export default DreamCard