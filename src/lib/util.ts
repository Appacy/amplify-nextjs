export class util {
    static epochToDateTimeString(epoch: number): string {
    function appendZero(value: number): string {
        if (value < 10) {
            return `0${value.toString()}`
        } else {
            return value.toString();
        }
    }

    let date = new Date(epoch);

    return appendZero(date.getDate())
                    + "/" 
                    + appendZero(date.getMonth() + 1) 
                    + "/" 
                    + date.getFullYear()
                    + " " 
                    + appendZero(date.getHours()) 
                    + ":" 
                    + appendZero(date.getMinutes()) 
                    + ":" 
                    + appendZero(date.getSeconds());;
    }
}