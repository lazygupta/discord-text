import {
  Box,
  Group,
  Title,
} from '@mantine/core';
import classes from './HeaderMegaMenu.module.css';
import { ColourfulText } from '../ui/colourful-text';
import { ActionToggle } from '../ActionToggle/ActionToggle';

export function HeaderMegaMenu() {

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
          <div className='hidden sm:block'>
            <ActionToggle />
          </div>

        </Group>
      </header>
    </Box>
  );
}
