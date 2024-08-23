"use client"

import React, { useState, useRef } from "react";

import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { useForm } from "react-hook-form";
import { loginIN } from "@/utils/auth";
import { endPointAuthentication } from "@/gateway/endPointAuthentication";
import { useRouter } from 'next/navigation';

export const LoginPage = () => {

    const { register, handleSubmit, formState: { errors }, setValue   } = useForm();

    const [loading, setLoading] = useState(false);

    const toast = useRef(null);
    const router = useRouter();

    const onSubmit = (data: any) => {
       
        endPointAuthentication("Login-In", "", data)
            .then((data) => {
                if(data) {
                    loginIN(data);
                    router.push('/');
                }
              
            })
            .catch((error) => {
                console.log(error);
            });
                
    };

    // useEffect(() => {
    //     // console.log("useEffect: ", tokenLogin?.codResponse);
    //     if (tokenLogin?.codResponse === 5478) {
    //         // toast.current.clear();
    //     } else {
    //         if (tokenLogin?.codResponse === 200) {
    //             // const result = loginIN(tokenLogin);

    //             // console.log("tokenLogin de Auth: ", result);

    //             if (result === true) {
    //                 // console.log("history: ", result);
    //                 // navigate("/mecic");
    //             } else {
    //                 // toast.current.show({
    //                 //     severity: "error",
    //                 //     summary: "Error ",
    //                 //     detail: "Falla en creación de Sesión en el navegador",
    //                 //     life: 15000,
    //                 // });
    //             }
    //         } else {
    //             // toast.current.show({
    //             //     severity: "error",
    //             //     summary: "Error ",
    //             //     detail: "respuesta del navegador no parametrizada (" || tokenLogin?.codResponse || ")",
    //             //     life: 15000,
    //             // });
    //         }
    //     }
    // }, [tokenLogin]); // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {

    //     const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    //     if (Boolean(sessionData?.txToken)) {
    //         LogOutSession() ;
    //     }
        
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const navigateToPage = ( url: any ) => {
        // navigate(url)
    }

    return (
        <div>
            <div className="layout-main mt-8">
                <div className="flex flex-column align-items-center justify-content-center">
                    <Toast ref={toast} position="bottom-right" />
                    <form 
                        onSubmit={handleSubmit(onSubmit)}
                        style={{
                            borderRadius: "56px",
                            padding: "0.3rem",
                            background: "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
                        }}
                    >
                        <div className="w-full surface-card py-6 px-5 sm:px-8" style={{ borderRadius: "53px" }}>
                            <div className="text-center mb-3">
                                {/* <img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" /> */}
                                <div className="text-900 text-3xl font-medium mb-3">Iniciar Sesion</div>
                                <span className="text-600 font-medium">Ingrese sus credenciales</span>
                            </div>

                            <div className="p-d-flex p-jc-center">
                                <div className="p-col-12 p-pt-0 ">
                                    <label htmlFor="txDescription">Usuario</label>
                                    <div className="p-inputgroup">
                                        <span className="p-float-label">
                                            <InputText
                                                id="username"
                                                {...register('username', { required: 'Usuario es Requerido.' })}
                                                autoComplete="off"
                                                className={classNames({
                                                    "p-invalid": !!errors.username 
                                                })}
                                            />
                                        </span>
                                    </div>
                                    <div className="text-right mb-2">
                                        {errors.username && <small className="p-invalid">Usuario es Requerido.</small>}
                                    </div>
                                </div>
                            </div>

                            <div className="p-d-flex p-jc-center">
                                <div className="p-col-12 p-pt-0 ">
                                    <label htmlFor="txDescription">Contraseña</label>
                                    <div className="p-inputgroup">
                                        <span className="p-float-label">
                                            <Password
                                                id="password"
                                                onChange={(e) => setValue('password', e.target.value)}
                                                feedback={false}
                                                autoComplete="off"
                                                className={classNames({
                                                    "p-invalid": !!errors.password,
                                                })}
                                            />
                                        </span>
                                    </div>
                                    <div className="text-right mb-2">
                                        {errors.password && <small className="p-invalid">Contraseña es Requerido.</small>}
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mb-3"></div>

                            <div className="text-center mb-3"></div>
                            <Button label="Ingresar" type="submit" className="w-full p-3 text-xl" icon="pi pi-user-plus" loading={loading} />
                            <div className="mt-3">
                                <Button label="Registrarse" className="w-full p-2" onClick={ () => navigateToPage("/inscripcion") } text />
                            </div>
                        </div>
                        
                    </form>
                </div>
                <div className="footer">
                    <div>
                        <p className="footer-text">
                            Proyecto de prueba de reservas demo de la apliación.
                        </p>
                        <div className="footer-copyright">
                            © Prueba Tecnica Lintick
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    );
};

const comparisonFn = (prevProps: any, nextProps: any) => {
    // Verifica si prevProps y nextProps tienen location y pathname
    const prevPath = prevProps.location ? prevProps.location.pathname : null;
    const nextPath = nextProps.location ? nextProps.location.pathname : null;
    // Retorna true si son iguales, false si son diferentes
    return prevPath === nextPath;
};

export default React.memo(LoginPage, comparisonFn);

