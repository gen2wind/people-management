export const handleDate = (date) =>{
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth()+1;
    let dt = d.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return {
        rawDate: date,
        date: year+'-' + month + '-'+dt
    };
}