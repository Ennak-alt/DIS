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
    posting_date: string,
    seller_id: string,
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
    posting_date: "N/A",
    seller_id: "-1"
  }

  export default class CarService {
    public static async GetPost(id: number): Promise<Car> {
      return await fetch("http://localhost:8088/posts/" + id).then(res => res.json());
    }
    public static async GetSellerCars(seller_id: string): Promise<Car[]> {
      return await fetch("http://localhost:8088/posts/?seller_id=" + seller_id).then(res => res.json()); 
    }
    public static async GetRecommended(car: Car): Promise<Car[]> {
      let rec_cars : Car[] = []
      rec_cars.concat(await fetch(`http://localhost:8088/posts/?id=${car.id}&cartype=${car.cartype}&paint_color=${car.paint_color}&price=${car.price}`)
       .then(res => res.json()));

      if (rec_cars.length < 6) {
        rec_cars = rec_cars.concat(await fetch(`http://localhost:8088/posts/?id=${car.id}&cartype=${car.cartype}&paint_color=${car.paint_color}`)
        .then(res => res.json()));
      }
      if (rec_cars.length < 6) {
        rec_cars = rec_cars.concat(await fetch(`http://localhost:8088/posts/?id=${car.id}&cartype=${car.cartype}`)
        .then(res => res.json()));
      }
      return rec_cars.slice(0,6)
    }
  }