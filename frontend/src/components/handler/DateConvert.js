export function GetHour(date, form) {
    const cal = date.substr(0, 10);
    const now = date.substr(11, 8);
  
    let YY = parseInt(cal.slice(0, 4));
    let MM = parseInt(cal.slice(5, 7));
    let DD = parseInt(cal.slice(8, 10));
    let hh = parseInt(now.slice(0, 2));
    let mi = parseInt(now.slice(3, 5));
    let ss = parseInt(now.slice(6, 8));
  
    hh += 7;
    if (hh > 24) {
      DD += 1;
      hh -= 24;
    }
    if (form === "jam") {
      return `${hh}:${mi}:${ss} WIB`;
    } else if (form === "date") {
      return `0${DD}/0${MM}/${YY}`;
    } else if (form === "full") {
      return `${hh}:${mi}:${ss} WIB  0${DD}/0${MM}/${YY}`;
    } else {
      return null;
    }
  }
  