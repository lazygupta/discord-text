import {
  ActionIcon,
  Box,
  Group,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { Moon, Sun } from 'lucide-react';
import classes from './HeaderMegaMenu.module.css';
import { ColourfulText } from '../ui/colourful-text';

export function HeaderMegaMenu() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Box pb={80}>
      <header className={classes.header}>
        <Group
          justify="space-between"
          align="center"
          h="100%"
          px="md"
          className="rounded-xl shadow-lg"
        >
          <Title order={2} className="gradient-text" fw={800}>
            <ColourfulText text="Discord Colored Text Generator" />
          </Title>

          <ActionIcon
            onClick={toggleColorScheme}
            size="lg"
            variant="outline"
            color={isDark ? 'yellow' : 'blue'}
            style={{ borderRadius: '50%' }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </ActionIcon>
        </Group>
      </header>
    </Box>
  );
}
