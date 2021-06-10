exports.uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        // eslint-disable-next-line no-bitwise
        const r = Math.random() * 16 | 0; const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

exports.formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
}

exports.dateTime = (date, time) => {
    // create Date object from valid string inputs
    var datetime = new Date(date+' '+time);

    // format the output
    var month = datetime.getMonth()+1;
    var day = datetime.getDate();
    var year = datetime.getFullYear();

    var hour = datetime.getHours();
    if (hour < 10)
        hour = "0"+hour;

    var min = datetime.getMinutes();
    if (min < 10)
        min = "0"+min;

    var sec = datetime.getSeconds();
    if (sec < 10)
        sec = "0"+sec;

    // put it all togeter
    var dateTimeString = year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec;

    return dateTimeString
}

exports.createdTime = () => {
  // create Date object from valid string inputs
  var datetime = new Date();

  // format the output
  var month = datetime.getMonth()+1;
  var day = datetime.getDate();
  var year = datetime.getFullYear();

  var hour = datetime.getHours();
  if (hour < 10)
      hour = "0"+hour;

  var min = datetime.getMinutes();
  if (min < 10)
      min = "0"+min;

  var sec = datetime.getSeconds();
  if (sec < 10)
      sec = "0"+sec;

  // put it all togeter
  var dateTimeString = year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec;

  return dateTimeString  
}
