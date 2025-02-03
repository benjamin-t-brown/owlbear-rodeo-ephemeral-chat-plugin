import { createElement, ClElement, appendChild } from '../ClElement';

interface TextareaProps {
  value: string;
  width?: string;
  onChange: (value: string) => void;
  onKeyPress: (ev: KeyboardEvent) => void;
}

export class Textarea extends ClElement<TextareaProps> {
  add() {
    const props = this.props ?? {
      value: '',
      onChange: () => {},
      onKeyPress: () => {},
    };

    const textarea = createElement('input', {
      width: props.width ?? `100%`,
      height: `100%`,
      resize: 'none',
      fontSize: '18px',
    });
    textarea.setAttribute('maxlength', '128');
    textarea.value = props.value;
    textarea.addEventListener('input', (ev) => {
      const value = (ev as any).target.value;
      props.onChange(value);
    });
    textarea.addEventListener('keypress', (ev) => {
      props.onKeyPress(ev);
    });

    this.root = textarea;
    this.parent.appendChild(this.root);
  }
}
