// Define la interfaz para el objeto de reserva
export interface IReservation {
    id: number; 
    client: string; 
    service: string; 
    status: string; 
    reservationDate: Date; 
    cancellationDate?: Date;
}
