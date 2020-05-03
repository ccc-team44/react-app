import {HeatMapItem} from "@/pages/HeatMap/data";

const center = [144.9631, -37.8136] as [number, number];

export const getMockData =  ()  : HeatMapItem[] => {
  const data = []
  for(let i = 0; i<= 1100; i+=1){
    data.push({
      "lng": center[0] -0.03 + Math.random() / 16 ,
      "lat": center[1] -0.03 + Math.random() / 16
    })
  }
  return data

}
