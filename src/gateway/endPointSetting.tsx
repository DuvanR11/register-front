import ApiAxios from "./apiAxios";
import { Ports } from "./allPorts";
import { toQueryString } from "@/utils/toQueryString";


export async function endPointSetting(accionBD: string, id?: string, body?: any) {
    const serverName: any = "ReservationServer";
    const jsonUrl = Ports;

    let urlip = jsonUrl[serverName].url;
    let urlPort = jsonUrl[serverName].port;
    let Url = "";
    let headers = {};
    let method = "";

    const sessionDataString = localStorage.getItem("sessionData");
    let sessionData: any = null;

    console.log(body)

    if (sessionDataString !== null) {
        sessionData = JSON.parse(sessionDataString);
    }

    headers = {
        "Content-Type": "application/json",
        "authorization": `Bearer ${sessionData?.txToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    };


    switch (accionBD) {
        case "Get-services": {
            method = "GET";
            Url = `${urlip}${urlPort}/services`;
            break;
        }

        case "Get-clients": {
            method = "GET";
            Url = `${urlip}${urlPort}/clients`;
            break;
        }

        case "Get-reservations": {
            method = "GET";
            Url = `${urlip}${urlPort}/reservations`;
            break;
        }

        case "Get-reservations-params": {
            method = "GET";
            Url = `${urlip}${urlPort}/reservations?${toQueryString(body)}`;
            break;
        }
        
        case "Post-reservations": {
            method = "POST";
            Url = `${urlip}${urlPort}/reservations`;
            break;
        }

        case "Put-reservations": {
            method = "PUT";
            Url = `${urlip}${urlPort}/reservations/${id}`;
            break;
        }

        case "Delete-reservations": {
            method = "DELETE";
            Url = `${urlip}${urlPort}/reservations/${id}`;
            break;
        }

        case "Municipality-Type": {
            method = "POST";
            Url = `${urlip}${urlPort}/reportType/municipality`;
            body = JSON.stringify(body);
            break;
        }

        default:
            let response = {
                status: "404",
                message: "Accion a ejecutar no esta parametrizada...",
            };
            
            return response;
    }
    const self = new ApiAxios();
    let response = await self.sendRequest(Url, method, body, headers);
    return response.data;
}