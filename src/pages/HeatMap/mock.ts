import {HeatMapItem} from "@/pages/HeatMap/data";

const center = [144.9631, -37.8136] as [number, number];

export const getMockData =  ()  : HeatMapItem[] => {
  const data = []
  for(let i = 0; i<= 50; i+=1){
    const rand = Math.random()
    data.push({
      "county": "MELBOURNE",
      "numberOfHouses": 200 * rand,
      "averagePrice": 900000 * rand,
      "minPrice": 400000 * rand,
      "maxPrice": 29000000 * rand,
      "latlng": [
        center[0] -0.02 + Math.random() / 10 ,
        center[1] -0.02 + Math.random() / 10
      ],
      "priceIndicator": 4 * rand
    })
  }
  return data

}
