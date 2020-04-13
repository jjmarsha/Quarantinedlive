export const GetURLParams = () => {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  const url = window.location.href;
  const params = {};
  let match;
  while ((match = regex.exec(url))) {
    params[match[1]] = match[2];
  }
  return params;
};
