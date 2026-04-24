/**
 * Configuración de Axios para comunicarse con el Backend.
 */
const API_BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Función global para mostrar notificaciones (toasts).
 */
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    toastMessage.textContent = message;
    toastIcon.textContent = isError ? '❌' : '✅';
    
    if (isError) {
        toast.classList.add('toast--error');
    } else {
        toast.classList.remove('toast--error');
    }

    toast.classList.add('toast--show');

    setTimeout(() => {
        toast.classList.remove('toast--show');
    }, 4000);
}
