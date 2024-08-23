"use client"

import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { endPointSetting } from '@/gateway/endPointSetting';
import { IService } from '@/interfaces/IService';
import { Header } from '@/components/layout/Header';

export default function Explorer() {
    const [products, setProducts] = useState<IService[]>([]);
    const [selectedService, setSelectedService] = useState<IService | null>(null);
    const [reservationTime, setReservationTime] = useState<string>('');
    const [displayModal, setDisplayModal] = useState<boolean>(false);

    useEffect(() => {
        endPointSetting("Get-services").then((response) => {
            setProducts(response.data)
          }).catch(error => {
              console.error("Fallo al consultar los servicios", error);
          });
    }, []);

    const getSeverity = (product: IService) => {
        switch (product.name) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const itemTemplate = (data: IService) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://londonogomez.com/sites/default/files/imagenes/proyectos/imgs-slider/LG_BannerPrincipal_Atlantica.jpg`} alt={data.name} />
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{data.name}</div>
                                <div className="text-700">{data.description}</div>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                            <span className="text-2xl font-semibold">${data.price.toLocaleString('CO-es')}</span>
                            <Button icon="pi pi-address-book" label="Reservar" onClick={() => openReservationDialog(data)}></Button>
                            {/* <Tag value={data.inventoryStatus} severity={getSeverity(data)}></Tag> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const openReservationDialog = (service: IService) => {
        setSelectedService(service);
        setDisplayModal(true);
    };

    const handleReservation = () => {
        if (selectedService) {
            const data = {
                service: selectedService,
                client: {
                        "id": 4,
                        "username": "prueba",
                        "email": null,
                },
                reservationDate: "2024-08-23T19:17:43.543Z"
            }

            endPointSetting("Post-reservations", "", data).then((response) => {
                
              }).catch(error => {
                  console.error("Fallo al consultarlos servicios", error);
              });
            console.log(`Reservado ${selectedService.name} para ${reservationTime}`);
            setDisplayModal(false);
        }
    };

    const footer = (
        <div>
            <Button label="Confirmar" icon="pi pi-check" onClick={handleReservation} />
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setDisplayModal(false)} />
        </div>
    );

    return (
        <div className="card">
            <Header/>
            <DataScroller value={products} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Tus opciones el día de hoy" />
            
            {/* Modal para la reserva */}
            <Dialog header="Reservar Servicio" visible={displayModal} style={{ width: '50vw' }} footer={footer} onHide={() => setDisplayModal(false)}>
                {selectedService && (
                    <div className="flex flex-column gap-4">
                        <h3>{selectedService.name}</h3>
                        <p>{selectedService.description}</p>
                        <div className="field">
                            <label htmlFor="reservationTime">Hora de Reserva:</label>
                            <InputText
                                id="reservationTime"
                                value={reservationTime}
                                onChange={(e) => setReservationTime(e.target.value)}
                                placeholder="Ingresa la hora en formato HH:MM"
                            />
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
}
