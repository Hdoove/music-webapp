function queryHelp(data) {
  const text = Object.keys(data)
    .map(key => (data[key] !== undefined ? `${key}=${data[key]}` : null))
    .join('&');
  return `?${text}`;
}

export default queryHelp;
