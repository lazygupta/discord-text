import { Button, ColorPicker, Modal, Text } from "@mantine/core";
import { useRef, useState } from "react";
import "../Ansi/ansi.css";
import { useDisclosure } from "@mantine/hooks";
import { ColourfulText } from "./ui/colourful-text";

interface TextState {
  fg: string;
  bg: string;
  st: number;
}

const initial_state: TextState = {
  fg: "2",
  bg: "2",
  st: 2,
};

const fg_colors = [
  //text-color
  { hex: '#4f545c', ansi: '30' },
  { hex: '#dc322f', ansi: '31' },
  { hex: '#859900', ansi: '32' },
  { hex: '#b58900', ansi: '33' },
  { hex: '#268bd2', ansi: '34' },
  { hex: '#d33682', ansi: '35' },
  { hex: '#2aa198', ansi: '36' },
  { hex: '#ffffff', ansi: '37' },
];

const bg_colors = [
  //bg-color
  { hex: '#002b36', ansi: '40' },
  { hex: '#cb4b16', ansi: '41' },
  { hex: '#586e75', ansi: '42' },
  { hex: '#657b83', ansi: '43' },
  { hex: '#839496', ansi: '44' },
  { hex: '#6c71c4', ansi: '45' },
  { hex: '#93a1a1', ansi: '46' },
  { hex: '#fdf6e3', ansi: '47' },
];

const Main = () => {
  const [text, setText] = useState("Made with ♥ from lazyrabbit");
  const textareaRef = useRef<HTMLDivElement>(null);
  const [opened, { open, close }] = useDisclosure(false);

  // applying style
  const applyStyle = (styleType: 'fg' | 'bg' | 'style', value: string) => {
    const selection = window.getSelection();
    if (!selection || !textareaRef.current) return;
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (!selectedText) return;

    let ansiClass = '';
    if (styleType === 'style') {
      ansiClass = `ansi-${value}`;
    } 
    else if (styleType === 'fg') {
      const color = fg_colors.find(c => c.hex === value);
      if (color) ansiClass = `ansi-${color.ansi}`;
    }
    else {
      const color = bg_colors.find(c => c.hex === value);
      if (color) ansiClass = `ansi-${color.ansi}`;
    }

    const span = document.createElement('span');
    span.className = ansiClass;
    span.textContent = selectedText;

    range.deleteContents();
    range.insertNode(span);
  };

  const resetAll = () => {
    if (textareaRef.current) {
      textareaRef.current.innerHTML = text;
    }
  };

  // for generating ANSI codes of all the colors and styles
  const generateAnsiText = () => {
    const nodesToANSI = (nodes: NodeList, states: TextState[] = []): string => {
      let result = '';
      nodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          result += node.textContent;
        } 
        else if (node instanceof HTMLElement) {
          const classes = node.className.split(' ');
          const ansiClass = classes.find(c => c.startsWith('ansi-'));
          if (ansiClass) {
            const ansiCode = ansiClass.split('-')[1];
            const newState = { ...states[states.length - 1] || initial_state };

            if (parseInt(ansiCode) < 30) newState.st = parseInt(ansiCode);
            else if (parseInt(ansiCode) >= 30 && parseInt(ansiCode) < 40) newState.fg = ansiCode;
            else newState.bg = ansiCode;

            states.push(newState);
            result += `\x1b[${newState.st};${parseInt(ansiCode) >= 40 ? newState.bg : newState.fg}m`;
            result += nodesToANSI(node.childNodes, states);
            states.pop();
            result += '\x1b[0m';

            const currentState = states[states.length - 1];
            if (currentState && currentState.fg !== '2') {
              result += `\x1b[${currentState.st};${currentState.fg}m`;
            }
            if (currentState && currentState.bg !== '2') {
              result += `\x1b[${currentState.st};${currentState.bg}m`;
            }
          }
        }
      });
      return result;
    };

    if (!textareaRef.current) return '';
    return '```ansi\n' + nodesToANSI(textareaRef.current.childNodes) + '\n```';
  };

  const copyText = async () => {
    const ansiText = generateAnsiText();
    try {
      await navigator.clipboard.writeText(ansiText);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between mx-auto max-w-5xl px-4">
      <div className="p-5 w-full lg:w-1/2">
        <div
          ref={textareaRef}
          contentEditable
          className="bg-[#1A1B1E] text-white border border-[#2C2D31] w-full h-[300px] rounded-lg p-5 focus:outline-none focus:border-[#4CAF50] focus:shadow-[0_0_10px_#4CAF50] transition-all duration-300"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
      <div className="p-5 w-full lg:w-1/2 sm:flex gap-8">
        <div className="flex flex-col items-center gap-2">
          <Text>Foreground Color</Text>
          <ColorPicker
            format="hex"
            swatches={fg_colors.map(c => c.hex)}
            swatchesPerRow={4}
            withPicker={false}
            size="sm"
            onChange={(color) => applyStyle('fg', color)}
          />
          <Text>Background Color</Text>
          <ColorPicker
            format="hex"
            swatches={bg_colors.map(c => c.hex)}
            swatchesPerRow={4}
            withPicker={false}
            size="sm"
            onChange={(color) => applyStyle('bg', color)}
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="mt-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              color="gray"
              radius={7}
              variant="filled"
              onClick={() => applyStyle('style', '1')}
            >
              <Text fw={700}>Bold</Text>
            </Button>
            <Button
              color="gray"
              radius={7}
              variant="filled"
              onClick={() => applyStyle('style', '4')}
            >
              <Text td="underline">Underlined</Text>
            </Button>
          </div>
          <div className="flex gap-4 justify-center mt-8">
            <Button
              radius={7}
              color="gray"
              onClick={resetAll}
            >
              Reset All
            </Button>
            <Modal className="flex text-center" opened={opened} onClose={close} withCloseButton={false}>
              <ColourfulText text='Your message is copied successfully' />
            </Modal>

            <Button variant="default" onClick={copyText}>
              Copy Text
            </Button>
          </div>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Main;
