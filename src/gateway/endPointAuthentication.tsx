import ApiAxios from "./apiAxios";
import { Ports } from "./allPorts";

import { loginOUT } from "@/utils/auth";
export async function endPointAuthentication(accionBD: any, id: any, body?: any) {
    let serverName = "ReservationServer";
    const jsonUrl = Ports;
    let urlip = jsonUrl[serverName].url;
    let urlPort = jsonUrl[serverName].port;

    let Url = "";
    let headers = {};
    let method = "";

    const sessionDataString = localStorage.getItem("sessionData");
    let sessionData: any = null;

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
        
        case "register": {
            method = "PUT";
            Url = `${urlip}${urlPort}/auth/register`;
            headers = { "Content-Type": "application/json" };
            body = JSON.stringify(body);
            break;
        }

        case "Login-In": {
            method = "POST";
            Url = `${urlip}${urlPort}/auth/login`;
            headers = { "Content-Type": "application/json" };
            body = JSON.stringify(body);
            break;
        }

        case "Login-Out": {
            method = "POST";
            Url = `${urlip}${urlPort}/auth/logout`;
            localStorage.clear();
            loginOUT();
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
