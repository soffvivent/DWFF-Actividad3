<template>
  <div class="container">
    <h1>🎯 Finalizar Reserva</h1>
    <p class="subtitle">Completa los datos para confirmar tu reserva</p>

    <!-- Sin espacio seleccionado -->
    <div v-if="!hasSpace && !showConfirmation" class="no-space-selected">
      <div class="icon-large">🏢</div>
      <h2>No hay espacio seleccionado</h2>
      <p>Por favor, selecciona un espacio desde la página de Espacios para continuar con la reserva.</p>
      <button @click="goBack" class="btn btn-primary btn-large">
        Ver Espacios Disponibles →
      </button>
    </div>

    <!-- Mensaje de confirmación -->
    <div v-else-if="showConfirmation" class="confirmation-message">
      <div class="confirmation-icon">✅</div>
      <h2>¡Reserva Confirmada!</h2>
      <p>Hemos recibido tu solicitud de reserva correctamente.</p>
      <div class="confirmation-details">
        <p><strong>{{ formData.name }}</strong>, recibirás un correo de confirmación en <strong>{{ formData.email }}</strong></p>
        <p>Espacio: <strong>{{ confirmedReservation?.roomName }}</strong></p>
        <p>Fecha: <strong>{{ formatDate(confirmedReservation?.startDate) }}</strong></p>
        <p>Hora: <strong>{{ formatTime(confirmedReservation?.startDate) }}</strong></p>
        <p>ID de Reserva: <strong>#{{ confirmedReservation?.id }}</strong></p>
      </div>
      <button @click="resetForm" class="btn btn-primary">Nueva Reserva</button>
    </div>

    <!-- Formulario de checkout -->
    <div v-else class="checkout-content">
      <!-- Fila 1: Información del espacio seleccionado -->
      <div class="row">
        <div class="col">
          <div class="space-card">
            <div class="space-image">
              <img :src="selectedSpace.image" :alt="selectedSpace.name" />
            </div>
            <div class="space-details">
              <h2>{{ selectedSpace.name }}</h2>
              <div class="space-info">
                <p><span class="icon">🏢</span> <strong>Planta:</strong> {{ selectedSpace.floor }}</p>
                <p><span class="icon">👥</span> <strong>Capacidad:</strong> {{ selectedSpace.capacityLabel }}</p>
                <p><span class="icon">💰</span> <strong>Precio:</strong> {{ selectedSpace.price }}€/hora</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Información explicativa -->
        <div class="col">
          <div class="info-box">
            <h3>📋 Información de la Reserva</h3>
            <p>
              Estás a punto de reservar <strong>{{ selectedSpace.name }}</strong>.
              Este espacio es perfecto para {{ selectedSpace.description }}.
            </p>
            <p>
              Al completar el formulario, recibirás un correo electrónico con los
              detalles de tu reserva y las instrucciones de acceso.
            </p>
            <p class="highlight">
              💡 <strong>Importante:</strong> La reserva quedará confirmada una vez
              verifiquemos la disponibilidad en la fecha y hora seleccionadas.
            </p>
          </div>
        </div>
      </div>

      <!-- Fila 2: Formulario de reserva -->
      <div class="row">
        <div class="col-full">
          <div class="form-card">
            <h3>📝 Datos de Contacto</h3>
            <form @submit.prevent="handleSubmit">
              <div class="form-row">
                <div class="form-group">
                  <label for="name">
                    <span class="icon">👤</span> Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    v-model="formData.name"
                    :class="{ 'error': errors.name }"
                    placeholder="Ej: María García López"
                  />
                  <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
                </div>

                <div class="form-group">
                  <label for="email">
                    <span class="icon">📧</span> Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    v-model="formData.email"
                    :class="{ 'error': errors.email }"
                    placeholder="tu.email@ejemplo.com"
                  />
                  <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="date">
                    <span class="icon">📅</span> Fecha de Reserva *
                  </label>
                  <input
                    type="date"
                    id="date"
                    v-model="formData.date"
                    :class="{ 'error': errors.date }"
                    :min="minDate"
                  />
                  <span v-if="errors.date" class="error-message">{{ errors.date }}</span>
                </div>

                <div class="form-group">
                  <label for="time">
                    <span class="icon">⏰</span> Hora de Inicio *
                  </label>
                  <input
                    type="time"
                    id="time"
                    v-model="formData.time"
                    :class="{ 'error': errors.time }"
                  />
                  <span v-if="errors.time" class="error-message">{{ errors.time }}</span>
                </div>
              </div>

              <div class="form-group">
                <label for="comments">
                  <span class="icon">💬</span> Comentarios Adicionales (Opcional)
                </label>
                <textarea
                  id="comments"
                  v-model="formData.comments"
                  rows="4"
                  placeholder="Cuéntanos si necesitas algo especial..."
                ></textarea>
              </div>

              <div class="form-actions">
                <button type="button" @click="goBack" class="btn btn-secondary">
                  ← Volver
                </button>
                <button type="submit" class="btn btn-primary">
                  Confirmar Reserva ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useReservationStore } from '../stores/reservationStore'

