class CloudTravel {
  
  constructor (canTavel, latitude, longitude, source, destination) {
    this.canTavel = canTavel;
    this.latitude = latitude;
    this.longitude = longitude;
    this.source = source;
    this.destination = destination;
    this.radius = 4000;
    this.noOfAirports = this.latitude.length;
  }

  shortestCourierTrip() {
    
    const distance = Array.apply(null, {length: this.noOfAirports}).map(e => Infinity)
    const isVertixProcessed = Array.apply(null, {length: this.noOfAirports}).map(e => false)
    
    console.log(distance);
    console.log(isVertixProcessed);
    distance[this.source] = 0;
    
    Array.apply(null, {
      length: this.noOfAirports
    }).forEach((element, index) => {

      const airport = this.shortestTrip(distance, isVertixProcessed);
      isVertixProcessed[airport] = true;

      for(let v = 0; v < this.canTavel[airport].length; v += 1) {
        const adjAirport = this.canTavel[airport][v];

        const cost = this.shortestTripConst(airport, adjAirport);
        // console.log(airport, adjAirport, cost);
        if (
          !isVertixProcessed[adjAirport] && 
          distance[airport] != Infinity && 
          distance[airport] + cost < distance[adjAirport]
        ) {
          distance[adjAirport] = distance[airport]+ cost;
        }
      }
    });
    if (distance[this.destination] == Infinity) {
      return -1;
    } else {
      return distance[this.destination]
    }
  }

  shortestTrip (distance, isVertixProcessed) {
    let min = Infinity;
    let mIndex = 0;
    for (let i = 0; i < this.noOfAirports; i+=1) {
      if (isVertixProcessed[i] == false && distance[i] <= min) {
        min = distance[i];
        mIndex = i;
      }
    }
    return mIndex;
  }

  shortestTripConst (nodeA, nodeB) {
    //return 1;
    const lat1 = this.latitude[nodeA]; 
    const lon1 = this.longitude[nodeA]; 
    const lat2 = this.latitude[nodeB];
    const lon2 = this.longitude[nodeB];
    return  this.radius * Math.acos(
      Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)
    );
  }

}
var airplaneCanTavel = [
  [2],
  [0, 2],
  [0, 1]
];

const latitude = [0, 0, 70];
const longitude = [90, 0, 45];

const obj = new CloudTravel(airplaneCanTavel, latitude, longitude, 0, 1);


console.log(obj.shortestCourierTrip());