export interface Car {
    idx: number,
    id: string,
    region: string,
    price: number,
    caryear: string,
    manufacturer: string,
    model: string,
    condition: string,
    cylinders: string,
    fuel: string,
    odometer: string,
    transmission: string,
    VIN: string,
    drive: string,
    size: string,
    cartype: string,
    paint_color: string,
    cardescription: string,
    county: string,
    carstate: string,
    posting_date: string
  }

  export const DefaultCar: Car = {
    idx: 0,
    id: "N/A",
    region: "N/A",
    price: 0,
    caryear: "N/A",
    manufacturer: "N/A",
    model: "N/A",
    condition: "N/A",
    cylinders: "N/A",
    fuel: "N/A",
    odometer: "N/A",
    transmission: "N/A",
    VIN: "N/A",
    drive: "N/A",
    size: "N/A",
    cartype: "N/A",
    paint_color: "N/A",
    cardescription: "N/A",
    county: "N/A",
    carstate: "N/A",
    posting_date: "N/A"
  }

  export default class CarService {
    public static async GetPost(id: number): Promise<Car> {
      return await fetch("http://localhost:8088/post/" + id).then(res => res.json());
    }
    public static async GetAlike(car: Car): Promise<Car[]> {
        return await fetch(`http://localhost:8088/alike_post?car_type=${car.cartype}&paint_color=${car.paint_color}&price=${car.price}`)
       .then(res => res.json());
    }
  }