const router = useRouter()
const reservationStore = useReservationStore()

// Estado del formulario
const formData = ref({
  name: '',
  email: '',
  date: '',
  time: '',
  comments: ''
})

// Errores de validación
const errors = ref({
  name: '',
  email: '',
  date: '',
  time: ''
})

// Control de confirmación
const showConfirmation = ref(false)
const confirmedReservation = ref(null)

// Espacio seleccionado desde el store
const selectedSpace = computed(() => {
  const room = reservationStore.selectedRoomDetails
  if (!room) return null

  return {
    id: room.id,
    name: room.name,
    floor: `${room.planta}ª Planta`,
    capacity: getCapacityNumber(room.capacity),
    price: room.precio,
    image: room.image,
    description: getDescription(room.capacity),
    capacityLabel: getCapacityLabel(room.capacity)
  }
})

// Verificar si hay espacio seleccionado
const hasSpace = computed(() => selectedSpace.value !== null)

// Fecha mínima (hoy)
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

// Funciones auxiliares
function getCapacityLabel(capacity) {
  const labels = {
    '1': '1 persona',
    '2-4': '2-4 personas',
    '5-8': '5-8 personas',
    '9+': '9+ personas'
  }
  return labels[capacity] || capacity
}

function getCapacityNumber(capacity) {
  const numbers = {
    '1': 1,
    '2-4': 4,
    '5-8': 8,
    '9+': 12
  }
  return numbers[capacity] || 4
}

function getDescription(capacity) {
  const descriptions = {
    '1': 'trabajo individual y concentración',
    '2-4': 'reuniones pequeñas y colaboración en equipo',
    '5-8': 'reuniones ejecutivas y presentaciones profesionales',
    '9+': 'eventos, talleres y reuniones corporativas'
  }
  return descriptions[capacity] || 'reuniones y trabajo colaborativo'
}

