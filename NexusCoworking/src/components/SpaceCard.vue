<template>
  <div
    class="space-card"
    :class="{ 'selected': isSelected }"
  >
    <div class="space-image">
      <img :src="room.image" :alt="room.name" />
      <div v-if="isSelected" class="selected-badge">✓ Seleccionado</div>
    </div>

    <div class="space-content">
      <h3>{{ room.name }}</h3>

      <div class="space-details">
        <div class="detail-item">
          <span class="icon">🏢</span>
          <span>Planta {{ room.planta }}</span>
        </div>
        <div class="detail-item">
          <span class="icon">👥</span>
          <span>{{ getCapacityLabel(room.capacity) }}</span>
        </div>
        <div class="detail-item price">
          <span class="icon">💰</span>
          <span class="price-value">{{ room.precio }}€/hora</span>
        </div>
      </div>

      <button
        @click="onSelect(room)"
        class="btn btn-primary btn-block"
      >
        {{ isSelected ? 'Espacio Seleccionado' : 'Seleccionar Espacio' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// Props del componente
const props = defineProps({
  room: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  },
  onSelect: {
    type: Function,
    required: true
  }
})

// Función para obtener etiqueta de capacidad
function getCapacityLabel(capacity) {
  const labels = {
    '1': '1 persona',
    '2-4': '2-4 personas',
    '5-8': '5-8 personas',
    '9+': '9+ personas'
  }
  return labels[capacity] || capacity
}
</script>

<style scoped>
/* Tarjetas de espacios */
.space-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 3px solid transparent;
}

.space-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.space-card.selected {
  border-color: #10b981;
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
}

.space-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.space-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.selected-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #10b981;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
}

.space-content {
  padding: 1.5rem;
}

.space-content h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.space-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
}

.detail-item.price {
  color: #10b981;
  font-weight: 600;
}

.price-value {
  font-size: 1.2rem;
}

.icon {
  font-size: 1.2rem;
}

/* Botones */
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

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(59, 130, 246, 0.3);
}

.btn-block {
  width: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .space-image {
    height: 150px;
  }
}
</style>
