const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};
//https://media.istockphoto.com/photos/getting-the-night-started-with-some-awesome-music-picture-id1165318879?k=20&m=1165318879&s=612x612&w=0&h=ExM8UywRcezNov-GrvniGFvNZ8SJUYYOF8QeXFsrbVU=

export default reportWebVitals;
