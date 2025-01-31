export const login = async (email, password) => {
  // Simula una llamada a una API
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === 'jhon@mail.com' && password === '77@15') {
        resolve({ success: true, message: 'Inicio de sesión exitoso' });
      } else {
        resolve({ success: false, message: 'Credenciales incorrectas' });
      }
    }, 1000);
  });
};