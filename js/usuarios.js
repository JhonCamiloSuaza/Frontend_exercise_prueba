/**
 * Lógica para la gestión de Usuarios.
 */
const Usuarios = {
    all: [],

    async fetchAll() {
        try {
            const response = await api.get('/usuarios');
            this.all = response.data;
            this.renderTable();
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            showToast('Error al cargar usuarios', true);
        }
    },

    renderTable() {
        const tbody = document.getElementById('tbody-usuarios');
        if (!this.all.length) {
            tbody.innerHTML = '<tr><td colspan="7" class="table__empty">No hay usuarios registrados</td></tr>';
            return;
        }

        tbody.innerHTML = this.all.map(u => `
            <tr>
                <td>${u.nombre}</td>
                <td>${u.apellido}</td>
                <td>${u.email}</td>
                <td>${u.telefono || '-'}</td>
                <td>${u.genero || 'No Especificado'}</td>
                <td>
                    <span class="badge ${u.activo ? 'badge--active' : 'badge--inactive'}">
                        ${u.activo ? 'Activo' : 'Inactivo'}
                    </span>
                </td>
                <td class="table__actions">
                    <button class="btn btn--edit" onclick="Usuarios.edit('${u.id}')">✏️</button>
                    <button class="btn btn--danger" onclick="Usuarios.delete('${u.id}')">🗑️</button>
                </td>
            </tr>
        `).join('');
    },

    showForm() {
        document.getElementById('form-usuario-title').textContent = 'Crear Usuario';
        document.getElementById('usuario-form').reset();
        document.getElementById('usuario-id').value = '';
        document.getElementById('form-usuario').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    hideForm() {
        document.getElementById('form-usuario').style.display = 'none';
    },

    async save(event) {
        event.preventDefault();
        const id = document.getElementById('usuario-id').value;
        const data = {
            nombre: document.getElementById('usuario-nombre').value,
            apellido: document.getElementById('usuario-apellido').value,
            email: document.getElementById('usuario-email').value,
            telefono: document.getElementById('usuario-telefono').value,
            genero: document.getElementById('usuario-genero').value || null,
            activo: document.getElementById('usuario-activo').value === 'true'
        };

        try {
            if (id) {
                await api.put(`/usuarios/${id}`, data);
                showToast('Usuario actualizado correctamente');
            } else {
                await api.post('/usuarios', data);
                showToast('Usuario creado correctamente');
            }
            this.hideForm();
            this.fetchAll();
        } catch (error) {
            console.error('Error al guardar usuario:', error);
            showToast(error.response?.data?.message || 'Error al guardar usuario', true);
        }
    },

    edit(id) {
        const u = this.all.find(user => user.id === id);
        if (!u) return;

        document.getElementById('form-usuario-title').textContent = 'Editar Usuario';
        document.getElementById('usuario-id').value = u.id;
        document.getElementById('usuario-nombre').value = u.nombre;
        document.getElementById('usuario-apellido').value = u.apellido;
        document.getElementById('usuario-email').value = u.email;
        document.getElementById('usuario-telefono').value = u.telefono || '';
        document.getElementById('usuario-genero').value = u.genero || '';
        document.getElementById('usuario-activo').value = u.activo.toString();

        document.getElementById('form-usuario').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    async delete(id) {
        if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

        try {
            await api.delete(`/usuarios/${id}`);
            showToast('Usuario eliminado');
            this.fetchAll();
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            showToast('Error al eliminar usuario', true);
        }
    }
};
