export function setElementAttr<T extends HTMLElement>(dom: T, attrValueMap: Partial<Record<keyof T, string>>) {
  for (const attr in attrValueMap) {
    const value = attrValueMap[attr];
    if (value !== undefined) {
      dom.setAttribute(attr, value!);
    }
  }
}
