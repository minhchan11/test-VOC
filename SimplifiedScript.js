//Object received from previous calculation, the numbers below are from the spreadsheet, used for testing
var options = {
    trafficAffected: {
        passengerVehicles: 4091,
        singleTrucks: 276,
        comboTrucks: 230
    },
    initialSpeed: 55,
    wzSpeed: 40
}

//Main function to calculate Added VOC for slowing down
function calculateAddedVoc(options) {
    var passengerVehicles = options.trafficAffected.passengerVehicles;
    var singleTrucks = options.trafficAffected.singleTrucks;
    var comboTrucks = options.trafficAffected.comboTrucks;
    var totalAffected = options.trafficAffected.passengerVehicles + options.trafficAffected.singleTrucks + options.trafficAffected.comboTrucks;
    var initialSpeed = options.initialSpeed;
    var reduceSpeed = options.wzSpeed;

    //Data Set is an array of object representing cost of each vehicle groups from 1996 report
    var dataPassengerVehicles = [{0:0}, {5:2.70}, {10:8.83}, {15:15.16}, {20:21.74}, {25:28.67}, {30: 36.10}, {35:44.06}, {40:52.70}, {45:62.07}, {50: 72.31},{55: 83.47}, {60: 95.70},{65:109.02},{70:123.61}, {75:139.53}, {80:156.85}];

    var dataSingleTrucks = [{0:0}, {5:9.25}, {10:20.72}, {15:33.89}, {20:48.40}, {25:63.97}, {30: 80.23}, {35:96.88}, {40:113.97}, {45:130.08}, {50: 145.96}, {55: 160.89},{60:178.98},{65:195.84}, {70:209.06}, {75:224.87}, {80:240.68}];

    var dataComboTrucks = [{0:0}, {5:33.62}, {10:77.49}, {15:129.97}, {20:190.06}, {25:256.54}, {30: 328.21}, {35:403.84}, {40:482.21}, {45:562.14}, {50: 642.41}, {55: 721.77},{60:798.99},{65:849.64}, {70:921.03}, {75:992.42},{80:1063.82}];

    //dataArray is an array of object containing the speed and the coordinating cost
    function findCost(speed,dataArray) {
      for (var i = 0; i < dataArray.length; i++){
        if(speed == Object.keys(dataArray[i])){
          return dataArray[i][speed];
        }
      }
    };

    //calculateIndividualVoc is to find the corresponding cost damages to each group of vehicles
    function calculateIndividualVoc(dataNumber, initialSpeed, reduceSpeed, dataArray){
      return ((findCost(initialSpeed,dataArray) - findCost(reduceSpeed,dataArray))*(dataNumber/1000)).toFixed(2);
    }

    //Calculate the cost of each affected group of vehicle
    var passengerVehiclesAffectedCost = parseFloat(calculateIndividualVoc(passengerVehicles, initialSpeed, reduceSpeed, dataPassengerVehicles));
    var singleTrucksAffectedCost = parseFloat(calculateIndividualVoc(singleTrucks, initialSpeed, reduceSpeed, dataSingleTrucks));
    var comboTrucksAffectedCost = parseFloat(calculateIndividualVoc(comboTrucks, initialSpeed, reduceSpeed, dataComboTrucks));
    var totalAffectedCost = parseFloat((passengerVehiclesAffectedCost + singleTrucksAffectedCost + comboTrucksAffectedCost).toFixed(2));


    return {
        total: totalAffectedCost,
        passengerVehicles: passengerVehiclesAffectedCost,
        singleTrucks: singleTrucksAffectedCost,
        comboTrucks: comboTrucksAffectedCost
    }
}
