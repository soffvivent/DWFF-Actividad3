import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useReservationStore = defineStore('reservation', () => {
  // Estado
  const rooms = ref([])
  const selectedRoom = ref(null)
  const currentReservation = ref(null)
  const reservations = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const hasSelectedRoom = computed(() => selectedRoom.value !== null)
  const selectedRoomDetails = computed(() => selectedRoom.value)

  // Actions

  /**
   * Obtener todos los espacios desde el API
   */
  async function fetchRooms() {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('https://mock.apidog.com/m1/1069422-1057565-default/rooms')

      if (!response.ok) {
        throw new Error('Error al obtener los espacios')
      }

      const data = await response.json()
      rooms.value = data
      return data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching rooms:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Seleccionar un espacio para reserva
   * @param {Object} room - Objeto del espacio con id, name, capacity, planta, precio
   */
  function selectRoom(room) {
    if (!room || !room.id) {
      console.error('Invalid room object')
      return
    }

    selectedRoom.value = {
      id: room.id,
      name: room.name,
      capacity: room.capacity,
      planta: room.planta,
      precio: room.precio,
      image: room.image
    }

    console.log('Room selected:', selectedRoom.value)
  }

  /**
   * Limpiar el espacio seleccionado
   */
  function clearSelectedRoom() {
    selectedRoom.value = null
  }

  /**
   * Crear una nueva reserva
   * @param {Object} reservationData - Datos de la reserva
   * @returns {Object} - Reserva creada
   */
  function createReservation(reservationData) {
    if (!selectedRoom.value) {
      throw new Error('No hay un espacio seleccionado')
    }

    // Generar ID único para la reserva
    const newReservationId = reservations.value.length > 0
      ? Math.max(...reservations.value.map(r => r.id)) + 1
      : 1

    const reservation = {
      id: newReservationId,
      roomId: selectedRoom.value.id,
      roomName: selectedRoom.value.name,
      roomPlanta: selectedRoom.value.planta,
      roomCapacity: selectedRoom.value.capacity,
      roomPrecio: selectedRoom.value.precio,
      startDate: reservationData.startDate,
      endDate: reservationData.endDate,
      userId: reservationData.userId || 1, // Por defecto usuario 1
      additionalPreferences: reservationData.additionalPreferences || [],
      // Datos adicionales del formulario
      userName: reservationData.userName,
      userEmail: reservationData.userEmail,
      comments: reservationData.comments || '',
      createdAt: new Date().toISOString()
    }

    reservations.value.push(reservation)
    currentReservation.value = reservation

    console.log('Reservation created:', reservation)
    return reservation
  }

  /**
   * Obtener una reserva por ID
   * @param {number} id - ID de la reserva
   */
  function getReservationById(id) {
    return reservations.value.find(r => r.id === id)
  }

  /**
   * Obtener todas las reservas de un usuario
   * @param {number} userId - ID del usuario
   */
  function getReservationsByUserId(userId) {
    return reservations.value.filter(r => r.userId === userId)
  }

  /**
   * Limpiar la reserva actual
   */
  function clearCurrentReservation() {
    currentReservation.value = null
    selectedRoom.value = null
  }

  /**
   * Cancelar una reserva
   * @param {number} id - ID de la reserva
   */
  function cancelReservation(id) {
    const index = reservations.value.findIndex(r => r.id === id)
    if (index !== -1) {
      reservations.value.splice(index, 1)
      if (currentReservation.value?.id === id) {
        currentReservation.value = null
      }
    }
  }

  /**
   * Obtener un espacio por ID
   * @param {number} id - ID del espacio
   */
  function getRoomById(id) {
    return rooms.value.find(r => r.id === id)
  }

  return {
    // Estado
    rooms,
    selectedRoom,
    currentReservation,
    reservations,
    loading,
    error,

    // Getters
    hasSelectedRoom,
    selectedRoomDetails,

    // Actions
    fetchRooms,
    selectRoom,
    clearSelectedRoom,
    createReservation,
    getReservationById,
    getReservationsByUserId,
    clearCurrentReservation,
    cancelReservation,
    getRoomById
  }
})

