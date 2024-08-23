import React, { FC } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Nullable } from 'primereact/ts-helpers';
import { Tag } from 'primereact/tag';

interface Filters {
  clientId: string | null;
  serviceId: string | null;
  date: Nullable<(Date | null)[]>;
}

interface ReservationListProps {
  reservations: any[];
  clients: { id: string; name: string }[];
  services: { id: string; name: string }[];
  onEdit: (reservation: any) => void;
  onDelete: (id: number) => void;
  onFilter: (filters: Filters) => void;
  setFormVisible: (value: boolean) => void;
  isAdmin: boolean;
}

const ReservationList: FC<ReservationListProps> = ({
    reservations,
    clients,
    services, 
    onEdit, 
    onDelete, 
    onFilter ,
    setFormVisible,
    isAdmin
  }) => {
  const [filters, setFilters] = React.useState<Filters>({ clientId: null, serviceId: null, date: null });

  const handleDateChange = (e: any) => {
    setFilters({
        ...filters,
        date: e.value ? (e.value as (Date | null)[]) : null
    });
};

  const applyFilters = () => {
    onFilter(filters);
  };

  const clearFilters = () => {
    setFilters({
        clientId: null,
        serviceId: null,
        date: null
    });
};

  const actionBodyTemplatePointShopping = (rowData: any) => {
    return (
        <React.Fragment>
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" onClick={() => onEdit(rowData) } style={{ marginLeft: '0.5rem' }} tooltip="Editar" />
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => onDelete(rowData.id) } style={{ marginLeft: '0.5rem' }} tooltip="Eliminar" />
        </React.Fragment>
    );
};

  const selectedClient = clients.find(client => client.id === filters.clientId) || null;
  const selectedService = services.find(service => service.id === filters.serviceId) || null;

  const getSeverity = (status: string) => {
    switch (status) {
        case 'CANCELADO':
            return 'danger';

        case 'RESERVADO':
            return 'success';

        case 'OCUPADO':
            return 'warning';
        default:
          return 'success';
    }
};


  const statusBodyTemplate = (rowData: any) => {
    return <Tag value={rowData?.status || "RESERVADO"} severity={getSeverity(rowData?.status)} />;
};

  return (
    <div>
      <Panel>
        <Panel header="Filtra las reservas">
          <div className="grid align-items-end">
            {
              isAdmin && (
                <div className="field col-2">
                  <Dropdown
                    value={selectedClient}
                    options={clients}
                    onChange={(e) => setFilters({ ...filters, clientId: e.value.id })}
                    placeholder="Filtra por cliente"
                    optionLabel="username"
                    style={{ width: "100%" }}
                  />
                </div>
              )
            }
            <div className={ isAdmin ? "field col-3" : "field col-4"}>
              <Dropdown
                value={selectedService}
                options={services || []}
                onChange={(e) => setFilters({ ...filters, serviceId: e.value.id })}
                placeholder="Filtra por servicio"
                optionLabel="name"
                style={{ width: "100%" }}
              />
            </div>
            <div className={ isAdmin ? "field col-3" : "field col-4"}>
              <Calendar
                value={filters.date}
                onChange={handleDateChange}
                placeholder="Filtra por fecha"
                style={{ width: "100%" }}
                selectionMode="range" 
                readOnlyInput 
                hideOnRangeSelection 
              />
            </div>
            <div className={ isAdmin ? "field col-3" : "field col-2"}>
              <Button label="Aplicar Filstros" icon="pi pi-filter" onClick={applyFilters}  style={{ width: "100%" }} />
            </div>
            <div className={ isAdmin ? "field col-3" : "field col-2"}>
                <Button label="Limpiar Filtros" icon="pi pi-times" onClick={clearFilters} style={{ width: "100%" }} />
            </div>
          </div>
        </Panel>
      </Panel>

      <Panel>
        <div className="flex flex-row">
            <div className="field col-9">
              <h3 className='m-0'>Admintra tus Reservas</h3>
            </div>
            <div className="field col-3">
              <Button label="Nueva Reservación" icon="pi pi-plus" onClick={() => setFormVisible(true)} style={{ width: "100%" }}/>
            </div>
        </div>
        <DataTable 
          value={reservations}
          stripedRows
          paginator rows={10} 
          rowsPerPageOptions={[10, 25, 50, 100]}
        >
          <Column field="id" header="ID" sortable/>
          <Column field="client.username" header="Cliente" />
          <Column field="service.name" header="Servicio" />
          <Column field="status" body={statusBodyTemplate} header="Estado" />
          <Column field="reservationDate" header="Fecha de Reserva" sortable/>

          <Column body={actionBodyTemplatePointShopping} header="Acciones" />
        </DataTable>
      </Panel>
    </div>
  );
};

export default ReservationList;
