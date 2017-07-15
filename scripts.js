$(document).ready(function(){
  $("#testForm").submit(function(event) {
    event.preventDefault();

    var dataCar = [{0:0}, {5:2.70}, {10:8.83}, {15:15.16}, {20:21.74}, {25:28.67}, {30: 36.10}, {35:44.06}, {40:52.70}, {45:62.07}, {50: 72.31},{55: 83.47}, {60: 95.70},{65:109.02},{70:123.61}, {75:139.53}, {80:156.85}];

    var dataSUTruck = [{0:0}, {5:9.25}, {10:20.72}, {15:33.89}, {20:48.40}, {25:63.97}, {30: 80.23}, {35:96.88}, {40:113.97}, {45:130.08}, {50: 145.96}, {55: 160.89},{60:178.98},{65:195.84}, {70:209.06}, {75:224.87}, {80:240.68}];

    var dataCTruck = [{0:0}, {5:33.62}, {10:77.49}, {15:129.97}, {20:190.06}, {25:256.54}, {30: 328.21}, {35:403.84}, {40:482.21}, {45:562.14}, {50: 642.41}, {55: 721.77},{60:798.99},{65:849.64}, {70:921.03}, {75:992.42},{80:1063.82}];

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
    var percentCTruck = parseFloat($("#percentCTruck").val());
    var initialSpeed =
    parseInt($("#initial").val());
    var reduceSpeed =
    parseInt($("#reduce").val());

    //variable from Josh
    var totalAffected = 4596;
    var totalCar = totalAffected*percentCar/100;
    var totalSUTruck = totalAffected*percentSUTruck/100;
    var totalCTruck = totalAffected*percentCTruck/100;

    //calculation for cars
    var initialSpeedCar = findCost(initialSpeed,dataCar);
    var reduceSpeedCar = findCost(reduceSpeed,dataCar);
    var differenceCar = parseFloat((initialSpeedCar - reduceSpeedCar).toFixed(2));
    var weightedCostCar = parseFloat((differenceCar*percentCar/100).toFixed(2));

    ((findCost(initialSpeed,dataCar) - findCost(reduceSpeed,dataCar))*(parseFloat(passengerVehicles/totalAffected))).toFixed(2);
    //calculation for SUTrucks
    var initialSpeedSUTruck = findCost(initialSpeed,dataSUTruck);
    var reduceSpeedSUTruck = findCost(reduceSpeed,dataSUTruck);
    var differenceSUTruck = parseFloat((initialSpeedSUTruck - reduceSpeedSUTruck).toFixed(2));
    var weightedCostSUTruck = parseFloat((differenceSUTruck*percentSUTruck/100).toFixed(2));

    // //calculation for CTrucks
    var initialSpeedCTruck = findCost(initialSpeed,dataCTruck);
    var reduceSpeedCTruck = findCost(reduceSpeed,dataCTruck);
    var differenceCTruck = parseFloat((initialSpeedCTruck - reduceSpeedCTruck).toFixed(2));
    var weightedCostCTruck = parseFloat((differenceCTruck*percentCTruck/100).toFixed(2));

    var weightedTotal = weightedCostCar + weightedCostSUTruck + weightedCostCTruck;

    var resultTotal = parseFloat((totalAffected*weightedTotal/1000).toFixed(2));
    var carTotal = parseFloat((totalCar*differenceCar/1000).toFixed(2));
    var SUTruckTotal = parseFloat((totalSUTruck*differenceSUTruck/1000).toFixed(2));
    var CTruckTotal = parseFloat((totalCTruck*differenceCTruck/1000).toFixed(2));
    var resultDay = parseFloat((carTotal+SUTruckTotal+CTruckTotal).toFixed(2));
    var resultMonth = (resultDay*60).toFixed(2);

    $("#resultTotal").text(resultTotal);
    $("#resultCar").text(carTotal);
    $("#resultSUTruck").text(SUTruckTotal);
    $("#resultCTruck").text(CTruckTotal);
    $("#resultDay").text(resultDay);
    $("#resultMonth").text(resultMonth);


  })
});
