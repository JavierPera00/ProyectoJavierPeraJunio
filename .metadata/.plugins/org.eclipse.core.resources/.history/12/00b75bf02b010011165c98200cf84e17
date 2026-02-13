const API_BASE = "http://localhost:8080/api"; // Cambia el puerto si tu backend es otro

const resultado = document.getElementById("resultado");

/* ==================== NOTICIAS ==================== */
async function crearNoticia() {
    const noticia = {
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,
        ciudad: document.getElementById("ciudad").value,
        fechaPublicacion: document.getElementById("fecha").value
    };
    const res = await fetch(`${API_BASE}/noticias`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noticia)
    });
    const data = await res.json();
    mostrarResultado(data);
}

async function getAllNoticias() {
    const res = await fetch(`${API_BASE}/noticias`);
    const data = await res.json();
    mostrarResultado(data);
}

async function getNoticiaById() {
    const id = document.getElementById("getId").value;
    const res = await fetch(`${API_BASE}/noticias/${id}`);
    const data = await res.json();
    mostrarResultado(data);
}

async function updateNoticia() {
    const id = document.getElementById("updId").value;
    const noticia = {
        titulo: document.getElementById("updTitulo").value,
        descripcion: document.getElementById("updDescripcion").value,
        ciudad: document.getElementById("updCiudad").value,
        fechaPublicacion: document.getElementById("updFecha").value
    };
    const res = await fetch(`${API_BASE}/noticias/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noticia)
    });
    const data = await res.json();
    mostrarResultado(data);
}

async function deleteNoticia() {
    const id = document.getElementById("delId").value;
    const res = await fetch(`${API_BASE}/noticias/${id}`, { method: "DELETE" });
    mostrarResultado({ mensaje: `Noticia ${id} eliminada`, status: res.status });
}

async function ultimasNoticias() {
    const res = await fetch(`${API_BASE}/noticias/ultimas`);
    const data = await res.json();
    mostrarResultado(data);
}

async function noticiasPorCiudad() {
    const ciudad = document.getElementById("buscarCiudad").value;
    const res = await fetch(`${API_BASE}/noticias/ciudad/${ciudad}`);
    const data = await res.json();
    mostrarResultado(data);
}

/* ==================== ROLES ==================== */
async function crearRol() {
    const rol = { nombre: document.getElementById("roleName").value };
    const res = await fetch(`${API_BASE}/roles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rol)
    });
    const data = await res.json();
    mostrarResultado(data);
    cargarRolesSelect(await getAllRolesArray());
}

async function getAllRoles() {
    const res = await fetch(`${API_BASE}/roles`);
    const data = await res.json();
    mostrarResultado(data);
    cargarRolesSelect(data);
    return data;
}

async function getAllRolesArray() {
    const res = await fetch(`${API_BASE}/roles`);
    return await res.json();
}

/* ==================== PERFILES ==================== */
async function crearPerfil() {
    const perfil = {
        nombre: document.getElementById("profileName").value,
        rolId: document.getElementById("profileRole").value
    };
    const res = await fetch(`${API_BASE}/perfiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(perfil)
    });
    const data = await res.json();
    mostrarResultado(data);
}

async function getAllPerfiles() {
    const res = await fetch(`${API_BASE}/perfiles`);
    const data = await res.json();
    mostrarResultado(data);
}

/* ==================== USUARIOS ==================== */
async function crearUsuario() {
    const usuario = {
        username: document.getElementById("userName").value,
        email: document.getElementById("userEmail").value
    };
    const res = await fetch(`${API_BASE}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    });
    const data = await res.json();
    mostrarResultado(data);
}

async function getAllUsuarios() {
    const res = await fetch(`${API_BASE}/usuarios`);
    const data = await res.json();
    mostrarResultado(data);
}

/* ==================== UTIL ==================== */
function mostrarResultado(data) {
    resultado.textContent = JSON.stringify(data, null, 4);
}

/* ==================== CARGAR ROLES EN SELECT ==================== */
async function cargarRolesSelect(roles) {
    const select = document.getElementById("profileRole");
    select.innerHTML = '<option value="">Seleccione un rol</option>';
    roles.forEach(r => {
        const option = document.createElement("option");
        option.value = r.id;
        option.textContent = r.nombre;
        select.appendChild(option);
    });
}

/* ==================== AL CARGAR LA PÁGINA ==================== */
window.addEventListener("DOMContentLoaded", async () => {
    const roles = await getAllRolesArray();
    cargarRolesSelect(roles);
});