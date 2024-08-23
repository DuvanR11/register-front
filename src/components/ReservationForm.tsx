// components/ReservationForm.tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

interface ReservationFormProps {
  onSubmit: (data: any) => void;
  clients: { id: number; name: string }[];
  services: { id: number; name: string }[];
  defaultValues?: any;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onSubmit, clients, services, defaultValues }) => {
  const { handleSubmit, control } = useForm({ defaultValues });

  return (
    <div>
      <h3 className='text-center'>{ defaultValues ? "Modifica tu reserva" : "Crea tu reserva"}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='d-flex align-items-end gap-5'>
        <div className="col">
          <label htmlFor="client">Client</label>
          <Controller
            name="client"
            control={control}
            render={({ field }) => (
              <Dropdown
                id="client"
                {...field}
                options={clients}
                optionLabel="username"
                placeholder="Selecciona el cliente"
                style={{ width: "100%" }}
              />
            )}
          />
        </div>
        <div className="col">
          <label htmlFor="service">Service</label>
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <Dropdown
                id="service"
                {...field}
                options={services}
                optionLabel="name"
                placeholder="Selecciona el servicio"
                style={{ width: "100%" }}
              />
            )}
          />
        </div>
        <div className="col">
          <label htmlFor="reservationDate">Fecha inicio reserva</label>
          <Controller
            name="reservationDate"
            control={control}
            render={({ field }) => (
              <Calendar id="reservationDate" {...field} showTime  style={{ width: "100%" }}/>
            )}
          />
        </div>
        <div className="col">
          <label htmlFor="cancellationDate">Fecha final reserva</label>
          <Controller
            name="cancellationDate"
            control={control}
            render={({ field }) => (
              <Calendar id="cancellationDate" {...field} showTime  style={{ width: "100%" }}/>
            )}
          />
        </div>
        <br />
        <div className='flex justify-content-center mt-2'>
          <Button type='submit' label="Agendar" icon="pi pi-check" />
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
