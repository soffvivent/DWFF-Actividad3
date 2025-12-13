<template>
  <div class="container">
    <h1>🏢 Selección de Espacios</h1>
    <p class="subtitle">Elige el espacio perfecto para tu próxima reunión o sesión de trabajo</p>

    <!-- Estado de carga -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Cargando espacios disponibles...</p>
    </div>

    <!-- Estado de error -->
    <div v-else-if="error" class="error-state">
      <p>❌ Error al cargar los espacios: {{ error }}</p>
      <button @click="loadRooms" class="btn btn-primary">Reintentar</button>
    </div>

    <!-- Filtros -->
    <div v-else class="filters-section">
      <div class="filters">
        <div class="filter-group">
          <label for="capacityFilter">
            <span class="icon">👥</span> Capacidad:
          </label>
          <select id="capacityFilter" v-model="selectedCapacity">
            <option value="">Todas</option>
            <option value="1">1 persona</option>
            <option value="2-4">2-4 personas</option>
            <option value="5-8">5-8 personas</option>
            <option value="9+">9+ personas</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="plantaFilter">
            <span class="icon">🏢</span> Planta:
          </label>
          <select id="plantaFilter" v-model="selectedPlanta">
            <option value="">Todas</option>
            <option v-for="planta in availablePlantas" :key="planta" :value="planta">
              Planta {{ planta }}
            </option>
          </select>
        </div>

        <button @click="clearFilters" class="btn btn-secondary">Limpiar Filtros</button>
      </div>

      <p class="results-count">
        Mostrando {{ filteredRooms.length }} de {{ rooms.length }} espacios
      </p>
    </div>

    <!-- Lista de espacios -->
    <div v-if="!loading && !error" class="spaces-grid">
      <SpaceCard
        v-for="room in filteredRooms"
        :key="room.id"
        :room="room"
        :is-selected="isSelected(room.id)"
        :on-select="selectSpace"
      />

      <!-- Mensaje si no hay resultados -->
      <div v-if="filteredRooms.length === 0" class="no-results">
        <p>😔 No se encontraron espacios con los filtros seleccionados</p>
        <button @click="clearFilters" class="btn btn-primary">Mostrar Todos</button>
      </div>
    </div>

    <!-- Botón flotante para ir al checkout -->
    <transition name="slide-up">
      <div v-if="hasSelectedRoom" class="floating-checkout">
        <div class="floating-content">
          <div class="floating-info">
            <p><strong>{{ selectedRoomDetails.name }}</strong></p>
            <p class="small">Planta {{ selectedRoomDetails.planta }} • {{ selectedRoomDetails.precio }}€/hora</p>
          </div>
          <button @click="goToCheckout" class="btn btn-success">
            Continuar con la Reserva →
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useReservationStore } from '../stores/reservationStore'
import SpaceCard from '../components/SpaceCard.vue'

const router = useRouter()
const reservationStore = useReservationStore()

// Estados locales
const selectedCapacity = ref('')
const selectedPlanta = ref('')

// Computed desde el store
const rooms = computed(() => reservationStore.rooms)
const loading = computed(() => reservationStore.loading)
const error = computed(() => reservationStore.error)
const hasSelectedRoom = computed(() => reservationStore.hasSelectedRoom)
const selectedRoomDetails = computed(() => reservationStore.selectedRoomDetails)

// Plantas disponibles
const availablePlantas = computed(() => {
  const plantas = [...new Set(rooms.value.map(room => room.planta))]
  return plantas.sort((a, b) => a - b)
})

// Espacios filtrados
const filteredRooms = computed(() => {
  let filtered = rooms.value

  if (selectedCapacity.value) {
    if (selectedCapacity.value === '9+') {
      filtered = filtered.filter(room => room.capacity === '9+')
    } else if (selectedCapacity.value === '1') {
      filtered = filtered.filter(room => room.capacity === '1')
    } else {
      filtered = filtered.filter(room => room.capacity === selectedCapacity.value)
    }
  }

  if (selectedPlanta.value) {
    filtered = filtered.filter(room => room.planta === parseInt(selectedPlanta.value))
  }

  return filtered
})

// Funciones
function isSelected(roomId) {
  return selectedRoomDetails.value?.id === roomId
}

function selectSpace(room) {
  reservationStore.selectRoom(room)
}

function clearFilters() {
  selectedCapacity.value = ''
  selectedPlanta.value = ''
}

function goToCheckout() {
  router.push('/checkout')
}

async function loadRooms() {
  try {
    await reservationStore.fetchRooms()
  } catch (err) {
    console.error('Error loading rooms:', err)
  }
}

// Cargar espacios al montar el componente
onMounted(() => {
  loadRooms()
})
</script>

<style scoped>
.subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

/* Estados de carga y error */
.loading-state,
.error-state {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-state p {
  color: #ef4444;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

/* Filtros */
.filters-section {
  margin-bottom: 2rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
}

.filter-group label {
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group select {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-group select:focus {
  outline: none;
  border-color: #3b82f6;
}

.results-count {
  color: #6b7280;
  font-size: 0.95rem;
}

/* Grid de espacios */
.spaces-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Botones restantes */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-secondary {
  background: #f3f4f6;
  color: #4b5563;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.btn-success:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(16, 185, 129, 0.3);
}

/* Sin resultados */
.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
}

.no-results p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

/* Botón flotante */
.floating-checkout {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  padding: 1rem;
  border-top: 3px solid #10b981;
}

.floating-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.floating-info p {
  margin: 0;
  color: #1f2937;
}

.floating-info .small {
  font-size: 0.9rem;
  color: #6b7280;
}

/* Animaciones */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(100%);
}

/* Responsive */
@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }

  .filter-group {
    width: 100%;
  }

  .spaces-grid {
    grid-template-columns: 1fr;
  }

  .floating-content {
    flex-direction: column;
    text-align: center;
  }

  .btn-success {
    width: 100%;
  }
}
</style>

