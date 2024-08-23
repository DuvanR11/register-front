
import Cookies from 'js-cookie';

const loginOUT = () => {
    
    localStorage.clear();
    Cookies.remove('sessionData');
    Cookies.remove('sesionToken1');
    Cookies.remove('sesionToken2');
    
    
    return true;
};

const loginIN = (tokenLogin: any) => {
   
    let sessionData = {
        txUserName: tokenLogin?.username,
        txRole: tokenLogin?.role,
        txToken: tokenLogin?.token,
    };
    
    localStorage.setItem("sessionData", JSON.stringify(sessionData));
    Cookies.set('sessionData', JSON.stringify(sessionData), { expires: 1 });

    return true;
};

const changePassword = (tokenLogin: any) => {
    tokenLogin && Cookies.set('sessionData', JSON.stringify(tokenLogin), { expires: 1 });
    return true;
};

export { loginOUT, loginIN, changePassword };
