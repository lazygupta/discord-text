import { Box, Button, Container, Text, Title } from '@mantine/core';
import { Dots } from './Dots';
import classes from './HeroText.module.css';
import { ColourfulText } from '../ui/colourful-text';
import { ArrowDown } from 'lucide-react';
import { TextGenerateEffect } from '../ui/text-generate-effect';

export function HeroText() {
    const words = `Transform messages into stylish Discord messages with our easy-to-use generator.`;
    return (
        <Container className={classes.wrapper} size={1400}>
            <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
            <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

            
            

            <div className={classes.inner}>
                <Box className='flex justify-center text-6xl flex-wrap items-center'>
                    <div className='flex-col items-center justify-center text-center'>
                        <Title size={72}>Make your <ColourfulText text="Discord" /></Title>
                        <Title size={72}>Stand Out</Title>
                    </div>
                </Box>

                <div className='flex-col justify-center items-center  text-center'>
                <TextGenerateEffect words={words} />
                    <Text c="dimmed">Add <ColourfulText text="colors" /> ,styles ,and make your messages looks cool!</Text>
                </div>

                <div className={classes.controls}>
                    <Button className={classes.control} size="lg" variant="default" color="gray">
                        Try Now <ArrowDown/>
                    </Button>
                    
                </div>
            </div>
        </Container>
    );
}