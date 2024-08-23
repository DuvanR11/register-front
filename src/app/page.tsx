"use client"
// pages/index.tsx
import React, { useState, useEffect } from 'react';
import ReservationList from '@/components/ReservationList';
import ReservationForm from '@/components/ReservationForm';
import { Dialog } from 'primereact/dialog';
import { endPointSetting } from '@/gateway/endPointSetting';
import { Header } from '@/components/layout/Header';


interface Reservation {
  id: string;
  client: any;
  service: any;
  status: string;
  reservationDate: string;
  cancellationDate: string | null;
}


const HomePage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  const sessionDataString = localStorage.getItem("sessionData");
  let isAdmin: boolean = false;

  if (sessionDataString !== null) {
    const info = JSON.parse(sessionDataString);
    isAdmin = info.txRole == "ADMIN"
  }
  
  useEffect(() => {
    endPointSetting("Get-reservations").then((response) => {
      setReservations(response.data)
    }).catch(error => {
        console.error("Fallo al consultar la reservas", error);
    });

    endPointSetting("Get-clients").then((response) => {
      setClients(response.data)
    }).catch(error => {
        console.error("Fallo al consultarlos Clientes", error);
    });

    endPointSetting("Get-services").then((response) => {
      setServices(response.data)
    }).catch(error => {
        console.error("Fallo al consultarlos servicios", error);
    });
  }, []);

  const handleEdit = (reservation: any) => {
    setSelectedReservation(reservation);
    setDialogVisible(true);
  };

  const handleDelete = (id: any) => {
    endPointSetting("Delete-reservations", id).then((response) => {
      setReservations(reservations.filter((r : any) => r.id !== id));
    }).catch(error => {
        console.error("Fallo al eliminar reserva", error);
    });
  };

  const handleSave = (data: any) => {
    if (selectedReservation) {
      endPointSetting("Put-reservations", selectedReservation.id, data).then((response) => {
        setReservations(reservations.map(r => r.id === selectedReservation.id ? response.data : r));
      }).catch(error => {
          console.error("Fallo al consultarlos servicios", error);
      });
    } else {
      endPointSetting("Post-reservations", "", data).then((response) => {
        setReservations([...reservations, response.data]);
      }).catch(error => {
          console.error("Fallo al consultarlos servicios", error);
      });
    }
    setDialogVisible(false);
    setSelectedReservation(null);
  };

  const handleFilter = (filters: any) => {
    endPointSetting("Get-reservations-params", "", filters ).then((response) => {
      setReservations(response.data)
    }).catch(error => {
        console.error("Fallo al consultarlos Reservas", error);
    });
  };

 
  return (
    <div>
      <Header/>

      <ReservationList 
        isAdmin={isAdmin}
        reservations={reservations} 
        clients={clients} 
        services={services} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        onFilter={handleFilter} 
        setFormVisible={setDialogVisible}
      />
      
      <Dialog visible={dialogVisible} onHide={() => setDialogVisible(false)}>
        <ReservationForm 
          clients={clients} 
          services={services} 
          onSubmit={handleSave} 
          defaultValues={selectedReservation} 
        />
      </Dialog>

    </div>
  );
};

export default HomePage;
