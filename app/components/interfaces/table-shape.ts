import { ISeat } from "./seat.interfac";


export interface ITableShape {
    id: number;
    name: string;
    tableWidth: number;
    tableLength: number;
    defaultSeats: ISeat[];
    // Masa özel şekilleri için özellikler:
    round?: boolean;    // Eğer true ise border-radius:50% uygulanır (tam yuvarlak/elliptik görünüm)
    isOval?: boolean;   // Özel oval görünüm için (örneğin "50% / 25%")
    clipPath?: string;  // Özel şekiller (ör. U, üçgen, altıgen vb.) için clip-path değeri
  }