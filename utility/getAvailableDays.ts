import { add, eachDayOfInterval, formatISO, format } from "date-fns";

export function getAvailableDays(setFormValues) {
    let dates = [];
    fetch('/api/appointments/dates',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        
        data.map(element => {
          dates.push(element['apt']);
        });
      let now = new Date(Date.now());
      now.setMinutes(0);
      now.setSeconds(0);
      now.setMilliseconds(0);
      console.log(now)
      if (now.getUTCHours() >= 14) {
        now = add(now, { days: 1 });
      }
      now.setHours(0);
      let endDay = add(now, { days: 14 });
      const availableDays = eachDayOfInterval({
        start: now,
        end: endDay,
      });
      let availableDaysISO = [];
      availableDays.forEach((x) => {
        availableDaysISO.push(formatISO(x));
      });
      availableDaysISO = availableDaysISO.filter(item => !dates.includes(item));
      let availableDaysFinal = []
      availableDaysISO.forEach((x) => {
        availableDaysFinal.push(format(new Date(x), 'MM/dd/yy'));
      });
      setFormValues(current => ({
        ...current,
        time: {
          ...current.time,
          value:availableDaysFinal[0],
          options:availableDaysFinal
        },
    }));
      }).catch((e) => {console.log(e)});
}