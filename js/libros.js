/**
 * Lógica para la gestión de Libros.
 */
const Libros = {
    all: [],

    async fetchAll() {
        try {
            const response = await api.get('/libros');
            this.all = response.data;
            this.renderTable();
        } catch (error) {
            console.error('Error al obtener libros:', error);
            showToast('Error al cargar libros', true);
        }
    },

    renderTable() {
        const tbody = document.getElementById('tbody-libros');
        if (!this.all.length) {
            tbody.innerHTML = '<tr><td colspan="6" class="table__empty">No hay libros en el catálogo</td></tr>';
            return;
        }

        tbody.innerHTML = this.all.map(l => `
            <tr>
                <td><strong>${l.titulo}</strong></td>
                <td>${l.autor}</td>
                <td><code>${l.isbn}</code></td>
                <td>${l.genero || '-'}</td>
                <td>
                    <span class="badge ${l.disponible ? 'badge--yes' : 'badge--no'}">
                        ${l.disponible ? 'Sí' : 'No'}
                    </span>
                </td>
                <td class="table__actions">
                    <button class="btn btn--edit" onclick="Libros.edit('${l.id}')">✏️</button>
                    <button class="btn btn--danger" onclick="Libros.delete('${l.id}')">🗑️</button>
                </td>
            </tr>
        `).join('');
    },

    showForm() {
        document.getElementById('form-libro-title').textContent = 'Crear Libro';
        document.getElementById('libro-form').reset();
        document.getElementById('libro-id').value = '';
        document.getElementById('form-libro').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    hideForm() {
        document.getElementById('form-libro').style.display = 'none';
    },

    async save(event) {
        event.preventDefault();
        const id = document.getElementById('libro-id').value;
        const data = {
            titulo: document.getElementById('libro-titulo').value,
            autor: document.getElementById('libro-autor').value,
            isbn: document.getElementById('libro-isbn').value,
            genero: document.getElementById('libro-genero').value,
            fechaPublicacion: document.getElementById('libro-fecha').value || null,
            disponible: document.getElementById('libro-disponible').value === 'true'
        };

        try {
            if (id) {
                await api.put(`/libros/${id}`, data);
                showToast('Libro actualizado correctamente');
            } else {
                await api.post('/libros', data);
                showToast('Libro añadido correctamente');
            }
            this.hideForm();
            this.fetchAll();
        } catch (error) {
            console.error('Error al guardar libro:', error);
            showToast(error.response?.data?.message || 'Error al guardar libro', true);
        }
    },

    edit(id) {
        const l = this.all.find(book => book.id === id);
        if (!l) return;

        document.getElementById('form-libro-title').textContent = 'Editar Libro';
        document.getElementById('libro-id').value = l.id;
        document.getElementById('libro-titulo').value = l.titulo;
        document.getElementById('libro-autor').value = l.autor;
        document.getElementById('libro-isbn').value = l.isbn;
        document.getElementById('libro-genero').value = l.genero || '';
        document.getElementById('libro-fecha').value = l.fechaPublicacion || '';
        document.getElementById('libro-disponible').value = l.disponible.toString();

        document.getElementById('form-libro').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    async delete(id) {
        if (!confirm('¿Estás seguro de eliminar este libro?')) return;

        try {
            await api.delete(`/libros/${id}`);
            showToast('Libro eliminado');
            this.fetchAll();
        } catch (error) {
            console.error('Error al eliminar libro:', error);
            showToast('Error al eliminar libro', true);
        }
    }
};
