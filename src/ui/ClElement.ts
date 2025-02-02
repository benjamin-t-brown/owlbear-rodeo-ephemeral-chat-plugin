export class ClElement<T> {
  protected parent: HTMLElement;
  protected parentCl: ClElement<unknown> | undefined;
  protected root: HTMLElement | undefined;
  protected props: T | undefined;
  protected scale = 1;

  constructor(parent: HTMLElement, parentCl?: ClElement<unknown>) {
    this.parent = parent;
    this.parentCl = parentCl;
  }
  reRender() {
    this.setScale(this.scale);
  }
  reRenderAll() {
    if (this.parentCl) {
      this.parentCl.reRenderAll();
    } else {
      this.reRender();
    }
  }
  setProps(props: T) {
    this.props = props;
    if (this.root) {
      this.remove();
    }
    this.add();
    return this;
  }
  getProps() {
    return this.props;
  }
  setScale(scale: number) {
    this.scale = scale;
    if (this.props) {
      this.remove();
      this.add();
    }
    return this;
  }
  getParent() {
    return this.parent;
  }
  getRoot() {
    return this.root;
  }
  hide() {
    if (this.root) {
      this.root.style.display = 'none';
    }
  }
  show() {
    if (this.root) {
      this.root.style.display = '';
    }
  }
  add() {
    this.root = document.createElement('div');
    this.parent.appendChild(this.root);
  }
  remove() {
    if (this.root) {
      this.parent.removeChild(this.root);
      this.root = undefined;
    }
  }
}

export const assignCss = (
  el: HTMLElement,
  css: Partial<CSSStyleDeclaration>
) => {
  Object.assign(el.style, css);
  return el;
};

export const appendChild = (
  parent: HTMLElement,
  ...children: HTMLElement[]
) => {
  for (const child of children) {
    parent.appendChild(child);
  }
};

export const setMouseTouchDown = (
  el: HTMLElement | Window,
  cb: (ev: TouchEvent | MouseEvent) => void,
  args?: { passive: boolean }
) => {
  el.addEventListener('mousedown', cb as unknown as any, args);
  el.addEventListener('touchstart', cb as unknown as any, args);
};

export const setMouseTouchUp = (
  el: HTMLElement | Window,
  cb: (ev: TouchEvent | MouseEvent) => void,
  args?: { passive: boolean }
) => {
  el.addEventListener('mouseup', cb as unknown as any, args);
  el.addEventListener('touchend', cb as unknown as any, args);
};

export const setMouseTouchMove = (
  el: HTMLElement | Window,
  cb: (ev: TouchEvent | MouseEvent) => void,
  args?: { passive: boolean }
) => {
  el.addEventListener('mousemove', cb as unknown as any, args);
  el.addEventListener('touchmove', cb as unknown as any, args);
};

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  css: Partial<CSSStyleDeclaration> = {},
  ...children: HTMLElement[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tagName);
  assignCss(el, css);
  for (const child of children) {
    appendChild(el, child);
  }
  return el;
}

export function hasParent(child: HTMLElement, parent?: HTMLElement) {
  let currentElement: HTMLElement | null = child;

  while (currentElement && currentElement !== parent) {
    currentElement = currentElement.offsetParent as HTMLElement;
  }

  return currentElement === parent;
}

export function getRelativeOffset(
  child: HTMLElement,
  parent: HTMLElement
): { top: number; left: number } {
  let offsetTop = 0;
  let offsetLeft = 0;
  let currentElement: HTMLElement | null = child;

  while (currentElement && currentElement !== parent) {
    offsetTop += currentElement.offsetTop;
    offsetLeft += currentElement.offsetLeft;
    currentElement = currentElement.offsetParent as HTMLElement;
  }

  return { top: offsetTop, left: offsetLeft };
}
