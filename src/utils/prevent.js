const prevent = (callback) => (event) => {
  event.preventDefault();
  callback(event);
};

export default prevent;