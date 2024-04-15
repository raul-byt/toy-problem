const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin, // for input in node terminal
  output: process.stdout //for output in node terminal
});

function speedDetect(speed) {
    const speedLimit = 70;
    const demeritKm = 5;
    let demeritPoints = 0;

    if (speed <= speedLimit) {
        console.log("Ok");//if speedlimit isnt reached then print "ok"
    } else {
        demeritPoints = Math.floor((speed - speedLimit) / demeritKm);
        console.log("Demerit points: " + demeritPoints);
    }

    return demeritPoints;
}

function promptSpeed() {
    rl.question('Enter the speed of the car (in km/h): ', (speed) => {
        speed = parseInt(speed);//put speed in km/has integer 
        const demeritPoints = speedDetect(speed);
        if (demeritPoints > 12) {
            console.log("License suspended");//if demerit points are more than 12 suspend lincence 
        } else {
            console.log("Your demerit points: " + demeritPoints);//show demerit points in the   console
        }
        rl.close();
    });
}

promptSpeed()
