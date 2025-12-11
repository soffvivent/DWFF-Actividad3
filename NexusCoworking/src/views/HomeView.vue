<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1>🏢 Bienvenido a Nexus Coworking</h1>
            <p class="hero-subtitle">
              El espacio perfecto para trabajar, crear e innovar en el corazón de la ciudad
            </p>
            <div class="hero-buttons">
              <router-link to="/spaces" class="btn btn-primary btn-large">
                <span class="icon">🏢</span>
                Ver Espacios Disponibles
              </router-link>
              <router-link to="/checkout" class="btn btn-secondary btn-large">
                <span class="icon">📅</span>
                Reservar Ahora
              </router-link>
            </div>
          </div>
          <div class="hero-image">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&crop=center" alt="Espacio de coworking moderno" />
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about">
      <div class="container">
        <div class="section-header">
          <h2>📚 Sobre Nexus Coworking</h2>
          <p class="section-subtitle">
            Una librería tradicional que evoluciona hacia el futuro del trabajo colaborativo
          </p>
        </div>

        <div class="about-grid">
          <div class="about-card">
            <div class="card-icon">📖</div>
            <h3>Herencia Literaria</h3>
            <p>
              Nexus Coworking nace de una librería centenaria que ha sido punto de encuentro
              para pensadores, creadores y emprendedores. Mantenemos vivo el espíritu de
              comunidad mientras abrazamos la innovación digital.
            </p>
          </div>

          <div class="about-card">
            <div class="card-icon">🤝</div>
            <h3>Espacios Colaborativos</h3>
            <p>
              Ofrecemos espacios de trabajo flexibles y equipados con tecnología de vanguardia,
              perfectos para freelancers, startups y equipos remotos que buscan un entorno
              inspirador y productivo.
            </p>
          </div>

          <div class="about-card">
            <div class="card-icon">🌟</div>
            <h3>Comunidad Creativa</h3>
            <p>
              Más que un espacio de trabajo, somos un ecosistema donde ideas fluyen,
              colaboraciones nacen y proyectos innovadores toman forma. Eventos,
              workshops y networking forman parte de nuestro ADN.
            </p>
          </div>
        </div>

        <div class="about-text">
          <div class="text-block">
            <h3>🏛️ La Evolución de un Clásico</h3>
            <p>
              Fundada hace más de 50 años como librería tradicional, Nexus ha sido testigo
              de la transformación digital del mundo del trabajo. Hoy, combinamos la calidez
              de nuestros estantes repletos de libros con espacios modernos equipados con
              la última tecnología.
            </p>
            <p>
              Nuestro compromiso es crear un puente entre el conocimiento del pasado y
              las innovaciones del futuro, ofreciendo un entorno donde la creatividad
              florece y las ideas se materializan.
            </p>
          </div>

          <div class="text-block">
            <h3>🎯 Por Qué Elegir Nexus</h3>
            <ul class="features-list">
              <li><span class="icon">✅</span> <strong>Flexibilidad total:</strong> Horarios 24/7 y reservas instantáneas</li>
              <li><span class="icon">✅</span> <strong>Tecnología avanzada:</strong> WiFi de alta velocidad, equipos audiovisuales</li>
              <li><span class="icon">✅</span> <strong>Comunidad activa:</strong> Eventos regulares y networking</li>
              <li><span class="icon">✅</span> <strong>Ubicación privilegiada:</strong> Centro de la ciudad, excelente transporte</li>
              <li><span class="icon">✅</span> <strong>Ambiente inspirador:</strong> Diseño moderno con toques clásicos</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Zones Gallery Section -->
    <section class="zones">
      <div class="container">
        <div class="section-header">
          <h2>🏢 Nuestros Espacios</h2>
          <p class="section-subtitle">
            Descubre las diferentes zonas adaptadas a tus necesidades de trabajo
          </p>
        </div>

        <div class="zones-grid">
          <div class="zone-card">
            <div class="zone-image">
              <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop&crop=center" alt="Sala de reuniones ejecutivas" />
              <div class="zone-badge">Premium</div>
            </div>
            <div class="zone-content">
              <h3>Sala Ejecutiva</h3>
              <p>Espacio privado para reuniones importantes con capacidad hasta 12 personas. Equipada con proyector, pizarra digital y sistema de videoconferencias.</p>
              <div class="zone-features">
                <span class="feature">👥 2-12 personas</span>
                <span class="feature">💻 Tecnología avanzada</span>
                <span class="feature">🏢 Planta 3</span>
              </div>
            </div>
          </div>

          <div class="zone-card">
            <div class="zone-image">
              <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop&crop=center" alt="Espacio de trabajo individual" />
              <div class="zone-badge">Popular</div>
            </div>
            <div class="zone-content">
              <h3>Estación Individual</h3>
              <p>Espacio personal con escritorio ergonómico, buena iluminación y privacidad. Perfecto para concentrarte en tus proyectos más importantes.</p>
              <div class="zone-features">
                <span class="feature">👤 1 persona</span>
                <span class="feature">💼 Equipado</span>
                <span class="feature">🏢 Planta 1</span>
              </div>
            </div>
          </div>

          <div class="zone-card">
            <div class="zone-image">
              <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop&crop=center" alt="Zona de trabajo colaborativo" />
              <div class="zone-badge">Colaborativo</div>
            </div>
            <div class="zone-content">
              <h3>Zona Compartida</h3>
              <p>Espacio abierto ideal para equipos pequeños que necesitan colaborar. Mesas amplias, enchufes múltiples y ambiente creativo.</p>
              <div class="zone-features">
                <span class="feature">👥 2-4 personas</span>
                <span class="feature">🤝 Colaborativo</span>
                <span class="feature">🏢 Planta 2</span>
              </div>
            </div>
          </div>

          <div class="zone-card">
            <div class="zone-image">
              <img src="https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400&h=300&fit=crop&crop=center" alt="Sala de eventos y talleres" />
              <div class="zone-badge">Eventos</div>
            </div>
            <div class="zone-content">
              <h3>Sala de Eventos</h3>
              <p>Espacio versátil para talleres, presentaciones y eventos corporativos. Configurable según tus necesidades específicas.</p>
              <div class="zone-features">
                <span class="feature">👥 5-20 personas</span>
                <span class="feature">🎭 Versátil</span>
                <span class="feature">🏢 Planta 4</span>
              </div>
            </div>
          </div>
        </div>

        <div class="cta-section">
          <h3>¿Listo para empezar?</h3>
          <p>Reserva tu espacio ideal y únete a nuestra comunidad de profesionales</p>
          <div class="cta-buttons">
            <router-link to="/spaces" class="btn btn-primary btn-large">
              <span class="icon">🔍</span>
              Explorar Todos los Espacios
            </router-link>
            <router-link to="/checkout" class="btn btn-success btn-large">
              <span class="icon">⚡</span>
              Reserva Rápida
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>
/* Global styles */
.home {
  min-height: 100vh;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0 6rem;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&crop=center') center/cover;
  opacity: 0.1;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.hero-text h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  line-height: 1.2;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* About Section */
.about {
  padding: 6rem 0;
  background: #f8fafc;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
  font-weight: 700;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.about-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.about-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.about-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
  font-weight: 600;
}

.about-card p {
  color: #64748b;
  line-height: 1.6;
}

.about-text {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 3rem;
}

.text-block h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #1e293b;
  font-weight: 600;
}

