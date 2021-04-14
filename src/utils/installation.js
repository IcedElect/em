import moment from 'moment';

function isTimedOut(promptName, minutes) {
  let now = moment().unix();
  let point = localStorage.getItem(promptName);
  
  if(point) {
    if((now - point) >= minutes * 60) {
      localStorage.setItem(promptName, now);
      return true;
    }
  } else {
    localStorage.setItem(promptName, now);
  }

  return false;
}

export default isTimedOut;