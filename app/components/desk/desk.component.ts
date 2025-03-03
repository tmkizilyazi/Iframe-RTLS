import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ISeat } from '../interfaces/seat.interfac';
import { ITableShape } from '../interfaces/table-shape';

@Component({
  selector: 'app-desk',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './desk.component.html',
  styleUrl: './desk.component.scss'

})
export class DeskComponent implements OnInit, OnDestroy {
  seats: ISeat[] = [];
  tableWidth = 800;
  tableLength = 600;
  draggedSeat: ISeat | null = null;
  lastMouseX = 0;
  lastMouseY = 0;
  isSidebarOpen: boolean = true;
  is3D: boolean = false; // 3D görünüm modu kontrolü

  // 14 farklı masa şekli tanımı (her zaman wood-texture.jpg kullanılacak)
  // (Önceki masa şekillerine ek olarak, iki farklı U şeklinde masa eklenmiştir.)
  tableShapes: ITableShape[] = [
    {
      id: 1,
      name: 'Dikdörtgen Masa',
      tableWidth: 800,
      tableLength: 600,
      defaultSeats: [
        { id: 1, isOccupied: false, position: { x: 100, y: 100 }, rotation: 0 },
        { id: 2, isOccupied: false, position: { x: 100, y: 400 }, rotation: 0 },
        { id: 3, isOccupied: false, position: { x: 600, y: 100 }, rotation: 0 },
        { id: 4, isOccupied: false, position: { x: 600, y: 400 }, rotation: 0 }
      ]
    },
    {
      id: 2,
      name: 'Yuvarlak Masa',
      tableWidth: 600,
      tableLength: 600,
      defaultSeats: [
        { id: 1, isOccupied: false, position: { x: 270, y: 50 }, rotation: 0 },
        { id: 2, isOccupied: false, position: { x: 50, y: 270 }, rotation: 0 },
        { id: 3, isOccupied: false, position: { x: 270, y: 490 }, rotation: 0 },
        { id: 4, isOccupied: false, position: { x: 490, y: 270 }, rotation: 0 }
      ],
      round: true
    },
    {
      id: 3,
      name: 'Kare Masa',
      tableWidth: 600,
      tableLength: 600,
      defaultSeats: [
        { id: 1, isOccupied: false, position: { x: 50, y: 50 }, rotation: 0 },
        { id: 2, isOccupied: false, position: { x: 50, y: 500 }, rotation: 0 },
        { id: 3, isOccupied: false, position: { x: 500, y: 50 }, rotation: 0 },
        { id: 4, isOccupied: false, position: { x: 500, y: 500 }, rotation: 0 }
      ]
    },
    {
      id: 4,
      name: 'Oval Masa',
      tableWidth: 800,
      tableLength: 500,
      defaultSeats: [
        { id: 1, isOccupied: false, position: { x: 350, y: 20 }, rotation: 0 },
        { id: 2, isOccupied: false, position: { x: 350, y: 420 }, rotation: 0 },
        { id: 3, isOccupied: false, position: { x: 20, y: 250 }, rotation: 0 },
        { id: 4, isOccupied: false, position: { x: 680, y: 250 }, rotation: 0 }
      ],
      isOval: true
    },
    {
      id: 5,
      name: 'Üçgen Masa',
      tableWidth: 700,
      tableLength: 600,
      defaultSeats: [
        { id: 1, isOccupied: false, position: { x: 350, y: 50 }, rotation: 0 },
        { id: 2, isOccupied: false, position: { x: 50, y: 550 }, rotation: 0 },
        { id: 3, isOccupied: false, position: { x: 650, y: 550 }, rotation: 0 }
      ],
      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
    },
    {
      id: 6,
      name: 'Altıgen Masa',
      tableWidth: 800,
      tableLength: 700,
      defaultSeats: [
        { id: 1, isOccupied: false, position: { x: 150, y: 50 }, rotation: 0 },
        { id: 2, isOccupied: false, position: { x: 600, y: 50 }, rotation: 0 },
        { id: 3, isOccupied: false, position: { x: 750, y: 350 }, rotation: 0 },
        { id: 4, isOccupied: false, position: { x: 600, y: 650 }, rotation: 0 },
        { id: 5, isOccupied: false, position: { x: 150, y: 650 }, rotation: 0 },
        { id: 6, isOccupied: false, position: { x: 0, y: 350 }, rotation: 0 }
      ],
      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
    },
    {
      id: 7,
      name: 'Yıldız Masa',
      tableWidth: 800,
      tableLength: 800,
      defaultSeats: [
        { id: 1, isOccupied: false, position: { x: 370, y: 20 }, rotation: 0 },
        { id: 2, isOccupied: false, position: { x: 720, y: 300 }, rotation: 0 },
        { id: 3, isOccupied: false, position: { x: 600, y: 720 }, rotation: 0 },
        { id: 4, isOccupied: false, position: { x: 200, y: 720 }, rotation: 0 },
        { id: 5, isOccupied: false, position: { x: 80, y: 300 }, rotation: 0 }
      ],
      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
    },
    {
      id: 8,
      name: 'Elliptik Masa',
      tableWidth: 800,
      tableLength: 500,
      defaultSeats: [
        { id: 1, isOccupied: false, position: { x: 350, y: 20 }, rotation: 0 },
        { id: 2, isOccupied: false, position: { x: 350, y: 420 }, rotation: 0 },
        { id: 3, isOccupied: false, position: { x: 20, y: 250 }, rotation: 0 },
        { id: 4, isOccupied: false, position: { x: 680, y: 250 }, rotation: 0 }
      ],
      round: true
    },
    {
      id: 9,
      name: 'Paralelkenar Masa',
      tableWidth: 800,
      tableLength: 600,
      defaultSeats: [
        { id: 1, isOccupied: false, position: { x: 150, y: 150 }, rotation: 0 },
        { id: 2, isOccupied: false, position: { x: 600, y: 150 }, rotation: 0 },
        { id: 3, isOccupied: false, position: { x: 600, y: 450 }, rotation: 0 },
        { id: 4, isOccupied: false, position: { x: 150, y: 450 }, rotation: 0 }
      ],
      clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)'
    },
    {
      id: 10,
      name: 'Asimetrik Masa',
      tableWidth: 800,
      tableLength: 600,
      defaultSeats: [
        { id: 1, isOccupied: false, position: { x: 50, y: 50 }, rotation: 0 },
        { id: 2, isOccupied: false, position: { x: 650, y: 100 }, rotation: 0 },
        { id: 3, isOccupied: false, position: { x: 700, y: 500 }, rotation: 0 },
        { id: 4, isOccupied: false, position: { x: 100, y: 500 }, rotation: 0 }
      ],
      clipPath: 'polygon(0% 0%, 100% 10%, 90% 100%, 0% 90%)'
    },
    {
      id: 11,
      name: 'Köşeli U Şeklinde Masa',
      tableWidth: 800,
      tableLength: 600,
      defaultSeats: [
        { id: 1, isOccupied: false, position: { x: 150, y: 500 }, rotation: 0 },
        { id: 2, isOccupied: false, position: { x: 350, y: 500 }, rotation: 0 },
        { id: 3, isOccupied: false, position: { x: 550, y: 500 }, rotation: 0 }
      ],
      clipPath: 'polygon(0% 100%, 0% 40%, 20% 40%, 20% 0%, 80% 0%, 80% 40%, 100% 40%, 100% 100%)'
    },
    {
      id: 12,
      name: 'Yuvarlak U Şeklinde Masa',
      tableWidth: 800,
      tableLength: 600,
      defaultSeats: [
        { id: 1, isOccupied: false, position: { x: 120, y: 500 }, rotation: 0 },
        { id: 2, isOccupied: false, position: { x: 400, y: 500 }, rotation: 0 },
        { id: 3, isOccupied: false, position: { x: 680, y: 500 }, rotation: 0 }
      ],
      clipPath: 'polygon(10% 100%, 10% 50%, 30% 30%, 70% 30%, 90% 50%, 90% 100%)'
    },
    // Yeni: Gerçek U Şeklinde Masa (köşeli iç kenarlı; üst kenarın ortası %60 eksik)
    {
      id: 13,
      name: 'Gerçek U Şeklinde Masa (Köşeli)',
      tableWidth: 800,
      tableLength: 600,
      defaultSeats: [
        { id: 1, isOccupied: false, position: { x: 150, y: 500 }, rotation: 0 },
        { id: 2, isOccupied: false, position: { x: 350, y: 500 }, rotation: 0 },
        { id: 3, isOccupied: false, position: { x: 550, y: 500 }, rotation: 0 },
        { id: 4, isOccupied: false, position: { x: 150, y: 300 }, rotation: 0 },
        { id: 5, isOccupied: false, position: { x: 550, y: 300 }, rotation: 0 }
      ],
      // Köşeli U: Üst kenarın %20–%80 arası tamamen eksik
      clipPath: "polygon(0% 100%, 0% 0%, 20% 0%, 20% 60%, 80% 60%, 80% 0%, 100% 0%, 100% 100%)"
    },
    // Yeni: Gerçek U Şeklinde Masa (yuvarlak iç kenarlı)
    {
      id: 14,
      name: 'Gerçek U Şeklinde Masa (Yuvarlak)',
      tableWidth: 800,
      tableLength: 600,
      defaultSeats: [
        { id: 1, isOccupied: false, position: { x: 150, y: 500 }, rotation: 0 },
        { id: 2, isOccupied: false, position: { x: 350, y: 500 }, rotation: 0 },
        { id: 3, isOccupied: false, position: { x: 550, y: 500 }, rotation: 0 },
        { id: 4, isOccupied: false, position: { x: 150, y: 300 }, rotation: 0 },
        { id: 5, isOccupied: false, position: { x: 550, y: 300 }, rotation: 0 }
      ],
      // Yuvarlak U: Üst kenarın ortası %20–%80 arası yumuşak geçişli (SVG path kullanılarak)
      clipPath: "path('M 0 100 L 0 0 L 20 0 Q 25 0, 25 5 L 25 55 Q 25 60, 30 60 L 70 60 Q 75 60, 75 55 L 75 5 Q 75 0, 80 0 L 100 0 L 100 100 Z')"
    }
  ];

  selectedShape: ITableShape | null = null;
  private isBrowser: boolean;

  // 3D görünüm modu kontrolü

  // Iframe'dan gelen sensör verilerini dinleyen fonksiyon
  private handleIframeMessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      if (data.seats) {
        this.updateSeatsFromIframe(data.seats);
      }
    } catch (error) {
      console.error('Error processing iframe message:', error);
    }
  };

  private boundMouseMove = this.onMouseMove.bind(this);
  private boundMouseUp = this.onMouseUp.bind(this);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // Seçili masa şeklinin ID'sini localStorage'dan alıp, varsa onun state'ini yüklüyoruz
    if (this.isBrowser) {
      const savedShapeId = localStorage.getItem('selectedTableShapeId');
      if (savedShapeId) {
        const shape = this.tableShapes.find(s => s.id === +savedShapeId);
        if (shape) {
          this.selectShape(shape, true);
        } else {
          this.selectShape(this.tableShapes[0], true);
        }
      } else {
        this.selectShape(this.tableShapes[0], true);
      }
    } else {
      this.selectShape(this.tableShapes[0], true);
    }
    this.setupEventListeners();
    this.setupIframeListener();
  }

  ngOnDestroy() {
    this.cleanupEventListeners();
    if (this.isBrowser) {
      window.removeEventListener('message', this.handleIframeMessage);
    }
  }

  setupEventListeners() {
    if (this.isBrowser) {
      document.addEventListener('mousemove', this.boundMouseMove);
      document.addEventListener('mouseup', this.boundMouseUp);
    }
  }

  cleanupEventListeners() {
    if (this.isBrowser) {
      document.removeEventListener('mousemove', this.boundMouseMove);
      document.removeEventListener('mouseup', this.boundMouseUp);
    }
  }

  setupIframeListener() {
    if (this.isBrowser) {
      window.addEventListener('message', this.handleIframeMessage);
    }
  }

  /**
   * Masa şeklini seçer. Eğer persistShape parametresi true ise seçili şekil ID'si localStorage'a kaydedilir.
   * Eğer o şekle ait state varsa (sensör konumları vb.) yüklenir.
   */
  selectShape(shape: ITableShape, persistShape: boolean = true) {
    this.selectedShape = shape;
    this.tableWidth = shape.tableWidth;
    this.tableLength = shape.tableLength;
    if (this.isBrowser) {
      if (persistShape) {
        localStorage.setItem('selectedTableShapeId', shape.id.toString());
      }
      const savedState = localStorage.getItem(this.getStorageKey());
      if (savedState) {
        const state = JSON.parse(savedState);
        this.seats = state.seats.map((s: any) => ({
          ...s,
          lastUpdate: s.lastUpdate ? new Date(s.lastUpdate) : new Date()
        }));
        this.tableWidth = state.tableWidth;
        this.tableLength = state.tableLength;
        return;
      }
    }
    this.initializeSeats(shape.defaultSeats);
  }

  initializeSeats(defaultSeats: ISeat[]) {
    this.seats = defaultSeats.map(seat => ({
      ...seat,
      signalStrength: 100,
      batteryLevel: 100,
      lastUpdate: new Date()
    }));
    this.saveTableState();
  }

  addSeat() {
    const newId = Math.max(0, ...this.seats.map(s => s.id)) + 1;
    this.seats.push({
      id: newId,
      isOccupied: false,
      position: { x: 200, y: 200 },
      rotation: 0,
      signalStrength: 100,
      batteryLevel: 100,
      lastUpdate: new Date()
    });
    this.saveTableState();
  }

  updateTable() {
    this.seats = this.seats.map(seat => ({
      ...seat,
      position: {
        x: Math.min(Math.max(0, seat.position.x), this.tableWidth - 80),
        y: Math.min(Math.max(0, seat.position.y), this.tableLength - 80)
      }
    }));
    this.saveTableState();
  }

  startDrag(event: MouseEvent, seat: ISeat) {
    if (event.button === 0) {
      event.preventDefault();
      this.draggedSeat = seat;
      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;
    }
  }

  onMouseMove(e: MouseEvent) {
    if (this.draggedSeat) {
      const deltaX = e.clientX - this.lastMouseX;
      const deltaY = e.clientY - this.lastMouseY;
      const newX = Math.min(Math.max(0, this.draggedSeat.position.x + deltaX), this.tableWidth - 80);
      const newY = Math.min(Math.max(0, this.draggedSeat.position.y + deltaY), this.tableLength - 80);
      this.draggedSeat.position = { x: newX, y: newY };
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    }
  }

  onMouseUp() {
    if (this.draggedSeat) {
      this.draggedSeat = null;
      this.saveTableState();
    }
  }

  rotateSeat(event: MouseEvent, seat: ISeat) {
    event.preventDefault();
    seat.rotation = (seat.rotation + 90) % 360;
    this.saveTableState();
  }

  deleteSeat(seat: ISeat, event: MouseEvent) {
    event.stopPropagation();
    this.seats = this.seats.filter(s => s.id !== seat.id);
    this.saveTableState();
  }

  getSeatTransform(seat: ISeat): string {
    return `translate(${seat.position.x}px, ${seat.position.y}px) rotate(${seat.rotation}deg)`;
  }

  getSeatSignalOpacity(seat: ISeat): number {
    return seat.signalStrength ? seat.signalStrength / 100 : 0.5;
  }

  isBatteryLow(seat: ISeat): boolean {
    return seat.batteryLevel ? seat.batteryLevel < 20 : false;
  }

  getActiveSeats(): number {
    return this.seats.filter(seat => seat.isOccupied).length;
  }

  updateSeatsFromIframe(iframeSeats: any[]) {
    this.seats = this.seats.map(seat => {
      const iframeSeat = iframeSeats.find((s: any) => s.id === seat.id);
      if (iframeSeat) {
        return {
          ...seat,
          isOccupied: iframeSeat.isOccupied,
          signalStrength: iframeSeat.signalStrength || 100,
          batteryLevel: iframeSeat.batteryLevel || 100,
          lastUpdate: new Date()
        };
      }
      return seat;
    });
    this.saveTableState();
  }

  getStorageKey(): string {
    return 'deskState_' + (this.selectedShape ? this.selectedShape.id : 'default');
  }

  saveTableState() {
    if (this.isBrowser) {
      const state = {
        tableWidth: this.tableWidth,
        tableLength: this.tableLength,
        seats: this.seats
      };
      localStorage.setItem(this.getStorageKey(), JSON.stringify(state));
    }
  }

  /**
   * Masa yüzeyine uygulanacak CSS stillerini belirler.
   * Her zaman wood-texture.jpg kullanılacak.
   * Eğer selectedShape.clipPath varsa onu uygular.
   */
  getTableStyles(): { [key: string]: any } {
    let styles: { [key: string]: any } = {
      'background': "url('/images/wood-texture.jpg') no-repeat center center",
      'backgroundSize': 'cover',
      'backgroundPosition': 'center',
      'transition': 'all 0.3s'
    };

    if (this.selectedShape) {
      if (this.selectedShape.round) {
        styles['border-radius'] = '50%';
      } else if (this.selectedShape.isOval) {
        styles['border-radius'] = '50% / 25%';
      } else {
        styles['border-radius'] = '10px';
      }
      if (this.selectedShape.clipPath) {
        styles['clip-path'] = this.selectedShape.clipPath;
      }
    }
    return styles;
  }

  /**
   * Menü önizlemesi için küçük masa şekli stili.
   * Her zaman wood-texture.jpg kullanılacak.
   */
  getShapePreviewStyle(shape: ITableShape): { [key: string]: any } {
    let styles: { [key: string]: any } = {
      'width': '40px',
      'height': '40px',
      'border': '1px solid #bdc3c7',
      'backgroundSize': 'cover',
      'backgroundPosition': 'center',
      'margin-right': '10px'
    };

    styles['background'] = "url('/images/wood-texture.jpg') no-repeat center center";
    if (shape.round) {
      styles['border-radius'] = '50%';
    } else if (shape.isOval) {
      styles['border-radius'] = '50% / 25%';
    } else {
      styles['border-radius'] = '5px';
    }
    if (shape.clipPath) {
      styles['clip-path'] = shape.clipPath;
    }
    return styles;
  }

  trackBySeat(index: number, seat: ISeat): number {
    return seat.id;
  }

  // Sidebar açma/kapama fonksiyonu
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // 3D görünüm modunu açıp kapatan fonksiyon
  toggle3DView() {
    this.is3D = !this.is3D;
  }
}
