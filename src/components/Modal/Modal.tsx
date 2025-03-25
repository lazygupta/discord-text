import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { ColourfulText } from '../ui/colourful-text';

export function Toast() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <ColourfulText text='Text copied succesfully'/>
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}