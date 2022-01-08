export function removeLeadingZeros(value: number) {
  const string = value.toString();
  if (string.length < 2) {
    return string;
  }
  return string.replace(/^0+/, '');
}

export function countWords(str: string) {
  if (str === '') return 0;

  return (
    str
      // start/end spaces
      .replace(/(^\s*)|(\s*$)/gi, '')
      // multi-spaces to singles
      .replace(/[ ]{2,}/gi, ' ')
      // exclude new line
      .replace(/\n /, '\n')
      .split(' ').length
  );
}
