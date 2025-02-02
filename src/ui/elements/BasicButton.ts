import {
  assignCss,
  createElement,
  ClElement,
  setMouseTouchDown,
  setMouseTouchUp,
} from '../ClElement';
import { getColors } from '../colors';

export type BasicButtonType = 'neutral';

interface BasicButtonProps {
  type: BasicButtonType;
  label: string;
  fullHeight?: boolean;
  disabled?: boolean;
  style?: Partial<CSSStyleDeclaration>;
  onClick: () => void;
}

export class BasicButton extends ClElement<BasicButtonProps> {
  add() {
    const props = this.props ?? {
      type: 'neutral',
      label: 'Button',
      style: {},
      onClick: () => {},
    };

    const buttonDiv = createElement('div');
    assignCss(buttonDiv, {
      position: 'relative',
      padding: this.scale * 4 + 'px',
      fontSize: '24px',
      cursor: 'pointer',
      userSelect: 'none',
      textAlign: 'center',
      color: getColors().BUTTON.COLOR,
      minWidth: this.scale * 10 + 'px',
      height: props.fullHeight ? `calc(100% - 2 * ${this.scale * 2})` : '',
      display: 'inline-flex',
      backgroundColor: getColors().BUTTON.BACKGROUND,
      border: this.scale * 2 + 'px outset ' + getColors().BUTTON.BORDER,
      borderRadius: '4px',
      boxSizing: 'border-box',
      filter: props.disabled ? 'brightness(0.5)' : 'none',
      pointerEvents: props.disabled ? 'none' : 'auto',
      justifyContent: 'center',
      overflow: 'hidden',
      ...props.style,
    });

    const textDiv = createElement('div', {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    });
    const textSpan = createElement('span', {
      position: 'relative',
      zIndex: '2',
    });
    textSpan.innerText = props.label;
    textDiv.appendChild(textSpan);
    buttonDiv.appendChild(textDiv);

    buttonDiv.addEventListener('click', () => {
      props.onClick();
    });

    setMouseTouchDown(buttonDiv, (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (ev instanceof TouchEvent) {
        props.onClick();
      }
      assignCss(buttonDiv, {
        transform: 'translateY(2px)',
      });
    });

    setMouseTouchUp(buttonDiv, (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      assignCss(buttonDiv, {
        transform: 'translateY(0px)',
      });
    });

    buttonDiv.addEventListener('mouseleave', () => {
      assignCss(buttonDiv, {
        transform: 'translateY(0px)',
      });
    });

    this.root = buttonDiv;
    this.parent.appendChild(this.root);
  }
}
