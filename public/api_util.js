const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
const apiBase = '/api';

async function apiFetch(url, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
    const response = await fetch(apiBase + url, { ...options, headers });
    if (response.status === 401 || response.status === 403) {
        if (!window.location.pathname.endsWith('/login.html') && !window.location.pathname.endsWith('/student_registration_page.html')) {
            window.location.href = '/login.html';
        }
    }
    return response;
}