.text-block p {
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  margin-bottom: 0.75rem;
  color: #475569;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.features-list .icon {
  font-size: 1.2rem;
  margin-top: 0.1rem;
}

/* Zones Section */
.zones {
  padding: 6rem 0;
  background: white;
}

.zones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.zone-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.zone-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.zone-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.zone-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.zone-card:hover .zone-image img {
  transform: scale(1.05);
}

.zone-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.zone-content {
  padding: 1.5rem;
}

.zone-content h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #1e293b;
  font-weight: 600;
}

.zone-content p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.zone-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature {
  background: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

/* CTA Section */
.cta-section {
  text-align: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 3rem;
  border-radius: 12px;
  margin-top: 2rem;
}

.cta-section h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1e293b;
  font-weight: 700;
}

.cta-section p {
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
}

.btn-secondary {
  background: white;
  color: #475569;
  border: 2px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.btn-success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.btn-success:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.icon {
  font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero-text h1 {
    font-size: 2.2rem;
  }

  .hero-buttons {
    justify-content: center;
  }

  .about-text {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .zones-grid {
    grid-template-columns: 1fr;
  }

  .about-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .hero-image img {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 3rem 0 4rem;
  }

  .hero-text h1 {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .about-card {
    padding: 1.5rem;
  }

  .zone-content {
    padding: 1.2rem;
  }

  .cta-section {
    padding: 2rem;
  }
}
</style>
