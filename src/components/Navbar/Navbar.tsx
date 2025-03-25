import {
  ActionIcon,
  Box,
  Group,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { Moon, Sun } from 'lucide-react';
import classes from './HeaderMegaMenu.module.css';
import { Text } from '@mantine/core';
import { ColourfulText } from '../ui/colourful-text';

export function HeaderMegaMenu() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";


  return (
    <Box pb={80}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Text fw={700} size="xl">Discord <ColourfulText text="Colored" /> Text Generator</Text>
            
          <span className='flex justify-end m-4'>
            <ActionIcon
              onClick={toggleColorScheme}
              size="lg"
              variant="outline"
              color={isDark ? "yellow" : "blue"}
              style={{ borderRadius: "50%" }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </ActionIcon>
          </span>
        </Group>
      </header>
    </Box>
  );
}