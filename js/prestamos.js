/**
 * Lógica para la gestión de Préstamos.
 */
const Prestamos = {
    all: [],

    async fetchAll() {
        try {
            const response = await api.get('/prestamos');
            this.all = response.data;
            this.renderTable();
        } catch (error) {
            console.error('Error al obtener préstamos:', error);
            showToast('Error al cargar préstamos', true);
        }
    },

    async loadSelects() {
        try {
            const [usersRes, booksRes] = await Promise.all([
                api.get('/usuarios'),
                api.get('/libros')
            ]);

            const userSelect = document.getElementById('prestamo-usuario');
            const bookSelect = document.getElementById('prestamo-libro');

            userSelect.innerHTML = '<option value="">Seleccionar usuario...</option>' + 
                usersRes.data.map(u => `<option value="${u.id}">${u.nombre} ${u.apellido}</option>`).join('');

            bookSelect.innerHTML = '<option value="">Seleccionar libro...</option>' + 
                booksRes.data.map(l => `<option value="${l.id}">${l.titulo} (${l.autor})</option>`).join('');
        } catch (error) {
            console.error('Error al cargar opciones de préstamos:', error);
        }
    },

    renderTable() {
        const tbody = document.getElementById('tbody-prestamos');
        if (!this.all.length) {
            tbody.innerHTML = '<tr><td colspan="6" class="table__empty">No hay préstamos registrados</td></tr>';
            return;
        }

        tbody.innerHTML = this.all.map(p => `
            <tr>
                <td>${p.usuario.nombre} ${p.usuario.apellido}</td>
                <td>${p.libro.titulo}</td>
                <td>${new Date(p.fechaPrestamo).toLocaleString()}</td>
                <td>${p.fechaDevolucion ? new Date(p.fechaDevolucion).toLocaleString() : '<span class="text-secondary">Pendiente</span>'}</td>
                <td>
                    <span class="badge ${this.getBadgeClass(p.estado)}">
                        ${p.estado}
                    </span>
                </td>
                <td class="table__actions">
                    <button class="btn btn--edit" onclick="Prestamos.edit('${p.id}')">✏️</button>
                    <button class="btn btn--danger" onclick="Prestamos.delete('${p.id}')">🗑️</button>
                </td>
            </tr>
        `).join('');
    },

    getBadgeClass(estado) {
        switch(estado) {
            case 'ACTIVO': return 'badge--active';
            case 'DEVUELTO': return 'badge--returned';
            case 'VENCIDO': return 'badge--overdue';
            default: return '';
        }
    },

    async showForm() {
        document.getElementById('form-prestamo-title').textContent = 'Crear Préstamo';
        document.getElementById('prestamo-form').reset();
        document.getElementById('prestamo-id').value = '';
        await this.loadSelects();
        document.getElementById('form-prestamo').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    hideForm() {
        document.getElementById('form-prestamo').style.display = 'none';
    },

    async save(event) {
        event.preventDefault();
        const id = document.getElementById('prestamo-id').value;
        const data = {
            usuario: { id: document.getElementById('prestamo-usuario').value },
            libro: { id: document.getElementById('prestamo-libro').value },
            fechaDevolucion: document.getElementById('prestamo-fecha-devolucion').value || null,
            estado: document.getElementById('prestamo-estado').value
        };

        try {
            if (id) {
                await api.put(`/prestamos/${id}`, data);
                showToast('Préstamo actualizado correctamente');
            } else {
                await api.post('/prestamos', data);
                showToast('Préstamo registrado correctamente');
            }
            this.hideForm();
            this.fetchAll();
        } catch (error) {
            console.error('Error al guardar préstamo:', error);
            showToast(error.response?.data?.message || 'Error al guardar préstamo', true);
        }
    },

    async edit(id) {
        const p = this.all.find(item => item.id === id);
        if (!p) return;

        await this.loadSelects();

        document.getElementById('form-prestamo-title').textContent = 'Editar Préstamo';
        document.getElementById('prestamo-id').value = p.id;
        document.getElementById('prestamo-usuario').value = p.usuario.id;
        document.getElementById('prestamo-libro').value = p.libro.id;
        document.getElementById('prestamo-estado').value = p.estado;
        
        if (p.fechaDevolucion) {
            // Format ISO date for datetime-local input
            const date = new Date(p.fechaDevolucion);
            const formatted = date.toISOString().slice(0, 16);
            document.getElementById('prestamo-fecha-devolucion').value = formatted;
        }

        document.getElementById('form-prestamo').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    async delete(id) {
        if (!confirm('¿Estás seguro de eliminar este préstamo?')) return;

        try {
            await api.delete(`/prestamos/${id}`);
            showToast('Préstamo eliminado');
            this.fetchAll();
        } catch (error) {
            console.error('Error al eliminar préstamo:', error);
            showToast('Error al eliminar préstamo', true);
        }
    }
};