function formatDate(isoDate) {
  if (!isoDate) return ''
  const date = new Date(isoDate)
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function formatTime(isoDate) {
  if (!isoDate) return ''
  const date = new Date(isoDate)
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Validación de email
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validación del formulario
const validateForm = () => {
  let isValid = true
  errors.value = {
    name: '',
    email: '',
    date: '',
    time: ''
  }

  // Validar nombre
  if (!formData.value.name.trim()) {
    errors.value.name = 'El nombre es obligatorio'
    isValid = false
  } else if (formData.value.name.trim().length < 3) {
    errors.value.name = 'El nombre debe tener al menos 3 caracteres'
    isValid = false
  }

  // Validar email
  if (!formData.value.email.trim()) {
    errors.value.email = 'El email es obligatorio'
    isValid = false
  } else if (!validateEmail(formData.value.email)) {
    errors.value.email = 'El email no es válido'
    isValid = false
  }

  // Validar fecha
  if (!formData.value.date) {
    errors.value.date = 'La fecha es obligatoria'
    isValid = false
  } else {
    const selectedDate = new Date(formData.value.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (selectedDate < today) {
      errors.value.date = 'La fecha no puede ser anterior a hoy'
      isValid = false
    }
  }

  // Validar hora
  if (!formData.value.time) {
    errors.value.time = 'La hora es obligatoria'
    isValid = false
  }

  return isValid
}

// Enviar formulario
const handleSubmit = () => {
  if (!hasSpace.value) {
    alert('Por favor, selecciona un espacio primero desde la página de Espacios')
    router.push('/spaces')
    return
  }

  if (validateForm()) {
    try {
      // Preparar datos para la reserva según el schema
      const startDateTime = `${formData.value.date}T${formData.value.time}:00`
      const startDate = new Date(startDateTime)
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // +1 hora por defecto

      const reservationData = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        userId: 1, // ID de usuario por defecto
        additionalPreferences: formData.value.comments ? [formData.value.comments] : [],
        // Datos adicionales del formulario
        userName: formData.value.name,
        userEmail: formData.value.email,
        comments: formData.value.comments
      }

      // Crear la reserva en el store
      confirmedReservation.value = reservationStore.createReservation(reservationData)

      showConfirmation.value = true
      // Scroll al inicio para ver el mensaje
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Error creating reservation:', err)
      alert('Error al crear la reserva: ' + err.message)
    }
  }
}

// Resetear formulario
const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    date: '',
    time: '',
    comments: ''
  }
  errors.value = {
    name: '',
    email: '',
    date: '',
    time: ''
  }
  showConfirmation.value = false
  confirmedReservation.value = null
  reservationStore.clearCurrentReservation()
  router.push('/spaces')
}

// Volver a la página de espacios
const goBack = () => {
  router.push('/spaces')
}

// Cargar datos al montar
onMounted(() => {
  // Si no hay espacio seleccionado, se muestra el mensaje correspondiente
  if (!hasSpace.value) {
    console.warn('No hay espacio seleccionado')
  }
})
</script>

<style scoped>
.subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

/* Sin espacio seleccionado */
.no-space-selected {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.icon-large {
  font-size: 5rem;
  margin-bottom: 1.5rem;
}

.no-space-selected h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.no-space-selected p {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.btn-large {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
}

/* Mensaje de confirmación */
.confirmation-message {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 3rem 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.confirmation-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.confirmation-message h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: white;
}

.confirmation-message p {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: rgba(255, 255, 255, 0.95);
}

.confirmation-details {
  background: rgba(255, 255, 255, 0.15);
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  border-left: 4px solid white;
}

.confirmation-details p {
  margin-bottom: 0.5rem;
}

.confirmation-message .btn {
  margin-top: 1.5rem;
}

/* Layout */
.checkout-content {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.col-full {
  flex: 1;
  width: 100%;
}

/* Tarjeta del espacio */
.space-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.space-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.space-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.space-details {
  padding: 1.5rem;
}

.space-details h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.space-info p {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #4b5563;
}

.icon {
  font-size: 1.2rem;
}

/* Caja de información */
.info-box {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  height: 100%;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
}

.info-box h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: white;
}

.info-box p {
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1rem;
}

.highlight {
  background: rgba(255, 255, 255, 0.2);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid white;
  margin-top: 1rem;
}

/* Tarjeta del formulario */
.form-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

/* Formulario */
.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group input.error,
.form-group textarea.error {
  border-color: #ef4444;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.error-message::before {
  content: '⚠️';
}

/* Botones */
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn {
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(16, 185, 129, 0.3);
}

.btn-secondary {
  background: #f3f4f6;
  color: #4b5563;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

/* Responsive */
@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .space-image {
    height: 150px;
  }

  .confirmation-message {
    padding: 2rem 1rem;
  }

  .confirmation-icon {
    font-size: 3rem;
  }
}
</style>

