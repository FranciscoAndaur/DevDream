import React from 'react';

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
            background: '#FFFFFF12',
            elevation: 'none',
        },
        footer: {
            pad: { horizontal: 'medium', vertical: 'small' },
            background: '#FFFFFF06',
        },
    },
};


const data = [
    {
        icon: <Cloud size="large" />,
        title: '@Francisco',
        subTitle: 'Today I dreamt of a dark tunnel, Monica Belucci was there.  We were having coffee',
    },
    {
        icon: <Cloud size="large" />,
        title: '@Nutella',
        subTitle: 'I dreamed I was the captain of a ship, we all wore red beanies, and the ocean was coffee',
        message: '@Francisco Wow, that is a wild dream',
        type: 'line',
    },
    {
        icon: <Cloud size="large" />,
        title: '@ButtTempo',
        subTitle: 'I was doing yoga in the park and it began to rain,  the rain was not rain though it was marshmallows.... I made Marshmallow angels.',
        message: '@Karem Yo, i had the same dream, but it was raining Grahm Crackers and Chocolate :0',
        type: 'point',
    },
    {
        icon: <Cloud size="large" />,
        title: '@karem',
        subTitle: 'I was tiny, the size of an ant.  Living inside an avocado.',
        message: '@Donut You would dream that.',
        type: 'point',
    },
];


const Identifier = ({ children, title, subTitle, size, ...rest }) => (
    <Box gap="small" align="center" direction="row" pad="small" {...rest}>
        {children}
        <Box>
            <Text size={size} weight="bold">
                {title}
            </Text>
            <Text size={size}>{subTitle}</Text>
        </Box>
    </Box>
);

export const DreamCard = () => (
    <Grommet theme={theme} full>

        <Box
            width="fixed"
            height=""
            round="small"
            align="center"
            justify="center"
            background="dark-1"  >
            <Grid gap="small" columns={{ count: '3', size: 'small' }}>
                {data.map(value => (
                    <Card
                        key={value.title}
                    >
                        <CardBody pad="small">
                            <Identifier
                                title={value.title}
                                subTitle={value.subTitle}
                                size="large"
                            >
                                {value.icon}
                            </Identifier>
                            <Button primary label="Comment" size="small" />
                        </CardBody>
                        <CardFooter pad={{ horizontal: 'medium', vertical: 'large' }}>
                            <Text size="medium">{value.message}</Text>
                        </CardFooter>
                    </Card>
                ))}
            </Grid>
        </Box>
    </Grommet>
)

export default DreamCard