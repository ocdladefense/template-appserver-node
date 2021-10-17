//export { jsDateFormatter, slqDateFormatter, numberIntoMonth };
function jsDateFormatter(jsDate) {
  if (jsDate == null) {
    return 'Unknown Date';
  }

  jsDate.toString();
  var jsDateArr1 = jsDate.split("-");
  var sYear = jsDateArr1[0];
  var sMonth = jsDateArr1[1];
  var Day = jsDateArr1[2];
  var sDay = Day.toString().replace(/^0+/, '');
  var sMonthSpelled = numberIntoMonth(sMonth);
  return sMonthSpelled + " " + sDay + ', ' + sYear;
}

function slqDateFormatter(sqlDate) {
  if (sqlDate == null) {
    return 'Unknown Date';
  }

  sqlDate.toString(); //sqlDate format is ("yyyy-mm-ddThh:mm:??.???+????")
  //format of sqlDateArr1[] = ["yyyy", "mm", "ddThh:mm:??.???+????"]

  var sqlDateArr1 = sqlDate.split("-");
  var sYear = sqlDateArr1[0];
  var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
  var sMonthSpelled = numberIntoMonth(sMonth); //format of sqlDateArr2[] = ["dd" "hh:mm:??.???+????"]

  var sqlDateArr2 = sqlDateArr1[2].split("T");
  var Day = sqlDateArr2[0];
  var sDay = Day.toString().replace(/^0+/, ''); //format of sqlDateArr3[] = ["hh", "mm", "??.???+????"]

  var sqlDateArr3 = sqlDateArr2[1].split(":");
  var sHour = sqlDateArr3[0];
  var sMinute = sqlDateArr3[1];
  var dayNight = '';

  if (sHour > 12) {
    sHour = sHour - 12;
    dayNight = 'pm';
  } else {
    dayNight = 'am';
  }

  var sHour2 = 0;

  if (sHour <= 7) {
    if (sHour == 7) {
      sHour2 = 12;
    }

    if (sHour == 6) {
      sHour2 = 11;
    }

    if (sHour == 5) {
      sHour2 = 10;
    }

    if (sHour == 4) {
      sHour2 = 9;
    }

    if (sHour == 3) {
      sHour2 = 8;
    }

    if (sHour == 2) {
      sHour2 = 7;
    }

    if (sHour == 1) {
      sHour2 = 6;
    }
  } else {
    sHour2 = sHour - 7;
  }

  if (sHour2 == 0) {
    sHour2 = 12;
  }

  return sMonthSpelled + ' ' + sDay + ", " + sYear + ' at ' + sHour2 + ':' + sMinute + dayNight;
}

function numberIntoMonth(number) {
  var sMonthSpelled = '';

  switch (Number(number)) {
    case 1:
      sMonthSpelled = 'January';
      break;

    case 2:
      sMonthSpelled = 'February';
      break;

    case 3:
      sMonthSpelled = 'March';
      break;

    case 4:
      sMonthSpelled = 'April';
      break;

    case 5:
      sMonthSpelled = 'May';
      break;

    case 6:
      sMonthSpelled = 'June';
      break;

    case 7:
      sMonthSpelled = 'July';
      break;

    case 8:
      sMonthSpelled = 'August';
      break;

    case 9:
      sMonthSpelled = 'September';
      break;

    case 10:
      sMonthSpelled = 'October';
      break;

    case 11:
      sMonthSpelled = 'November';
      break;

    case 12:
      sMonthSpelled = 'December';
      break;

    default:
      sMonthSpelled = 'unknown';
  }

  return sMonthSpelled;
}