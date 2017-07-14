$(document).ready(function(){
  $("#testForm").submit(function(event) {
    event.preventDefault();

    var dataCar = [{0:0}, {5:2.70}, {10:8.83}, {15:15.16}, {20:21.74}, {25:28.67}, {30: 36.10}, {35:44.06}, {40:52.70}, {45:62.07}, {55: 83.47}, {60: 95.70},{65:109.02},{70:123.61}, {75:139.53}, {80:156.85}];

    function findCost(speed,dataObject) {
      for (var i = 0; i < dataObject.length; i++) {
        if(speed == Object.keys(dataObject[i])){
          return dataObject[i][speed];
        }
      }
    };
    //get input
    var percentCar = parseFloat($("#percentCar").val());
    var percentSUTruck = parseFloat($("#percentSUTruck").val());
    var percentCTruck = parseFloat($("#percentSUTruck").val());
    var initialSpeed =
    parseInt($("#initial").val());
    var reduceSpeed =
    parseInt($("#reduce").val());
    //variable from Josh
    var totalAffected = 4596;
    //calculation for cars
    var initialSpeedCar = findCost(initialSpeed,dataCar);
    var reduceSpeedCar = findCost(reduceSpeed,dataCar);
    var differenceCar = parseFloat((initialSpeedCar - reduceSpeedCar).toFixed(2));
    var weightedCostCar = parseFloat((differenceCar*percentCar/100).toFixed(2));

    //calculation for SUTrucks
    var initialSpeedSUTruck = findCost(initialSpeed,dataSUTruck);
    var reduceSpeedSUTruck = findCost(reduceSpeed,dataSUTruck);
    var differenceSUTruck = parseFloat(initialSpeedSUTruck - reduceSpeedSUTruck);
    var weightedCostSUTruck = parseFloat((differenceSUTruck*percentSUTruck/100).toFixed(2));

    // //calculation for CTrucks
    var initialSpeedCTruck = findCost(initialSpeed,dataCTruck);
    var reduceSpeedCTruck = findCost(reduceSpeed,dataCTruck);
    var differenceCTruck = parseFloat(initialSpeedCTruck - reduceSpeedCTruck);
    var weightedCostCTruck = parseFloat((differenceCTruck*percentCTruck/100).toFixed(2));

    var weightedTotal = weightedCostCar + weightedCostSUTruck + weightedCostCTruck;

    var resultTotal = totalAffected*weightedTotal/1000;





    console.log(weightedTotal);
  })
});
