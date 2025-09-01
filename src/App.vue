<template>
  <div id="app" :class="{ dark: darkMode }">
    <!-- Google Auth Modal -->
    <div v-if="!user" class="auth-modal">
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-logo">
            <span class="logo-icon">🤖</span>
            <span class="logo-text">AI Universe</span>
          </div>
          <h2 class="auth-title">{{ t.auth.title }}</h2>
          <p class="auth-subtitle">{{ t.auth.subtitle }}</p>
          
          <div id="google-signin-button"></div>
          
          <button @click="signInWithGoogle" class="google-btn">
            <svg class="google-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {{ t.auth.google }}
          </button>

          <div class="auth-features">
            <div class="feature">✅ {{ t.auth.secure }}</div>
            <div class="feature">🚀 {{ t.auth.instant }}</div>
            <div class="feature">🌍 {{ t.auth.global }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Header -->
    <header v-if="user" class="header">
      <div class="container">
        <nav class="navbar">
          <div class="nav-brand">
            <div class="logo">
              <span class="logo-icon">🤖</span>
              <span class="logo-text">AI Universe</span>
            </div>
          </div>
          <div class="nav-actions">
            <div class="user-info">
              <img :src="user.picture" :alt="user.name" class="user-avatar">
              <span class="user-name">{{ user.name }}</span>
            </div>
            <select
              v-model="currentLang"
              @change="changeLanguage"
              class="lang-select"
            >
              <option value="uz">O'zbek</option>
              <option value="en">English</option>
              <option value="ru">Русский</option>
              <option value="ar">العربية</option>
            </select>
            <button @click="toggleTheme" class="theme-btn">
              <span v-if="darkMode">☀️</span>
              <span v-else>🌙</span>
            </button>
            <button @click="showChatHistory" class="history-btn">
              📚 {{ t.nav.history }}
            </button>
            <button @click="showStats" class="stats-btn">
              📊 {{ t.nav.stats }}
            </button>
            <button @click="signOut" class="logout-btn">
              🚪 {{ t.nav.logout }}
            </button>
          </div>
        </nav>
      </div>
    </header>

    <!-- Main Page -->
    <main v-if="user && !selectedAI && !showingHistory && !showingStats" class="main-page">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">{{ t.hero.title }}</h1>
            <p class="hero-subtitle">{{ t.hero.subtitle }}</p>
            <div class="hero-features">
              <div class="feature-item">
                <span class="feature-number">25</span>
                <span class="feature-text">{{ t.hero.services }}</span>
              </div>
              <div class="feature-item">
                <span class="feature-number">24/7</span>
                <span class="feature-text">{{ t.hero.online }}</span>
              </div>
              <div class="feature-item">
                <span class="feature-number">4</span>
                <span class="feature-text">{{ t.hero.languages }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- AI Services Section -->
      <section class="services-section">
        <div class="container">
          <h2 class="section-title">{{ t.services.title }}</h2>
          <div class="services-grid">
            <div
              v-for="ai in aiServices"
              :key="ai.id"
              class="service-card"
              :class="getServiceCardClass(ai.id)"
              @click="openAI(ai)"
            >
              <div class="card-header">
                <div class="service-icon">{{ ai.emoji }}</div>
                <div class="service-status">{{ t.services.online }}</div>
                <div class="usage-badge">{{ getAIUsage(ai.id) }}</div>
              </div>
              <h3 class="service-title">{{ ai.name[currentLang] }}</h3>
              <p class="service-description">
                {{ ai.description[currentLang] }}
              </p>
              <div class="card-footer">
                <span class="response-time">{{ t.services.instant }}</span>
                <span class="arrow">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Info Section -->
      <section class="info-section">
        <div class="container">
          <div class="info-grid">
            <div class="info-card">
              <div class="info-icon">⚡</div>
              <h3 class="info-title">{{ t.features.speed }}</h3>
              <p class="info-desc">{{ t.features.speedDesc }}</p>
            </div>
            <div class="info-card">
              <div class="info-icon">🔒</div>
              <h3 class="info-title">{{ t.features.security }}</h3>
              <p class="info-desc">{{ t.features.securityDesc }}</p>
            </div>
            <div class="info-card">
              <div class="info-icon">🌍</div>
              <h3 class="info-title">{{ t.features.global }}</h3>
              <p class="info-desc">{{ t.features.globalDesc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats-section">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">{{ totalUsers.toLocaleString() }}+</div>
              <div class="stat-label">{{ t.stats.users }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ totalMessages.toLocaleString() }}+</div>
              <div class="stat-label">{{ t.stats.messages }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">99.9%</div>
              <div class="stat-label">{{ t.stats.uptime }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">4.9/5</div>
              <div class="stat-label">{{ t.stats.rating }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2 class="cta-title">{{ t.cta.title }}</h2>
            <p class="cta-subtitle">{{ t.cta.subtitle }}</p>
            <div class="cta-badges">
              <div class="badge">ISO 27001</div>
              <div class="badge">SOC 2 Type 2</div>
              <div class="badge">GDPR</div>
              <div class="badge">OpenAI Partner</div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Chat History Page -->
    <main v-if="user && showingHistory" class="history-page">
      <div class="container">
        <div class="history-header">
          <button @click="showingHistory = false" class="back-button">
            ← {{ t.history.back }}
          </button>
          <h1 class="page-title">{{ t.history.title }}</h1>
          <button @click="clearAllHistory" class="clear-btn" :disabled="chatHistory.length === 0">
            🗑️ {{ t.history.clearAll }}
          </button>
        </div>

        <div class="history-grid" v-if="chatHistory && chatHistory.length > 0">
          <div
            v-for="chat in chatHistory"
            :key="chat.id"
            class="history-card"
            @click="openHistoryChat(chat)"
          >
            <div class="history-header-info">
              <div class="ai-info">
                <span class="ai-emoji">{{ getAIById(chat.ai_id)?.emoji || '🤖' }}</span>
                <span class="ai-name">{{ getAIById(chat.ai_id)?.name?.[currentLang] || 'AI Assistant' }}</span>
              </div>
              <div class="chat-date">{{ formatDate(chat.created_at) }}</div>
            </div>
            <div class="chat-preview">{{ chat.preview || 'Yangi suhbat' }}</div>
            <div class="chat-stats">
              <span class="message-count">{{ chat.message_count || 0 }} {{ t.history.messages }}</span>
              <button @click.stop="deleteChat(chat.id)" class="delete-chat-btn">
                🗑️
              </button>
            </div>
          </div>
        </div>

        <div v-else class="empty-history">
          <div class="empty-icon">💬</div>
          <h3>{{ t.history.empty }}</h3>
          <p>{{ t.history.emptyDesc }}</p>
        </div>
      </div>
    </main>

    <!-- Statistics Page -->
    <main v-if="user && showingStats" class="stats-page">
      <div class="container">
        <div class="stats-header">
          <button @click="showingStats = false" class="back-button">
            ← {{ t.stats.back }}
          </button>
          <h1 class="page-title">{{ t.stats.pageTitle }}</h1>
        </div>

        <div class="stats-dashboard">
          <!-- Personal Stats -->
          <div class="stats-section">
            <h2 class="stats-section-title">{{ t.stats.personal }}</h2>
            <div class="stats-cards">
              <div class="stat-card-detailed">
                <div class="stat-icon">💬</div>
                <div class="stat-info">
                  <div class="stat-number">{{ userStats?.totalMessages || 0 }}</div>
                  <div class="stat-label">{{ t.stats.yourMessages }}</div>
                </div>
              </div>
              <div class="stat-card-detailed">
                <div class="stat-icon">🤖</div>
                <div class="stat-info">
                  <div class="stat-number">{{ userStats?.usedAIs || 0 }}</div>
                  <div class="stat-label">{{ t.stats.usedAIs }}</div>
                </div>
              </div>
              <div class="stat-card-detailed">
                <div class="stat-icon">📅</div>
                <div class="stat-info">
                  <div class="stat-number">{{ userStats?.daysActive || 0 }}</div>
                  <div class="stat-label">{{ t.stats.activeDays }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- AI Usage Stats -->
          <div class="stats-section">
            <h2 class="stats-section-title">{{ t.stats.mostUsed }}</h2>
            <div class="ai-usage-list" v-if="sortedAIUsage && sortedAIUsage.length > 0">
              <div
                v-for="usage in sortedAIUsage"
                :key="usage.ai_id"
                class="usage-item"
              >
                <div class="usage-ai">
                  <span class="usage-emoji">{{ getAIById(usage.ai_id)?.emoji || '🤖' }}</span>
                  <span class="usage-name">{{ getAIById(usage.ai_id)?.name?.[currentLang] || 'AI Assistant' }}</span>
                </div>
                <div class="usage-stats">
                  <div class="usage-count">{{ usage.count || 0 }} {{ t.stats.messages }}</div>
                  <div class="usage-bar">
                    <div class="usage-fill" :style="{ width: getUsagePercentage(usage.count) + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="empty-usage">
              <p>{{ t.stats.noUsage || 'Hech qanday faoliyat topilmadi' }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer v-if="user && !selectedAI && !showingHistory && !showingStats" class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="footer-logo">
              <span class="logo-icon">🤖</span>
              <span class="logo-text">AI Universe</span>
            </div>
            <p class="footer-desc">{{ t.footer.description }}</p>
            <div class="social-links">
              <a href="#" class="social-link">📧</a>
              <a href="#" class="social-link">📱</a>
              <a href="#" class="social-link">💬</a>
            </div>
          </div>

          <div class="footer-section">
            <h4 class="footer-title">{{ t.footer.services.title }}</h4>
            <ul class="footer-links">
              <li><a href="#">{{ t.footer.services.chat }}</a></li>
              <li><a href="#">{{ t.footer.services.translate }}</a></li>
              <li><a href="#">{{ t.footer.services.code }}</a></li>
              <li><a href="#">{{ t.footer.services.business }}</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4 class="footer-title">{{ t.footer.support.title }}</h4>
            <ul class="footer-links">
              <li><a href="#">{{ t.footer.support.help }}</a></li>
              <li><a href="#">{{ t.footer.support.docs }}</a></li>
              <li><a href="#">{{ t.footer.support.api }}</a></li>
              <li><a href="#">{{ t.footer.support.status }}</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4 class="footer-title">{{ t.footer.contact.title }}</h4>
            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <span>{{ t.footer.contact.address }}</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📞</span>
                <span>+998 94 412 63 63</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📞</span>
                <span>+998 93 193 16 00</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">✉️</span>
                <span>humoyunanvarjonov52@gmail.com</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">✉️</span>
                <span>yarashovrashid48@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2025 AI Universe. {{ t.footer.rights }}</p>
          <div class="footer-links-bottom">
            <a href="#">{{ t.footer.privacy }}</a>
            <a href="#">{{ t.footer.terms }}</a>
            <a href="#">{{ t.footer.cookies }}</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- AI Chat Interface -->
    <div
      v-if="user && selectedAI"
      class="chat-interface"
      :class="getAIThemeClass(selectedAI.id)"
    >
      <!-- Chat Header -->
      <div class="chat-header">
        <div class="container">
          <div class="chat-nav">
            <button @click="closeAI" class="back-button">
              ← {{ t.chat.back }}
            </button>
            <div class="ai-info">
              <div class="ai-avatar">{{ selectedAI.emoji }}</div>
              <div class="ai-details">
                <h2 class="ai-name">{{ selectedAI.name[currentLang] }}</h2>
                <div class="ai-status">{{ t.chat.online }}</div>
              </div>
            </div>
            <div class="chat-controls">
              <button @click="saveCurrentChat" class="save-btn" v-if="messages.length > 1">
                💾 {{ t.chat.save }}
              </button>
              <button @click="clearCurrentChat" class="clear-btn" v-if="messages.length > 1">
                🗑️ {{ t.chat.clear }}
              </button>
              <select
                v-model="currentLang"
                @change="changeLanguage"
                class="lang-select"
              >
                <option value="uz">O'zbek</option>
                <option value="en">English</option>
                <option value="ru">Русский</option>
                <option value="ar">العربية</option>
              </select>
              <button @click="toggleTheme" class="theme-btn">
                <span v-if="darkMode">☀️</span>
                <span v-else>🌙</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="chat-body">
        <div class="container">
          <div class="messages-container" ref="messagesContainer">
            <div
              v-for="message in messages"
              :key="message.id"
              :class="['message-wrapper', message.type]"
            >
              <div class="message-avatar">
                <span v-if="message.type === 'user'">
                  <img :src="user.picture" :alt="user.name" class="message-user-avatar">
                </span>
                <span v-else>{{ selectedAI.emoji }}</span>
              </div>
              <div class="message-bubble">
                <div
                  class="message-content"
                  v-html="formatMessage(message.content)"
                ></div>
                <div class="message-time">
                  {{ formatTime(message.timestamp) }}
                </div>
                <div v-if="message.type === 'user'" class="message-actions">
                  <button @click="editMessage(message)" class="edit-btn">✏️</button>
                  <button @click="deleteMessage(message.id)" class="delete-btn">🗑️</button>
                </div>
              </div>
            </div>

            <!-- Typing Indicator -->
            <div v-if="isTyping" class="message-wrapper ai">
              <div class="message-avatar">
                <span>{{ selectedAI.emoji }}</span>
              </div>
              <div class="message-bubble">
                <div class="typing-animation">
                  <div class="typing-dot"></div>
                  <div class="typing-dot"></div>
                  <div class="typing-dot"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="chat-footer">
        <div class="container">
          <div class="input-wrapper">
            <!-- TO'G'RILANGAN INPUT VA BUTTON -->
<textarea
  v-model="currentMessage"
  @keypress.enter.prevent="!$event.shiftKey && sendMessage()"
  @input="adjustTextareaHeight"
  :placeholder="t.chat.placeholder + ' (Shift+Enter - yangi qator)'"
  class="chat-input"
  rows="1"
  ref="chatInput"
></textarea>

<button
  @click="sendMessage"
  :disabled="!currentMessage.trim()"
  class="send-button"
>
  <span v-if="!isTyping">🚀</span>
  <span v-else class="loading">⏳</span>
</button>

<!-- TYPING INDIKATORINI ALOHIDA JOYDA KO'RSATING -->
<div v-if="isTyping" class="typing-indicator">
  AI javob bermoqda...
</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>{{ t.loading }}</p>
      </div>
    </div>

    <!-- Notification Toast -->
    <div v-if="notification.show" class="notification-toast" :class="notification.type">
      <span>{{ notification.message }}</span>
      <button @click="hideNotification">✕</button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, nextTick, onMounted, onUnmounted, watch } from 'vue';
import axios from 'axios';
// API Base URL - .env dan o'qish
const API_BASE_URL = 'https://ai-backend-fy7t.onrender.com'

export default {
  name: 'AIUniverse',
  setup() {
    // State management
    const user = ref(null);
    const darkMode = ref(localStorage.getItem('darkMode') === 'true');
    const currentLang = ref(localStorage.getItem('language') || 'uz');
    const selectedAI = ref(null);
    const messages = ref([]);
    const currentMessage = ref('');
    const isTyping = ref(false);
    const messageId = ref(1);
    const messagesContainer = ref(null);
    const chatInput = ref(null);
    const loading = ref(false);
    const showingHistory = ref(false);
    const showingStats = ref(false);
    const chatHistory = ref([]);
    const currentChatId = ref(null);
    const aiUsageStats = ref({});
    const stats = ref({});
    const userStats = ref({
      totalMessages: 0,
      usedAIs: 0,
      daysActive: 0
    });
    const totalUsers = ref(15847);
    const totalMessages = ref(892456);
    
    // Auto-save interval ref
    const autoSaveInterval = ref(null);

    // Notification system
    const notification = reactive({
      show: false,
      message: '',
      type: 'info'
    });

    const translations = reactive({
      uz: {
        auth: {
          title: "AI Universe'ga xush kelibsiz",
          subtitle: "Platformaga kirish uchun Google orqali ro'yxatdan o'ting",
          google: "Google orqali kirish",
          secure: "100% xavfsiz",
          instant: "Tezkor kirish",
          global: "Global platform"
        },
        nav: {
          history: "Suhbat tarixi",
          stats: "Statistika",
          logout: "Chiqish"
        },
        hero: {
          title: '25 ta professional AI xizmati bir platformada',
          subtitle: "Sun'iy intellekt bilan hayotingizni osonlashtiring! Har bir AI o'z sohasida mutaxassis. Professional sifat va innovatsion yondashuvlar bilan sizning barcha ehtiyojlaringiz qondiriladi.",
          services: 'ta professional AI xizmati',
          online: 'Onlayn va tayyor',
          languages: "tilda qo'llab-quvvatlash",
        },
        services: {
          title: 'Professional AI Xizmatlar',
          online: 'Onlayn va tayyor',
          instant: '1 soniyadan kamroq vaqtda javob',
        },
        features: {
          speed: 'Tezkor javob',
          speedDesc: '1 soniyadan kamroq vaqtda javob. Optimallashtirilgan algoritmlar va bulutli texnologiyalar.',
          security: 'Xavfsizlik',
          securityDesc: "256-bit shifrlash va ilg'or xavfsizlik protokollari. Ma'lumotlaringiz himoyalangan.",
          global: "Global qo'llab-quvvatlash",
          globalDesc: 'Dunyoning barcha asosiy tillararida muloqot. Real vaqtda tarjima va tushunish.',
        },
        stats: {
          users: 'Faol foydalanuvchilar',
          messages: 'Qayta ishlangan xabarlar',
          uptime: 'Ishonchlilik',
          rating: 'Foydalanuvchi baholari',
          back: 'Orqaga',
          pageTitle: 'Statistika',
          personal: 'Shaxsiy statistika',
          yourMessages: 'Sizning xabarlaringiz',
          usedAIs: 'Ishlatilgan AI\'lar',
          activeDays: 'Faol kunlar',
          mostUsed: 'Eng ko\'p ishlatiladigan AI\'lar'
        },
        history: {
          title: 'Suhbat tarixi',
          back: 'Orqaga',
          clearAll: 'Hammasini o\'chirish',
          messages: 'xabar',
          empty: 'Suhbat tarixi bo\'sh',
          emptyDesc: 'Hali hech qanday suhbat yo\'q. AI\'lar bilan gaplashing!',
          confirmDelete: 'Suhbatni o\'chirishni tasdiqlaysizmi?',
          confirmClearAll: 'Barcha suhbatlarni o\'chirishni tasdiqlaysizmi?'
        },
        cta: {
          title: "O'zbekistonda sun'iy intellekt texnologiyalarini rivojlantirish",
          subtitle: 'Bizning maqsadimiz - AI orqali hayotni osonlashtirish va yangi imkoniyatlar yaratish',
        },
        footer: {
          description: "Professional AI xizmatlar platformasi. Sun'iy intellekt bilan kelajakni yaratamiz.",
          services: {
            title: 'Xizmatlar',
            chat: 'Chat AI',
            translate: 'Tarjimon',
            code: 'Dasturlash',
            business: 'Biznes',
          },
          support: {
            title: 'Yordam',
            help: 'Yordam markazi',
            docs: 'Hujjatlar',
            api: 'API',
            status: 'Status',
          },
          contact: {
            title: 'Aloqa',
            address: 'Samarqand School-21',
          },
          rights: 'Barcha huquqlar himoyalangan.',
          privacy: 'Maxfiylik',
          terms: 'Shartlar',
          cookies: 'Cookie',
        },
        chat: {
          back: 'Orqaga',
          online: 'Onlayn va tayyor',
          placeholder: 'Savolingizni yozing...',
          save: 'Saqlash',
          clear: 'Tozalash',
          edit: 'Tahrirlash',
          delete: 'O\'chirish'
        },
        loading: 'Yuklanmoqda...',
        notifications: {
          chatSaved: 'Suhbat saqlandi',
          chatDeleted: 'Suhbat o\'chirildi',
          messageDeleted: 'Xabar o\'chirildi',
          error: 'Xatolik yuz berdi',
          historyCleared: 'Barcha suhbatlar o\'chirildi'
        }
      },
      en: {
        auth: {
          title: "Welcome to AI Universe",
          subtitle: "Sign up with Google to access the platform",
          google: "Sign in with Google",
          secure: "100% secure",
          instant: "Instant access",
          global: "Global platform"
        },
        nav: {
          history: "Chat History",
          stats: "Statistics",
          logout: "Logout"
        },
        hero: {
          title: '25 professional AI services in one platform',
          subtitle: 'Simplify your life with artificial intelligence! Each AI is specialized in its field. Meets all your needs with professional quality and innovative approaches.',
          services: 'professional AI services',
          online: 'Online and ready',
          languages: 'language support',
        },
        services: {
          title: 'Professional AI Services',
          online: 'Online and ready',
          instant: 'Response in less than 1 second',
        },
        features: {
          speed: 'Fast response',
          speedDesc: 'Response in less than 1 second. Optimized algorithms and cloud technologies.',
          security: 'Security',
          securityDesc: '256-bit encryption and advanced security protocols. Your data is protected.',
          global: 'Global support',
          globalDesc: 'Communication in all major languages of the world. Real-time translation and understanding.',
        },
        stats: {
          users: 'Active users',
          messages: 'Messages processed',
          uptime: 'Reliability',
          rating: 'User ratings',
          back: 'Back',
          pageTitle: 'Statistics',
          personal: 'Personal statistics',
          yourMessages: 'Your messages',
          usedAIs: 'Used AIs',
          activeDays: 'Active days',
          mostUsed: 'Most used AIs'
        },
        history: {
          title: 'Chat History',
          back: 'Back',
          clearAll: 'Clear All',
          messages: 'messages',
          empty: 'Chat history is empty',
          emptyDesc: 'No conversations yet. Start chatting with AIs!',
          confirmDelete: 'Are you sure you want to delete this chat?',
          confirmClearAll: 'Are you sure you want to clear all chats?'
        },
        cta: {
          title: 'Developing artificial intelligence technologies in Uzbekistan',
          subtitle: 'Our goal is to simplify life through AI and create new opportunities',
        },
        footer: {
          description: 'Professional AI services platform. We create the future with artificial intelligence.',
          services: {
            title: 'Services',
            chat: 'Chat AI',
            translate: 'Translator',
            code: 'Programming',
            business: 'Business',
          },
          support: {
            title: 'Support',
            help: 'Help Center',
            docs: 'Documentation',
            api: 'API',
            status: 'Status',
          },
          contact: {
            title: 'Contact',
            address: 'Samarqand School-21',
          },
          rights: 'All rights reserved.',
          privacy: 'Privacy',
          terms: 'Terms',
          cookies: 'Cookies',
        },
        chat: {
          back: 'Back',
          online: 'Online and ready',
          placeholder: 'Type your question...',
          save: 'Save',
          clear: 'Clear',
          edit: 'Edit',
          delete: 'Delete'
        },
        loading: 'Loading...',
        notifications: {
          chatSaved: 'Chat saved',
          chatDeleted: 'Chat deleted',
          messageDeleted: 'Message deleted',
          error: 'An error occurred',
          historyCleared: 'All chats cleared'
        }
      },
      ru: {
        auth: {
          title: "Добро пожаловать в AI Universe",
          subtitle: "Войдите через Google для доступа к платформе",
          google: "Войти через Google",
          secure: "100% безопасно",
          instant: "Мгновенный доступ",
          global: "Глобальная платформа"
        },
        nav: {
          history: "История чатов",
          stats: "Статистика",
          logout: "Выйти"
        },
        hero: {
          title: '25 профессиональных AI сервисов на одной платформе',
          subtitle: 'Упростите свою жизнь с искусственным интеллектом! Каждый AI специализируется в своей области. Удовлетворяет все ваши потребности с профессиональным качеством и инновационными подходами.',
          services: 'профессиональных AI сервисов',
          online: 'Онлайн и готов',
          languages: 'языковая поддержка',
        },
        services: {
          title: 'Профессиональные AI Сервисы',
          online: 'Онлайн и готов',
          instant: 'Ответ менее чем за 1 секунду',
        },
        features: {
          speed: 'Быстрый ответ',
          speedDesc: 'Ответ менее чем за 1 секунду. Оптимизированные алгоритмы и облачные технологии.',
          security: 'Безопасность',
          securityDesc: '256-битное шифрование и продвинутые протоколы безопасности. Ваши данные защищены.',
          global: 'Глобальная поддержка',
          globalDesc: 'Общение на всех основных языках мира. Общение в реальном времени.',
        },
        stats: {
          users: 'Активных пользователей',
          messages: 'Обработано сообщений',
          uptime: 'Надежность',
          rating: 'Оценки пользователей',
          back: 'Назад',
          pageTitle: 'Статистика',
          personal: 'Личная статистика',
          yourMessages: 'Ваши сообщения',
          usedAIs: 'Использованные AI',
          activeDays: 'Активные дни',
          mostUsed: 'Наиболее используемые AI'
        },
        history: {
          title: 'История чатов',
          back: 'Назад',
          clearAll: 'Очистить всё',
          messages: 'сообщений',
          empty: 'История чатов пуста',
          emptyDesc: 'Пока нет разговоров. Начните общаться с AI!',
          confirmDelete: 'Вы уверены, что хотите удалить этот чат?',
          confirmClearAll: 'Вы уверены, что хотите очистить все чаты?'
        },
        cta: {
          title: 'Развитие технологий искусственного интеллекта в Узбекистане',
          subtitle: 'Наша цель - упростить жизнь через ИИ и создать новые возможности',
        },
        footer: {
          description: 'Платформа профессиональных AI услуг. Создаем будущее с искусственным интеллектом.',
          services: {
            title: 'Услуги',
            chat: 'Chat AI',
            translate: 'Переводчик',
            code: 'Программирование',
            business: 'Бизнес',
          },
          support: {
            title: 'Поддержка',
            help: 'Центр помощи',
            docs: 'Документация',
            api: 'API',
            status: 'Статус',
          },
          contact: {
            title: 'Контакты',
            address: 'Самарканд Школа-21',
          },
          rights: 'Все права защищены.',
          privacy: 'Конфиденциальность',
          terms: 'Условия',
          cookies: 'Куки',
        },
        chat: {
          back: 'Назад',
          online: 'Онлайн и готов',
          placeholder: 'Напишите ваш вопрос...',
          save: 'Сохранить',
          clear: 'Очистить',
          edit: 'Редактировать',
          delete: 'Удалить'
        },
        loading: 'Загрузка...',
        notifications: {
          chatSaved: 'Чат сохранен',
          chatDeleted: 'Чат удален',
          messageDeleted: 'Сообщение удалено',
          error: 'Произошла ошибка',
          historyCleared: 'Все чаты очищены'
        }
      },
      ar: {
        auth: {
          title: "مرحباً بك في AI Universe",
          subtitle: "سجل الدخول عبر Google للوصول إلى المنصة",
          google: "تسجيل الدخول بواسطة Google",
          secure: "آمن 100%",
          instant: "وصول فوري",
          global: "منصة عالمية"
        },
        nav: {
          history: "تاريخ المحادثات",
          stats: "الإحصائيات",
          logout: "تسجيل الخروج"
        },
        hero: {
          title: '25 خدمة ذكاء اصطناعي مهنية في منصة واحدة',
          subtitle: 'اجعل حياتك أسهل بالذكاء الاصطناعي! كل ذكاء اصطناعي متخصص في مجاله. يلبي جميع احتياجاتك بجودة مهنية ونهج مبتكر.',
          services: 'خدمة ذكاء اصطناعي مهنية',
          online: 'متصل وجاهز',
          languages: 'دعم اللغات',
        },
        services: {
          title: 'خدمات الذكاء الاصطناعي المهنية',
          online: 'متصل وجاهز',
          instant: 'استجابة في أقل من ثانية واحدة',
        },
        features: {
          speed: 'استجابة سريعة',
          speedDesc: 'استجابة في أقل من ثانية واحدة. خوارزميات محسنة وتقنيات سحابية.',
          security: 'الأمان',
          securityDesc: 'تشفير 256 بت وبروتوكولات أمان متقدمة. بياناتك محمية.',
          global: 'دعم عالمي',
          globalDesc: 'التواصل بجميع اللغات الرئيسية في العالم. ترجمة وفهم في الوقت الفعلي.',
        },
        stats: {
          users: 'المستخدمون النشطون',
          messages: 'الرسائل المعالجة',
          uptime: 'الموثوقية',
          rating: 'تقييمات المستخدمين',
          back: 'رجوع',
          pageTitle: 'الإحصائيات',
          personal: 'الإحصائيات الشخصية',
          yourMessages: 'رسائلك',
          usedAIs: 'الذكاء الاصطناعي المستخدم',
          activeDays: 'الأيام النشطة',
          mostUsed: 'الذكاء الاصطناعي الأكثر استخداماً'
        },
        history: {
          title: 'تاريخ المحادثات',
          back: 'رجوع',
          clearAll: 'مسح الكل',
          messages: 'رسائل',
          empty: 'تاريخ المحادثات فارغ',
          emptyDesc: 'لا توجد محادثات بعد. ابدأ المحادثة مع الذكاء الاصطناعي!',
          confirmDelete: 'هل أنت متأكد من حذف هذه المحادثة؟',
          confirmClearAll: 'هل أنت متأكد من مسح جميع المحادثات؟'
        },
        cta: {
          title: 'تطوير تقنيات الذكاء الاصطناعي في أوزبكستان',
          subtitle: 'هدفنا هو تبسيط الحياة من خلال الذكاء الاصطناعي وخلق فرص جديدة',
        },
        footer: {
          description: 'منصة خدمات الذكاء الاصطناعي المهنية. نصنع المستقبل بالذكاء الاصطناعي.',
          services: {
            title: 'الخدمات',
            chat: 'دردشة AI',
            translate: 'المترجم',
            code: 'البرمجة',
            business: 'الأعمال',
          },
          support: {
            title: 'الدعم',
            help: 'مركز المساعدة',
            docs: 'التوثيق',
            api: 'API',
            status: 'الحالة',
          },
          contact: {
            title: 'الاتصال',
            address: 'مدرسة سمرقند-٢١',
          },
          rights: 'جميع الحقوق محفوظة.',
          privacy: 'الخصوصية',
          terms: 'الشروط',
          cookies: 'ملفات تعريف الارتباط',
        },
        chat: {
          back: 'رجوع',
          online: 'متصل وجاهز',
          placeholder: 'اكتب سؤالك...',
          save: 'حفظ',
          clear: 'مسح',
          edit: 'تحرير',
          delete: 'حذف'
        },
        loading: 'جاري التحميل...',
        notifications: {
          chatSaved: 'تم حفظ المحادثة',
          chatDeleted: 'تم حذف المحادثة',
          messageDeleted: 'تم حذف الرسالة',
          error: 'حدث خطأ',
          historyCleared: 'تم مسح جميع المحادثات'
        }
      },
    });

    const aiServices = reactive([
      {
        id: 1,
        emoji: '💬',
        name: {
          uz: 'Chat AI',
          en: 'Chat AI',
          ru: 'Chat AI',
          ar: 'دردشة AI',
        },
        description: {
          uz: 'Umumiy savollar va har kunlik yordamchi. Har qanday mavzuda suhbatlashing.',
          en: 'General questions and daily assistant. Chat about any topic.',
          ru: 'Общие вопросы и ежедневный помощник. Общайтесь на любые темы.',
          ar: 'أسئلة عامة ومساعد يومي. تحدث حول أي موضوع.',
        },
      },
      {
        id: 2,
        emoji: '🌐',
        name: {
          uz: 'Tarjimon AI',
          en: 'Translator AI',
          ru: 'Переводчик AI',
          ar: 'مترجم AI',
        },
        description: {
          uz: '100+ tilga professional tarjima. Ovozli va matnli tarjima imkoniyati.',
          en: 'Professional translation to 100+ languages. Voice and text translation.',
          ru: 'Профессиональный перевод на 100+ языков. Голосовой и текстовый перевод.',
          ar: 'ترجمة مهنية إلى أكثر من 100 لغة. ترجمة صوتية ونصية.',
        },
      },
      {
        id: 3,
        emoji: '🚀',
        name: {
          uz: 'Blockchain AI',
          en: 'Blockchain AI',
          ru: 'Blockchain AI',
          ar: 'بلوك تشين AI',
        },
        description: {
          uz: "Blockchain va kripto texnologiyalar bo'yicha maslahatchi. Kelajak moliya dunyosi.",
          en: 'Advisor on blockchain and crypto technologies. Future of finance.',
          ru: 'Консультант по блокчейн и крипто технологиям. Будущее финансов.',
          ar: 'مستشار في تقنيات البلوك تشين والعملات المشفرة. مستقبل المال.',
        },
      },
      {
        id: 4,
        emoji: '🧧',
        name: {
          uz: 'AI Tadqiqot',
          en: 'AI Research',
          ru: 'AI Исследования',
          ar: 'بحوث AI',
        },
        description: {
          uz: "Sun'iy intellekt tadqiqotlari va innovatsion yechimlar. Kelajak texnologiyalari.",
          en: 'AI research and innovative solutions. Future technologies.',
          ru: 'Исследования ИИ и инновационные решения. Технологии будущего.',
          ar: 'أبحاث الذكاء الاصطناعي والحلول المبتكرة. تقنيات المستقبل.',
        },
      },
      {
        id: 5,
        emoji: '⚡',
        name: {
          uz: 'Smart Energy AI',
          en: 'Smart Energy AI',
          ru: 'Smart Energy AI',
          ar: 'طاقة ذكية AI',
        },
        description: {
          uz: "Aqlli energiya tizimlari va yashil texnologiyalar bo'yicha mutaxassis.",
          en: 'Specialist in smart energy systems and green technologies.',
          ru: 'Специалист по умным энергосистемам и зеленым технологиям.',
          ar: 'متخصص في أنظمة الطاقة الذكية والتقنيات الخضراء.',
        },
      },
      {
        id: 6,
        emoji: '💻',
        name: {
          uz: 'Dasturlash AI',
          en: 'Programming AI',
          ru: 'Программирование AI',
          ar: 'برمجة AI',
        },
        description: {
          uz: 'Dasturlash yordamchisi va kod yozuvchi. Har qanday tilda dasturlang.',
          en: 'Programming assistant and code writer. Program in any language.',
          ru: 'Помощник по программированию и писатель кода. Программируйте на любом языке.',
          ar: 'مساعد البرمجة وكاتب الكود. برمج بأي لغة.',
        },
      },
      {
        id: 7,
        emoji: '🏥',
        name: {
          uz: 'Tibbiy AI',
          en: 'Medical AI',
          ru: 'Медицинский AI',
          ar: 'طبي AI',
        },
        description: {
          uz: "Sog'liq maslahatchi va tibbiy ma'lumotlar. Profilaktika va yordam.",
          en: 'Health advisor and medical information. Prevention and assistance.',
          ru: 'Консультант по здоровью и медицинская информация. Профилактика и помощь.',
          ar: 'مستشار صحي ومعلومات طبية. الوقاية والمساعدة.',
        },
      },
      {
        id: 8,
        emoji: '🎓',
        name: {
          uz: "Ta'lim AI",
          en: 'Education AI',
          ru: 'Образование AI',
          ar: 'تعليم AI',
        },
        description: {
          uz: "O'qituvchi va ta'lim mentori. Har qanday fanni professional o'rganing.",
          en: 'Teacher and education mentor. Learn any subject professionally.',
          ru: 'Учитель и наставник по образованию. Изучайте любой предмет профессионально.',
          ar: 'معلم ومرشد تعليمي. تعلم أي موضوع بشكل احترافي.',
        },
      },
      {
        id: 9,
        emoji: '📈',
        name: {
          uz: 'Biznes AI',
          en: 'Business AI',
          ru: 'Бизнес AI',
          ar: 'أعمال AI',
        },
        description: {
          uz: "Biznes strategiya va rivojlanish maslahatchi. Marketing va moliya bo'yicha yordam.",
          en: 'Business strategy and development advisor. Marketing and finance assistance.',
          ru: 'Советник по бизнес-стратегии и развитию. Помощь в маркетинге и финансах.',
          ar: 'مستشار استراتيجية الأعمال والتطوير. مساعدة في التسويق والمالية.',
        },
      },
      {
        id: 10,
        emoji: '⚖️',
        name: {
          uz: 'Huquq AI',
          en: 'Legal AI',
          ru: 'Юридический AI',
          ar: 'قانوني AI',
        },
        description: {
          uz: "Huquqiy maslahatchi va qonunchilik. Yuridik masalalar bo'yicha yordam.",
          en: 'Legal advisor and legislation. Assistance with legal matters.',
          ru: 'Юридический консультант и законодательство. Помощь в правовых вопросах.',
          ar: 'مستشار قانوني وتشريع. المساعدة في الأمور القانونية.',
        },
      },
      {
        id: 11,
        emoji: '❤️',
        name: {
          uz: 'Psixologik AI',
          en: 'Psychology AI',
          ru: 'Психологический AI',
          ar: 'نفسي AI',
        },
        description: {
          uz: 'Ruhiy salomatlik yordamchisi va psixologik maslahatchi.',
          en: 'Mental health assistant and psychological counselor.',
          ru: 'Помощник по психическому здоровью и психологический консультант.',
          ar: 'مساعد الصحة النفسية والمستشار النفسي.',
        },
      },
      {
        id: 12,
        emoji: '💰',
        name: {
          uz: 'Moliya AI',
          en: 'Finance AI',
          ru: 'Финансы AI',
          ar: 'مالية AI',
        },
        description: {
          uz: 'Moliyaviy maslahatchi va investitsiya yordamchisi. Pul boshqaruvi.',
          en: 'Financial advisor and investment assistant. Money management.',
          ru: 'Финансовый консультант и инвестиционный помощник. Управление деньгами.',
          ar: 'مستشار مالي ومساعد استثماري. إدارة الأموال.',
        },
      },
      {
        id: 13,
        emoji: '✈️',
        name: {
          uz: 'Sayohat AI',
          en: 'Travel AI',
          ru: 'Путешествие AI',
          ar: 'سفر AI',
        },
        description: {
          uz: 'Sayohat rejalashtiruvchi va gid. Eng yaxshi joylarni kashf eting.',
          en: 'Travel planner and guide. Discover the best places.',
          ru: 'Планировщик путешествий и гид. Откройте для себя лучшие места.',
          ar: 'مخطط السفر والدليل. اكتشف أفضل الأماكن.',
        },
      },
      {
        id: 14,
        emoji: '🍳',
        name: {
          uz: 'Oshpazlik AI',
          en: 'Cooking AI',
          ru: 'Кулинария AI',
          ar: 'طبخ AI',
        },
        description: {
          uz: 'Retseptlar va oshpazlik sirlari. Mazali taomlar pishiring.',
          en: 'Recipes and cooking secrets. Cook delicious meals.',
          ru: 'Рецепты и кулинарные секреты. Готовьте вкусные блюда.',
          ar: 'وصفات وأسرار الطبخ. اطبخ وجبات لذيذة.',
        },
      },
      {
        id: 15,
        emoji: '🎨',
        name: {
          uz: 'Ijod AI',
          en: 'Creative AI',
          ru: 'Творческий AI',
          ar: 'إبداعي AI',
        },
        description: {
          uz: "Ijod va san'at yordamchisi. Go'zallik yarating va ilhom oling.",
          en: 'Creativity and art assistant. Create beauty and get inspired.',
          ru: 'Помощник по творчеству и искусству. Создавайте красоту и вдохновляйтесь.',
          ar: 'مساعد الإبداع والفن. اخلق الجمال واحصل على الإلهام.',
        },
      },
      {
        id: 16,
        emoji: '🎵',
        name: {
          uz: 'Musiqa AI',
          en: 'Music AI',
          ru: 'Музыка AI',
          ar: 'موسيقى AI',
        },
        description: {
          uz: "Musiqa yaratish va tahlil. Melodiya va ritm ustasi bo'ling.",
          en: 'Music creation and analysis. Become a melody and rhythm master.',
          ru: 'Создание и анализ музыки. Станьте мастером мелодии и ритма.',
          ar: 'إنتاج وتحليل الموسيقى. كن سيد اللحن والإيقاع.',
        },
      },
      {
        id: 17,
        emoji: '💪',
        name: {
          uz: 'Sport AI',
          en: 'Sports AI',
          ru: 'Спорт AI',
          ar: 'رياضة AI',
        },
        description: {
          uz: "Sport maslahatchi va fitness yordamchisi. Sog'lom bo'ling!",
          en: 'Sports advisor and fitness assistant. Stay healthy!',
          ru: 'Спортивный консультант и фитнес-помощник. Будьте здоровы!',
          ar: 'مستشار رياضي ومساعد لياقة بدنية. ابق بصحة جيدة!',
        },
      },
      {
        id: 18,
        emoji: '🌤️',
        name: {
          uz: 'Ob-havo AI',
          en: 'Weather AI',
          ru: 'Погода AI',
          ar: 'طقس AI',
        },
        description: {
          uz: "Ob-havo prognozi va iqlim ma'lumotlari. Har doim tayyor bo'ling!",
          en: 'Weather forecast and climate information. Always be prepared!',
          ru: 'Прогноз погоды и климатическая информация. Всегда будьте готовы!',
          ar: 'توقعات الطقس ومعلومات المناخ. كن دائماً مستعداً!',
        },
      },
      {
        id: 19,
        emoji: '📰',
        name: {
          uz: 'Yangiliklar AI',
          en: 'News AI',
          ru: 'Новости AI',
          ar: 'أخبار AI',
        },
        description: {
          uz: "Yangiliklar tahlilchisi va ma'lumot beruvchi. Dunyodan xabardor bo'ling!",
          en: 'News analyst and informant. Stay informed about the world!',
          ru: 'Аналитик новостей и информатор. Будьте в курсе событий в мире!',
          ar: 'محلل الأخبار والمخبر. ابق على اطلاع بالعالم!',
        },
      },
      {
        id: 20,
        emoji: '🧮',
        name: {
          uz: 'Matematik AI',
          en: 'Mathematics AI',
          ru: 'Математика AI',
          ar: 'رياضيات AI',
        },
        description: {
          uz: "Matematik masalalar yechuvchi va formula ustasi. Hisoblang va o'rganing!",
          en: 'Mathematical problem solver and formula master. Calculate and learn!',
          ru: 'Решатель математических задач и мастер формул. Вычисляйте и учитесь!',
          ar: 'حلال المسائل الرياضية وسيد الصيغ. احسب وتعلم!',
        },
      },
      {
        id: 21,
        emoji: '🔬',
        name: {
          uz: 'Fan AI',
          en: 'Science AI',
          ru: 'Наука AI',
          ar: 'علوم AI',
        },
        description: {
          uz: "Kimyo, fizika, biologiya bo'yicha mutaxassis. Ilmni o'rganing!",
          en: 'Specialist in chemistry, physics, biology. Learn science!',
          ru: 'Специалист по химии, физике, биологии. Изучайте науку!',
          ar: 'متخصص في الكيمياء والفيزياء والأحياء. تعلم العلوم!',
        },
      },
      {
        id: 22,
        emoji: '🎤',
        name: {
          uz: 'Ovozli AI',
          en: 'Voice AI',
          ru: 'Голосовой AI',
          ar: 'صوتي AI',
        },
        description: {
          uz: 'Ovoz bilan muloqot va nutq sintezi. Real vaqtda suhbatlashing.',
          en: 'Voice communication and speech synthesis. Chat in real time.',
          ru: 'Голосовое общение и синтез речи. Общайтесь в реальном времени.',
          ar: 'التواصل الصوتي وتخليق الكلام. تحدث في الوقت الفعلي.',
        },
      },
      {
        id: 23,
        emoji: '🏗️',
        name: {
          uz: 'Arxitektura AI',
          en: 'Architecture AI',
          ru: 'Архитектура AI',
          ar: 'هندسة معمارية AI',
        },
        description: {
          uz: 'Bino loyihalash va arxitektura maslahatchi. Chiroyli binolar yarating.',
          en: 'Building design and architecture advisor. Create beautiful buildings.',
          ru: 'Проектирование зданий и архитектурный консультант. Создавайте красивые здания.',
          ar: 'تصميم المباني ومستشار العمارة. أنشئ مباني جميلة.',
        },
      },
      {
        id: 24,
        emoji: '🌿',
        name: {
          uz: 'Ekologiya AI',
          en: 'Ecology AI',
          ru: 'Экология AI',
          ar: 'بيئة AI',
        },
        description: {
          uz: 'Atrof-muhit va ekologik maslahatchi. Tabiatni asrang.',
          en: 'Environment and ecological advisor. Protect nature.',
          ru: 'Консультант по окружающей среде и экологии. Защищайте природу.',
          ar: 'مستشار البيئة والإيكولوجيا. احم الطبيعة.',
        },
      },
      {
        id: 25,
        emoji: '🎮',
        name: {
          uz: "O'yin AI",
          en: 'Gaming AI',
          ru: 'Игровой AI',
          ar: 'ألعاب AI',
        },
        description: {
          uz: "O'yin rivojlantirish va gaming maslahatchi. O'yinlar yarating.",
          en: 'Game development and gaming advisor. Create games.',
          ru: 'Разработка игр и игровой консультант. Создавайте игры.',
          ar: 'تطوير الألعاب ومستشار الألعاب. أنشئ الألعاب.',
        },
      },
    ]);

     // Computed properties
    const t = computed(() => translations[currentLang.value] || translations.uz);

    const sortedAIUsage = computed(() => {
      if (!aiUsageStats.value || typeof aiUsageStats.value !== 'object') {
        return [];
      }
      
      return Object.entries(aiUsageStats.value)
        .map(([ai_id, count]) => ({ 
          ai_id: parseInt(ai_id), 
          count: typeof count === 'number' ? count : 0 
        }))
        .filter(item => !isNaN(item.ai_id) && item.count > 0)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    });

    // HATO 1: Google Auth - xavfsiz inicializatsiya
    const initializeGoogleAuth = () => {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      
      if (!clientId) {
        console.error('VITE_GOOGLE_CLIENT_ID environment variable is missing');
        return;
      }
      
      if (!window.google?.accounts?.id) {
        console.error('Google Identity Services library not loaded');
        return;
      }
      
      try {
        // Eski konfiguratsiyani tozalash
        if (window.google.accounts.id.cancel) {
          window.google.accounts.id.cancel();
        }
        
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
          use_fedcm_for_prompt: false
        });

        // Button render qilish
        const buttonElement = document.getElementById('google-signin-button');
        if (buttonElement) {
          buttonElement.innerHTML = '';
          
          window.google.accounts.id.renderButton(buttonElement, {
            theme: darkMode.value ? 'filled_black' : 'outline',
            size: 'large',
            type: 'standard',
            shape: 'rectangular',
            text: 'signin_with',
            logo_alignment: 'left',
            width: 250
          });
        }
      } catch (error) {
        console.error('Google Auth initialization failed:', error);
      }
    };


   // HATO 2: Credential Response Handler - to'liq xavfsiz
    const handleCredentialResponse = async (response) => {
      try {
        if (!response?.credential) {
          throw new Error('Invalid Google response');
        }
        
        loading.value = true;
        
        // JWT tokenni xavfsiz decode qilish
        const parts = response.credential.split('.');
        if (parts.length !== 3) {
          throw new Error('Invalid JWT format');
        }
        
        const payload = JSON.parse(atob(parts[1]));
        
        if (!payload.email || !payload.name || !payload.sub) {
          throw new Error('Incomplete Google profile data');
        }
        
        // Backend'ga yuborish - TO'G'RILASH: localhost o'rniga API_BASE_URL
        const authResponse = await axios.post(`${API_BASE_URL}/api/auth/google`, {
          email: payload.email,
          name: payload.name,
          picture: payload.picture || '',
          google_id: payload.sub
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000 // 10 soniya timeout
        });

        // Response parsing - xavfsiz usul
        if (authResponse.data) {
          let userData = null;
          
          if (typeof authResponse.data === 'string') {
            const parts = authResponse.data.split('|');
            if (parts.length >= 2 && parts[0] === 'success') {
              userData = JSON.parse(parts[1]);
            }
          } else if (authResponse.data.success && authResponse.data.user) {
            userData = authResponse.data.user;
          }
          
          if (userData) {
            user.value = {
              id: userData.id,
              google_id: userData.google_id,
              email: userData.email,
              name: userData.name,
              picture: userData.picture || ''
            };
            
            localStorage.setItem('user', JSON.stringify(user.value));
            await loadUserData();
            showNotification('Muvaffaqiyatli kirdingiz!', 'success');
          } else {
            throw new Error('Server response format error');
          }
        }
        
      } catch (error) {
        console.error('Google auth error:', error);
        
        let errorMsg = 'Kirish xatoligi yuz berdi';
        if (error.response?.data?.message) {
          errorMsg = error.response.data.message;
        } else if (error.message.includes('timeout')) {
          errorMsg = 'Server javob bermadi, qayta urinib ko\'ring';
        }
        
        showNotification(errorMsg, 'error');
      } finally {
        loading.value = false;
      }
    };

    const signInWithGoogle = () => {
  try {
    if (!window.google?.accounts?.id) {
      console.error('Google Identity Services not available');
      showNotification('Google Auth xizmati mavjud emas', 'error');
      return;
    }
    
    window.google.accounts.id.prompt();
  } catch (error) {
    console.error('Sign in error:', error);
    showNotification('Kirish jarayonida xatolik', 'error');
  }
};

    const signOut = () => {
      user.value = null;
      selectedAI.value = null;
      messages.value = [];
      chatHistory.value = [];
      showingHistory.value = false;
      showingStats.value = false;
      localStorage.removeItem('user');
      window.google?.accounts.id.disableAutoSelect();
    };

const loadUserData = async () => {
  if (!user.value?.id) return;

  try {
    loading.value = true;
    
    const requests = [
      axios.get(`${API_BASE_URL}/api/chats/user/${user.value.id}`, { 
        timeout: 10000 
      }),
      
      axios.get(`${API_BASE_URL}/api/stats/user/${user.value.id}`, { 
        timeout: 10000 
      })
    ];

    const [historyResponse, statsResponse] = await Promise.allSettled(requests);

    console.log('Ma\'lumotlar yuklanmoqda, user ID:', user.value.id);

    // Chat history parsing - BUTUNLAY YANGILANGAN
    if (historyResponse.status === 'fulfilled' && historyResponse.value?.data) {
      console.log('History response data:', historyResponse.value.data);
      
      let historyData = [];
      const responseData = historyResponse.value.data;
      
      if (typeof responseData === 'string') {
        const trimmed = responseData.trim();
        
        if (trimmed.startsWith('success|') && !trimmed.includes('no_chats')) {
          // success| ni olib tashlash
          let dataString = trimmed.substring(8);
          
          // Oxirgi qismni tozalash (agar "Chats retrieved" kabi xabar bo'lsa)
          const lastPipeIndex = dataString.lastIndexOf('|');
          if (lastPipeIndex > 0) {
            const possibleMessage = dataString.substring(lastPipeIndex + 1);
            if (possibleMessage.includes('retrieved') || possibleMessage.includes('Chats')) {
              dataString = dataString.substring(0, lastPipeIndex);
            }
          }
          
          console.log('Tozalangan data:', dataString);

          // Chat ma'lumotlarini parse qilish
          const lines = dataString.split('\n').filter(line => line.trim());
          const chatEntries = [];

          console.log('Chat lines:', lines);

          lines.forEach((line, lineIndex) => {
            const parts = line.split('|').filter(part => part.trim());
            console.log(`Line ${lineIndex}:`, parts);
            
            // Har bir line uchun kamida 5 ta element kerak
            if (parts.length >= 5) {
              const chatId = parts[0]?.trim();
              const aiType = parts[1]?.trim();
              const title = parts[2]?.trim();
              const createdAt = parts[3]?.trim();
              const updatedAt = parts[4]?.trim();
              
              // UUID format tekshirish
              if (chatId && chatId.length >= 32 && chatId.includes('-') && aiType && title) {
                const aiTypeToId = {
                  'chat': 1, 'tarjimon': 2, 'blockchain': 3, 'tadqiqot': 4,
                  'smart_energy': 5, 'dasturlash': 6, 'tibbiy': 7, 'talim': 8,
                  'biznes': 9, 'huquq': 10, 'psixologik': 11, 'moliya': 12,
                  'sayohat': 13, 'oshpazlik': 14, 'ijod': 15, 'musiqa': 16,
                  'sport': 17, 'obhavo': 18, 'yangiliklar': 19, 'matematik': 20,
                  'fan': 21, 'ovozli': 22, 'arxitektura': 23, 'ekologiya': 24,
                  'oyun': 25
                };
                
                // Vaqtni to'g'ri parse qilish
                const parseServerTime = (timeStr) => {
  if (!timeStr || timeStr === 'null' || timeStr === 'undefined') {
    return new Date();
  }
  
  try {
    let cleanTime = timeStr.trim();
    
    // Microseconds ni olib tashlash
    if (cleanTime.includes('.')) {
      cleanTime = cleanTime.split('.')[0];
    }
    
    // Server UTC vaqtini yuboradi, shuning uchun to'g'ri parse qilish
    const serverDate = new Date(cleanTime + ' UTC'); // UTC deb belgilash
    
    // Agar date invalid bo'lsa
    if (isNaN(serverDate.getTime())) {
      console.warn('Invalid server time:', timeStr);
      return new Date();
    }
    
    return serverDate;
    
  } catch (error) {
    console.error('Time parse error:', error);
    return new Date();
  }
};
                
                const chat = {
                  id: chatId,
                  ai_type: aiType,
                  ai_id: aiTypeToId[aiType] || 1,
                  title: title,
                  created_at: parseServerTime(createdAt),
                  updated_at: parseServerTime(updatedAt)
                };
                
                chatEntries.push(chat);
                console.log('Chat topildi:', chat);
              }
            }
          });

          historyData = chatEntries;
        }
      } else if (Array.isArray(responseData)) {
        historyData = responseData;
      }
      
      console.log('Final history data:', historyData);
      
      if (historyData.length > 0) {
        chatHistory.value = historyData.map(chat => ({
          ...chat,
          ai_name: getAIById(chat.ai_id)?.name || { 
            uz: 'Chat AI', 
            en: 'Chat AI', 
            ru: 'Chat AI', 
            ar: 'دردشة AI' 
          }
        })).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        
        console.log('Chat history yuklandi:', chatHistory.value.length, 'ta suhbat');
      } else {
        chatHistory.value = [];
        console.log('Chat history bo\'sh');
      }
    } else {
      chatHistory.value = [];
      console.log('History response xatosi yoki bo\'sh');
    }

    // Stats parsing - TO'G'RILANGAN
    if (statsResponse.status === 'fulfilled' && statsResponse.value?.data) {
      console.log('Stats response data:', typeof statsResponse.value.data);
      
      let statsData = {};
      if (typeof statsResponse.value.data === 'string') {
        const responseData = statsResponse.value.data.trim();
        
        if (responseData.startsWith('success|')) {
          const parts = responseData.split('|');
          if (parts.length >= 2 && parts[1]) {
            const lines = parts[1].split('\n');
            
            lines.forEach(line => {
              if (line.startsWith('TOTAL_MESSAGES:')) {
                statsData.totalMessages = parseInt(line.split(':')[1]) || 0;
              } else if (line.startsWith('TOTAL_CONVERSATIONS:')) {
                statsData.totalConversations = parseInt(line.split(':')[1]) || 0;
              } else if (line.startsWith('MOST_USED_AI:')) {
                statsData.mostUsedAI = line.split(':')[1] || 'None';
              } else if (line.startsWith('AI_STAT:')) {
                const [_, aiType, count, lastUsed] = line.split('|');
                if (!statsData.aiStats) statsData.aiStats = [];
                statsData.aiStats.push({ 
                  aiType, 
                  usageCount: parseInt(count) || 0, 
                  lastUsed 
                });
              }
            });
          }
        }
      } else if (typeof statsResponse.value.data === 'object') {
        statsData = statsResponse.value.data;
      }
      
      // User stats ni yangilash
      userStats.value = {
        totalMessages: parseInt(statsData.totalMessages) || 0,
        usedAIs: parseInt(statsData.totalConversations) || 0,
        daysActive: statsData.aiStats ? statsData.aiStats.length : 0
      };
      
      // AI usage stats
      if (statsData.aiStats && Array.isArray(statsData.aiStats)) {
        aiUsageStats.value = {};
        statsData.aiStats.forEach(stat => {
          aiUsageStats.value[stat.aiType] = stat.usageCount;
        });
      } else {
        aiUsageStats.value = {};
      }

      console.log('Stats yuklandi:', userStats.value);
      
    } else {
      console.log('Stats yuklashda xatolik yoki ma\'lumot yo\'q');
      userStats.value = { totalMessages: 0, usedAIs: 0, daysActive: 0 };
      aiUsageStats.value = {};
    }

    console.log('Barcha ma\'lumotlar yuklandi');
    
  } catch (error) {
    console.error('Ma\'lumotlarni yuklashda umumiy xatolik:', error);
    
    // Fallback qiymatlar
    userStats.value = { totalMessages: 0, usedAIs: 0, daysActive: 0 };
    aiUsageStats.value = {};
    if (!chatHistory.value) {
      chatHistory.value = [];
    }
  } finally {
    loading.value = false;
  }
};

    // AI interaction methods
    const getServiceCardClass = (aiId) => {
      const colorClasses = {
        1: 'service-card-blue', 2: 'service-card-cyan', 3: 'service-card-pink',
        4: 'service-card-purple', 5: 'service-card-yellow', 6: 'service-card-indigo',
        7: 'service-card-red', 8: 'service-card-green', 9: 'service-card-orange',
        10: 'service-card-gray', 11: 'service-card-rose', 12: 'service-card-emerald',
        13: 'service-card-sky', 14: 'service-card-amber', 15: 'service-card-violet',
        16: 'service-card-teal', 17: 'service-card-lime', 18: 'service-card-slate',
        19: 'service-card-fuchsia', 20: 'service-card-blue', 21: 'service-card-cyan',
        22: 'service-card-pink', 23: 'service-card-purple', 24: 'service-card-green',
        25: 'service-card-indigo',
      };
      return colorClasses[aiId] || 'service-card-blue';
    };

    const getAIThemeClass = (aiId) => {
      if (darkMode.value) {
        return 'theme-dark-universal';
      } else {
        const themes = {
          1: 'theme-chat', 2: 'theme-translator', 3: 'theme-blockchain',
          4: 'theme-research', 5: 'theme-energy', 6: 'theme-programming',
          7: 'theme-medical', 8: 'theme-education', 9: 'theme-business',
          10: 'theme-legal', 11: 'theme-psychology', 12: 'theme-finance',
          13: 'theme-travel', 14: 'theme-cooking', 15: 'theme-creative',
          16: 'theme-music', 17: 'theme-sports', 18: 'theme-weather',
          19: 'theme-news', 20: 'theme-math', 21: 'theme-science',
          22: 'theme-voice', 23: 'theme-architecture', 24: 'theme-ecology',
          25: 'theme-gaming',
        };
        return themes[aiId] || 'theme-default';
      }
    };

  const getAIUsage = (aiId) => {
  // Xavfsiz tekshirish
  if (!aiUsageStats.value || typeof aiUsageStats.value !== 'object') {
    return '';
  }
  
  // aiId mavjudligini tekshirish
  if (!aiId) {
    return '';
  }
  
  const count = aiUsageStats.value[aiId];
  if (typeof count !== 'number' || count === 0) return '';
  if (count < 10) return '🔥';
  if (count < 50) return '🔥🔥';
  return '🔥🔥🔥';
};

    const getAIById = (id) => {
      return aiServices.find(ai => ai.id === id);
    };

    const getUsagePercentage = (count) => {
      const maxCount = Math.max(...Object.values(aiUsageStats.value));
      return maxCount > 0 ? (count / maxCount) * 100 : 0;
    };

    // Theme and language methods
    const toggleTheme = () => {
      darkMode.value = !darkMode.value;
      localStorage.setItem('darkMode', darkMode.value.toString());
    };

    const changeLanguage = () => {
      document.documentElement.setAttribute(
        'dir',
        currentLang.value === 'ar' ? 'rtl' : 'ltr'
      );
      localStorage.setItem('language', currentLang.value);
    };

    // Chat methods
    const openAI = (ai) => {
      selectedAI.value = ai;
      currentChatId.value = null;
      messages.value = [
        {
          id: messageId.value++,
          type: 'ai',
          content: getWelcomeMessage(ai),
          timestamp: new Date(),
        },
      ];
      nextTick(() => {
        scrollToBottom();
        focusInput();
      });
    };

    const closeAI = () => {
      if (messages.value.length > 1) {
        // Agar suhbat mavjud bo'lsa, saqlashni taklif qilish
        if (confirm(t.value.chat.saveBeforeLeave || 'Suhbatni saqlaysizmi?')) {
          saveCurrentChat();
        }
      }
      selectedAI.value = null;
      messages.value = [];
      currentMessage.value = '';
      currentChatId.value = null;
    };

    const getWelcomeMessage = (ai) => {
      const welcomes = {
        uz: `Salom! Men ${ai.name.uz} bo'lib, sizga professional yordam beraman. ${ai.description.uz} Qanday savolingiz bor?`,
        en: `Hello! I'm ${ai.name.en} and I provide professional assistance. ${ai.description.en} What questions do you have?`,
        ru: `Привет! Я ${ai.name.ru} и предоставляю профессиональную помощь. ${ai.description.ru} Какие у вас вопросы?`,
        ar: `مرحباً! أنا ${ai.name.ar} وأقدم المساعدة المهنية. ${ai.description.ar} ما هي أسئلتك؟`,
      };
      return welcomes[currentLang.value];
    };

    // SHIFT+ENTER MUAMMOSINI HAL QILISH
const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    if (event.shiftKey) {
      // Shift+Enter: yangi qator qo'shish
      event.preventDefault();
      const textarea = event.target;
      const cursorPosition = textarea.selectionStart;
      const textBefore = currentMessage.value.substring(0, cursorPosition);
      const textAfter = currentMessage.value.substring(cursorPosition);
      
      currentMessage.value = textBefore + '\n' + textAfter;
      
      // Kursorni to'g'ri joyga qo'yish
      nextTick(() => {
        textarea.selectionStart = textarea.selectionEnd = cursorPosition + 1;
        autoResizeTextarea();
      });
    } else {
      // Faqat Enter: xabar yuborish
      event.preventDefault();
      if (currentMessage.value.trim()) {
        sendMessage();
      }
    }
  }
};

    // 1. sendMessage funksiyasini to'liq almashtiring:
// YAXSHILANGAN sendMessage funksiyasi - input blocking muammosini hal qiladi
const sendMessage = async () => {
  if (!currentMessage.value?.trim() || isTyping.value || !user.value) return;

  const userMessage = {
    id: messageId.value++,
    type: 'user',
    content: currentMessage.value.trim(),
    timestamp: new Date(),
  };

  messages.value.push(userMessage);
  const questionToProcess = currentMessage.value.trim();
  
  // INPUT'NI DARHOL TOZALASH - bu eng muhim qism
  currentMessage.value = '';
  
  // UI cleanup
  if (chatInput.value) {
    chatInput.value.style.height = 'auto';
    // Input'ga fokus qaytarish
    setTimeout(() => {
      if (chatInput.value) {
        chatInput.value.focus();
      }
    }, 100);
  }

  // TYPING holatini o'rnatish (input tozalangandan KEYIN)
  isTyping.value = true;
  scrollToBottom();

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/ai/${selectedAI.value.id}`,
      {
        message: questionToProcess,
        user_id: user.value.id,
        conversation_id: currentChatId.value,
        language: currentLang.value
      },
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text',
        timeout: 120000, // 2 daqiqa (uzun xabarlar uchun)
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );

    let aiResponse = 'Javob olinmadi';
    let conversationId = currentChatId.value;

    if (response?.data) {
      const responseData = response.data.toString().trim();

      if (responseData.includes('|')) {
        const parts = responseData.split('|');
        if (parts.length >= 2) {
          if (parts[0] === 'success' || parts[0] === 'error') {
            aiResponse = parts[1] || 'Javob bo\'sh';
            if (parts[2]) {
              conversationId = parts[2];
            }
          } else {
            aiResponse = responseData;
          }
        }
      } else {
        aiResponse = responseData;
      }
    }

    if (conversationId && conversationId !== currentChatId.value) {
      currentChatId.value = conversationId;
    }

    const aiMessage = {
      id: messageId.value++,
      type: 'ai',
      content: aiResponse,
      timestamp: new Date(),
    };

    messages.value.push(aiMessage);

    // Avtomatik saqlash va statistikani yangilash
    await Promise.all([
      saveCurrentChat(),
      loadUserData() // Statistikani yangilash uchun
    ]);

  } catch (error) {
    console.error('Send message error:', error);

    let errorResponse = 'Xatolik yuz berdi, qayta urinib ko\'ring';

    if (error.code === 'ECONNABORTED') {
      errorResponse = 'So\'rov vaqti tugadi, qayta urinib ko\'ring';
    } else if (error.response?.status === 500) {
      errorResponse = 'Server xatosi, keyinroq urinib ko\'ring';
    } else if (error.response?.data) {
      errorResponse = error.response.data.toString().trim() || errorResponse;
    } else {
      errorResponse = 'CORS yoki tarmoq xatosi: backend sozlamalarini tekshiring';
    }

    messages.value.push({
      id: messageId.value++,
      type: 'ai',
      content: errorResponse,
      timestamp: new Date(),
    });
  } finally {
    // TYPING'ni to'xtatish
    isTyping.value = false;
    scrollToBottom();
    
    // Input'ga qayta fokus qilish
    setTimeout(() => {
      if (chatInput.value) {
        chatInput.value.focus();
      }
    }, 200);
  }
};

const updateStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/stats/user/${user.value.id}`);
    if (response?.data) {
      stats.value = response.data;
    }
  } catch (error) {
    console.error('Statistikani olishda xatolik:', error);
  }
};

const saveCurrentChat = async () => {
  if (!user.value?.id || !selectedAI.value?.id || !messages.value || messages.value.length <= 1) {
    return false;
  }

  try {
    const userMessages = messages.value.filter(msg => msg.type === 'user');
    const firstUserMessage = userMessages[0];
    
    // Timestamp ni server format uchun to'g'rilash
    const formatTimestampForServer = (timestamp) => {
  try {
    if (!timestamp) return new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    let date;
    if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === 'string') {
      date = new Date(timestamp);
    } else {
      date = new Date();
    }
    
    if (isNaN(date.getTime())) {
      date = new Date();
    }
    
    // Server uchun UTC formatda yuborish
    return date.toISOString().slice(0, 19).replace('T', ' ');
    
  } catch (error) {
    console.error('Timestamp format error:', error);
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
};
    
    const chatData = {
      id: currentChatId.value,
      title: firstUserMessage ? 
        (firstUserMessage.content.length > 50 ? 
          firstUserMessage.content.substring(0, 50) + '...' : 
          firstUserMessage.content) : 
        'Yangi suhbat',
      ai_type: selectedAI.value.key || 'chat',
      user_id: user.value.id,
      messages: messages.value
        .filter(msg => !msg.isWelcome) // Welcome message'larni saqlash
        .map(msg => ({
          id: msg.id,
          type: msg.type,
          content: msg.content,
          timestamp: formatTimestampForServer(msg.timestamp),
          edited: msg.edited || false
        }))
    };

    console.log('Chat saqlanmoqda:', {
      chatId: currentChatId.value,
      messagesCount: chatData.messages.length,
      title: chatData.title
    });

    let response;
    
    if (currentChatId.value) {
      // Mavjud chatni yangilash
      response = await axios.put(
        `${API_BASE_URL}/api/chats/${currentChatId.value}`,
        chatData,
        { 
          timeout: 15000,
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log('Chat yangilandi:', response.data);
    } else {
      // Yangi chat yaratish
      response = await axios.post(
        `${API_BASE_URL}/api/chats`,
        chatData,
        { 
          timeout: 15000,
          headers: { 'Content-Type': 'application/json' }
        }
      );
      
      console.log('Yangi chat yaratildi:', response.data);
      
      // Chat ID ni olish
      if (response.data) {
        if (typeof response.data === 'object' && response.data.id) {
          currentChatId.value = response.data.id;
        } else if (typeof response.data === 'string') {
          const parts = response.data.split('|');
          if (parts.length >= 2 && parts[0] === 'success') {
            try {
              const chatInfo = JSON.parse(parts[1]);
              if (chatInfo.id) {
                currentChatId.value = chatInfo.id;
              }
            } catch (parseError) {
              console.log('Chat ID parse xatosi (e\'tiborga olinmadi):', parseError);
            }
          }
        }
      }
    }

    // Chat history'ni yangilash - TO'G'RILANGAN
    if (currentChatId.value) {
      const savedChat = {
        id: currentChatId.value,
        ai_id: selectedAI.value.id,
        ai_type: selectedAI.value.key || 'chat',
        ai_name: selectedAI.value.name,
        title: chatData.title,
        created_at: new Date(), // Local vaqt
        updated_at: new Date()  // Local vaqt
      };

      const existingIndex = chatHistory.value.findIndex(chat => chat.id === currentChatId.value);
      if (existingIndex >= 0) {
        // Mavjud chatni yangilash - faqat title va updated_at
        chatHistory.value[existingIndex].title = savedChat.title;
        chatHistory.value[existingIndex].updated_at = savedChat.updated_at;
      } else {
        // Yangi chat qo'shish
        chatHistory.value.unshift(savedChat);
      }

      // Vaqt bo'yicha tartiblash
      chatHistory.value.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      
      console.log('Chat history yangilandi, jami:', chatHistory.value.length);
    }

    return true;

  } catch (error) {
    console.error('Chat saqlashda xatolik:', error);
    
    if (error.code === 'ECONNABORTED') {
      console.log('Timeout error - chat mahalliy saqlandi');
    } else if (error.response?.status >= 500) {
      console.log('Server xatosi - chat mahalliy saqlandi');
    }
    
    return false;
  }
};

// 1. clearCurrentChat funksiyasi
const clearCurrentChat = () => {
  if (!selectedAI.value) return;
  
  const confirmText = t.value.history?.confirmDelete || 'Suhbatni tozalashni tasdiqlaysizmi?';
  
  if (confirm(confirmText)) {
    // Welcome message ni saqlash
    const welcomeMessage = {
      id: messageId.value++,
      type: 'ai',
      content: getWelcomeMessage(selectedAI.value),
      timestamp: new Date(),
    };
    
    messages.value = [welcomeMessage];
    currentMessage.value = '';
    currentChatId.value = null;
    
    showNotification(t.value.notifications?.chatCleared || 'Suhbat tozalandi', 'success');
    scrollToBottom();
    focusInput();
  }
};

    // 5. CHAT HISTORY SAHIFASINI KO'RSATISH  
const showChatHistory = async () => {
  showingHistory.value = true;
  showingStats.value = false;
  loading.value = true;
  
  try {
    await loadUserData();
    if (chatHistory.value.length === 0) {
      showNotification('Suhbatlar tarixi bo\'sh', 'info');
    }
  } catch (error) {
    showNotification('Suhbatlar tarixini yuklashda xatolik', 'error');
  } finally {
    loading.value = false;
  }
};

   // 4. STATISTIKA KO'RSATISH - showStats funksiyasini yangilang:
const showStats = async () => {
  showingStats.value = true;
  showingHistory.value = false;
  loading.value = true;
  
  try {
    // Ma'lumotlarni majburiy yangilash
    await loadUserData();
    
    // Statistika mavjudligini tekshirish
    const hasStats = userStats.value.totalMessages > 0 || 
                     Object.keys(aiUsageStats.value).length > 0;
    
    if (!hasStats) {
      showNotification('Hali statistika ma\'lumotlari yo\'q. Biror AI bilan suhbat boshlang!', 'info');
    } else {
      showNotification('Statistika yuklandi', 'success');
    }
    
  } catch (error) {
    console.error('Statistika yuklashda xatolik:', error);
    showNotification('Statistikani yuklashda xatolik yuz berdi', 'error');
  } finally {
    loading.value = false;
  }
};

// TO'G'RILANGAN openHistoryChat funksiyasi
const openHistoryChat = async (chat) => {
  try {
    if (!chat?.id) {
      showNotification('Chat ID topilmadi', 'error');
      return;
    }
    
    loading.value = true;
    console.log(`Chat ${chat.id} ochilmoqda...`);
    
    const aiInfo = getAIById(chat.ai_id || 1);
    if (!aiInfo) {
      showNotification('AI ma\'lumotlari topilmadi', 'error');
      return;
    }
    
    const response = await axios.get(`${API_BASE_URL}/api/chats/${chat.id}`, {
      timeout: 15000,
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Chat data response:', response.data);
    
    let chatMessages = [];
    
    if (response.data && typeof response.data === 'string') {
      // Backend ma'lumotlarini parse qilish
      chatMessages = parseBackendChatData(response.data);
      
      console.log('Parsed messages:', chatMessages.length);
      
      // Agar xabarlar yo'q bo'lsa yoki faqat bitta bo'lsa
      if (chatMessages.length === 0) {
        console.log('No messages found, adding welcome message');
        chatMessages = [{
          id: messageId.value++,
          type: 'ai',
          content: getWelcomeMessage(aiInfo),
          timestamp: new Date(),
          isWelcome: true
        }];
      }
    } else {
      // Fallback - welcome message
      console.log('Invalid response format, using welcome message');
      chatMessages = [{
        id: messageId.value++,
        type: 'ai',
        content: getWelcomeMessage(aiInfo),
        timestamp: new Date(),
        isWelcome: true
      }];
    }
    
    // State o'rnatish
    selectedAI.value = aiInfo;
    currentChatId.value = chat.id;
    messages.value = chatMessages;
    showingHistory.value = false;
    showingStats.value = false;
    
    // UI yangilash
    await nextTick();
    scrollToBottom();
    focusInput();
    
    console.log(`Chat ochildi: ${chatMessages.length} ta xabar yuklandi`);
    
  } catch (error) {
    console.error('Chat ochishda xatolik:', error);
    
    let errorMsg = 'Chat ochishda xatolik yuz berdi';
    if (error.response?.status === 404) {
      errorMsg = 'Chat topilmadi';
    } else if (error.code === 'ECONNABORTED') {
      errorMsg = 'Server javob bermadi, qayta urinib ko\'ring';
    }
    
    showNotification(errorMsg, 'error');
  } finally {
    loading.value = false;
  }
};

   // HATO 7: Clear All History - to'liq error handling
    const clearAllHistory = async () => {
      if (!confirm(t.value.history?.confirmClearAll || 'Barcha suhbatlarni o\'chirishni tasdiqlaysizmi?')) {
        return;
      }

      try {
        loading.value = true;
        
       await axios.delete(
  `${API_BASE_URL}/api/chats/user/${user.value.id}/all`,
          { timeout: 10000 }
        );

        chatHistory.value = [];
        showNotification(t.value.notifications?.historyCleared || 'Barcha suhbatlar o\'chirildi', 'success');
        await loadUserData();
        
      } catch (error) {
        console.error('Error clearing history:', error);
        
        // 404 - normal holat (chatlar yo'q)
        if (error.response?.status === 404) {
          chatHistory.value = [];
          showNotification(t.value.notifications?.historyCleared || 'Suhbat tarixi bo\'sh edi', 'info');
        } else {
          showNotification(t.value.notifications?.error || 'Xatolik yuz berdi', 'error');
        }
      } finally {
        loading.value = false;
      }
    };

    // SIMPLE VERSION - Add this function to your setup() function, after clearAllHistory function

const deleteChat = async (chatId) => {
  if (!confirm(t.value.history?.confirmDelete || 'Suhbatni o\'chirishni tasdiqlaysizmi?')) {
    return;
  }

  try {
    loading.value = true;
    
    await axios.delete(`${API_BASE_URL}/api/chats/${chatId}`);
    
    // Local state'dan o'chirish
    chatHistory.value = chatHistory.value.filter(chat => chat.id !== chatId);
    
    // Agar hozirda ochiq chat o'chirilayotgan bo'lsa
    if (currentChatId.value === chatId) {
      selectedAI.value = null;
      messages.value = [];
      currentChatId.value = null;
    }

    showNotification(t.value.notifications?.chatDeleted || 'Suhbat o\'chirildi', 'success');
    
  } catch (error) {
    console.error('Error deleting chat:', error);
    showNotification('Suhbatni o\'chirishda xatolik', 'error');
  } finally {
    loading.value = false;
  }
};

// 2. TAXRIRLASH VA AI JAVOB BERISHI - editMessage yangilash
const editMessage = async (message) => {
  if (message.type === 'ai') {
    showNotification('AI xabarini tahrirlash mumkin emas', 'warning');
    return;
  }

  const newContent = prompt('Xabarni tahrirlang:', message.content);
  if (!newContent || !newContent.trim() || newContent === message.content) {
    return; // O'zgartirish yo'q
  }

  try {
    loading.value = true;
    
    // 1. Eski xabarni tahrirlash
    const messageIndex = messages.value.findIndex(msg => msg.id === message.id);
    if (messageIndex === -1) {
      showNotification('Xabar topilmadi', 'error');
      return;
    }
    
    // 2. Tahrirlashdan keyingi barcha AI javoblarini o'chirish
    const messagesToRemove = [];
    for (let i = messageIndex + 1; i < messages.value.length; i++) {
      if (messages.value[i].type === 'ai') {
        messagesToRemove.push(i);
      } else {
        break; // Keyingi user message topildi, to'xtatish
      }
    }
    
    // Orqadan boshlab o'chirish (index'lar o'zgarmaslik uchun)
    messagesToRemove.reverse().forEach(index => {
      messages.value.splice(index, 1);
    });
    
    // 3. User xabarini yangilash
    message.content = newContent.trim();
    message.edited = true;
    message.timestamp = new Date(); // Yangi vaqt
    
    showNotification('Xabar tahrirlandi. AI javob bermoqda...', 'info');
    
    // 4. AI ga yangi javob so'rash
    isTyping.value = true;
    await nextTick();
    scrollToBottom();

    const response = await axios.post(
      `${API_BASE_URL}/api/ai/${selectedAI.value.id}`,
      {
        message: message.content,
        user_id: user.value.id,
        conversation_id: currentChatId.value,
        language: currentLang.value
      },
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text',
        timeout: 120000, // 2 daqiqa (uzun xabarlar uchun)
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );

    let aiResponse = 'Javob olinmadi';
    if (response?.data) {
      const responseData = response.data.toString().trim();
      if (responseData.includes('|')) {
        const parts = responseData.split('|');
        if (parts.length >= 2) {
          aiResponse = parts[1] || 'Javob bo\'sh';
        }
      } else {
        aiResponse = responseData;
      }
    }

    // 5. Yangi AI javobini qo'shish
    messages.value.push({
      id: messageId.value++,
      type: 'ai',
      content: aiResponse,
      timestamp: new Date(),
    });

    // 6. Chatni saqlash
    await saveCurrentChat();
    await loadUserData(); // Statistikani yangilash
    
    showNotification('Yangi javob olindi', 'success');

  } catch (error) {
    console.error('Tahrirlashda xatolik:', error);
    showNotification('Tahrirlashda xatolik yuz berdi', 'error');
    
    // Error message qo'shish
    messages.value.push({
      id: messageId.value++,
      type: 'ai',
      content: 'Xatolik yuz berdi, qayta urinib ko\'ring',
      timestamp: new Date(),
    });
  } finally {
    isTyping.value = false;
    scrollToBottom();
    focusInput();
    loading.value = false;
  }
};

// AI XABARINI O'CHIRISH MUAMMOSINI HAL QILISH - deleteMessage yangi versiya
const deleteMessage = async (messageId) => {
  const messageIndex = messages.value.findIndex(msg => msg.id === messageId);
  const messageToDelete = messages.value[messageIndex];
  
  if (!messageToDelete) {
    showNotification('Xabar topilmadi', 'error');
    return;
  }

  console.log('O\'chirishga tayyor xabar:', {
    id: messageToDelete.id,
    type: messageToDelete.type,
    content: messageToDelete.content.substring(0, 50) + '...',
    isWelcome: messageToDelete.isWelcome,
    messageIndex: messageIndex,
    totalMessages: messages.value.length
  });

  // Welcome message tekshiruvi - eng birinchi AI xabari
  const isWelcomeMessage = messageToDelete.type === 'ai' && 
                          (messageIndex === 0 || messageToDelete.isWelcome === true);
  
  if (isWelcomeMessage && messages.value.length > 1) {
    showNotification('Salomlashish xabarini o\'chirib bo\'lmaydi', 'warning');
    return;
  }

  // Agar oxirgi yagona xabar bo'lsa (welcome message dan tashqari)
  if (messages.value.length === 1 && !isWelcomeMessage) {
    showNotification('Oxirgi xabarni o\'chirib bo\'lmaydi', 'warning');
    return;
  }

  // Tasdiqlash dialog
  const isAI = messageToDelete.type === 'ai';
  const confirmText = isAI ? 
    'AI javobini o\'chirishni tasdiqlaysizmi?' : 
    'Sizning xabaringizni o\'chirishni tasdiqlaysizmi?';
  
  if (!confirm(confirmText)) {
    return; // Foydalanuvchi bekor qildi
  }
  
  try {
    console.log(`Xabar o'chirilmoqda: ${messageToDelete.type} - "${messageToDelete.content.substring(0, 30)}..."`);
    
    // Xabarni state'dan o'chirish
    const deletedMessage = messages.value.splice(messageIndex, 1)[0];
    
    console.log('Xabar o\'chirildi, qolgan xabarlar soni:', messages.value.length);
    
    // Agar barcha xabarlar o'chirilgan bo'lsa, welcome message qo'shish
    if (messages.value.length === 0 && selectedAI.value) {
      console.log('Barcha xabarlar o\'chirildi, welcome message qaytarilmoqda');
      messages.value = [{
        id: messageId.value++,
        type: 'ai',
        content: getWelcomeMessage(selectedAI.value),
        timestamp: new Date(),
        isWelcome: true
      }];
    }
    
    // Backend'ga o'zgarishlarni saqlash
    loading.value = true;
    const saveSuccess = await saveCurrentChat();
    
    if (saveSuccess) {
      showNotification(
        `${isAI ? 'AI javobi' : 'Xabaringiz'} muvaffaqiyatli o'chirildi`, 
        'success'
      );
      
      console.log('Xabar muvaffaqiyatli o\'chirildi va saqlandi');
      
      // Statistikani yangilash
      if (user.value?.id) {
        await loadUserData();
        console.log('Statistika yangilandi');
      }
    } else {
      console.log('Saqlashda xatolik, xabar qaytarilmoqda');
      // Rollback - xabarni qaytarish
      messages.value.splice(messageIndex, 0, deletedMessage);
      showNotification('O\'chirishda xatolik yuz berdi, qayta urinib ko\'ring', 'error');
    }
    
    // UI'ni yangilash
    await nextTick();
    scrollToBottom();
    
    // Agar chat input mavjud bo'lsa, fokus qilish
    if (chatInput.value) {
      focusInput();
    }
    
  } catch (error) {
    console.error('deleteMessage da umumiy xatolik:', error);
    showNotification('Xabarni o\'chirishda texnik xatolik yuz berdi', 'error');
    
    // Har qanday xatolik bo'lsa, asl holatni qaytarish
    if (messages.value.length === 0 && selectedAI.value) {
      messages.value = [{
        id: messageId.value++,
        type: 'ai', 
        content: getWelcomeMessage(selectedAI.value),
        timestamp: new Date(),
        isWelcome: true
      }];
    }
  } finally {
    loading.value = false;
  }
};

const parseBackendChatData = (responseData) => {
  try {
    if (!responseData || typeof responseData !== 'string') {
      console.log('Invalid response data:', typeof responseData);
      return [];
    }
    
    const messages = [];
    console.log('Parsing backend data...');
    
    const msgRegex = /MSG:([a-f0-9-]+)\|([^|]*)\|([^|]*)\|([^\n\r]*)/g;
    let match;
    let messageCount = 0;
    
    while ((match = msgRegex.exec(responseData)) !== null) {
      const [fullMatch, msgId, userMessage, aiResponse, timestamp] = match;
      messageCount++;
      
      if (msgId) {
        // TO'G'RI VAQT PARSE QILISH
        let msgTimestamp = new Date();
        
        if (timestamp && timestamp !== 'null' && timestamp.trim()) {
          try {
            let cleanTimestamp = timestamp.trim();
            
            // Microseconds ni olib tashlash
            if (cleanTimestamp.includes('.')) {
              cleanTimestamp = cleanTimestamp.split('.')[0];
            }
            
            // UTC sifatida parse qilish
            msgTimestamp = new Date(cleanTimestamp + ' UTC');
            
            if (isNaN(msgTimestamp.getTime())) {
              msgTimestamp = new Date();
            }
          } catch (timeError) {
            console.warn('Message timestamp parse error:', timeError);
            msgTimestamp = new Date();
          }
        }
        
        // User message qo'shish
        if (userMessage && userMessage.trim() && userMessage !== 'null') {
          messages.push({
            id: `user_${msgId}`,
            type: 'user',
            content: userMessage.trim(),
            timestamp: msgTimestamp
          });
        }
        
        // AI response qo'shish  
        if (aiResponse && aiResponse.trim() && aiResponse !== 'null') {
          messages.push({
            id: `ai_${msgId}`,
            type: 'ai',
            content: aiResponse.trim(),
            timestamp: msgTimestamp
          });
        }
      }
    }
    
    console.log(`Parsed ${messages.length} messages from ${messageCount} MSG blocks`);
    
    // Vaqt bo'yicha tartiblash
    return messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
  } catch (error) {
    console.error('Backend data parse error:', error);
    return [];
  }
};

// QO'SHIMCHA YECHIM: Auto-save ni optimallash

const optimizedSaveCurrentChat = async () => {
  // Agar save jarayonida bo'lsa, kutish
  if (loading.value) {
    return false;
  }
  
  if (!user.value?.id || !selectedAI.value?.id || !messages.value || messages.value.length <= 1) {
    return false;
  }

  // Faqat user xabarlari bo'lgan chatlarni saqlash
  const userMessages = messages.value.filter(msg => msg.type === 'user');
  if (userMessages.length === 0) {
    return false;
  }

  try {
    // Duplicate saqlashdan saqlash
    const currentTime = Date.now();
    if (this.lastSaveTime && (currentTime - this.lastSaveTime) < 2000) {
      return false; // 2 soniya ichida qayta saqlashga ruxsat bermaslik
    }
    this.lastSaveTime = currentTime;
    
    return await saveCurrentChat();
    
  } catch (error) {
    console.error('Optimized save error:', error);
    return false;
  }
};

// DEBUGGING UCHUN: Chat ma'lumotlarini tekshirish

const debugChatData = (chatData, source = 'unknown') => {
  console.log(`=== DEBUG: ${source} ===`);
  console.log('Chat ID:', chatData?.id);
  console.log('AI Type:', chatData?.ai_type);
  console.log('Title:', chatData?.title);
  console.log('Created:', chatData?.created_at);
  console.log('Updated:', chatData?.updated_at);
  console.log('Messages count:', chatData?.messages?.length || 0);
  
  if (chatData?.messages) {
    chatData.messages.forEach((msg, index) => {
      console.log(`Message ${index}:`, {
        id: msg.id,
        type: msg.type,
        content: msg.content?.substring(0, 50) + '...',
        timestamp: msg.timestamp
      });
    });
  }
  console.log('=== END DEBUG ===');
};

// STATE RESET FUNKSIYASI - muammoli holatlarda ishlatish

const resetChatState = () => {
  messages.value = [];
  currentMessage.value = '';
  currentChatId.value = null;
  isTyping.value = false;
  
  if (selectedAI.value) {
    messages.value = [{
      id: messageId.value++,
      type: 'ai',
      content: getWelcomeMessage(selectedAI.value),
      timestamp: new Date(),
      isWelcome: true
    }];
  }
  
  console.log('Chat state reset qilindi');
};

// ERROR RECOVERY FUNKSIYASI

const recoverFromError = async (errorType, originalData = null) => {
  console.log(`Error recovery boshlandi: ${errorType}`);
  
  try {
    switch (errorType) {
      case 'chat_load':
        // Chat yuklanmasa, bo'sh chat ochish
        if (originalData?.aiId) {
          const aiInfo = getAIById(originalData.aiId);
          if (aiInfo) {
            openAI(aiInfo);
          }
        }
        break;
        
      case 'chat_save':
        // Saqlash muvaffaqiyatsiz bo'lsa, local state saqlash
        console.log('Chat local state da saqlandi');
        break;
        
      case 'message_delete':
        // Xabar o'chirishda muammo bo'lsa, qaytarish
        if (originalData?.message && originalData?.index !== undefined) {
          messages.value.splice(originalData.index, 0, originalData.message);
        }
        break;
        
      default:
        // Umumiy reset
        resetChatState();
    }
  } catch (recoveryError) {
    console.error('Recovery error:', recoveryError);
    resetChatState();
  }
};

// YAXSHILANGAN LOADING MANAGEMENT

const loadingManager = {
  activeRequests: new Set(),
  
  start(requestId) {
    this.activeRequests.add(requestId);
    loading.value = true;
  },
  
  end(requestId) {
    this.activeRequests.delete(requestId);
    if (this.activeRequests.size === 0) {
      loading.value = false;
    }
  },
  
  clear() {
    this.activeRequests.clear();
    loading.value = false;
  }
};

// MUAMMOLARNI OLDINI OLISH UCHUN VALIDATION

const validateChatData = (chatData) => {
  const errors = [];
  
  if (!chatData?.id || typeof chatData.id !== 'string') {
    errors.push('Chat ID noto\'g\'ri');
  }
  
  if (!chatData?.title || typeof chatData.title !== 'string') {
    errors.push('Chat title noto\'g\'ri');
  }
  
  if (!chatData?.ai_id || typeof chatData.ai_id !== 'number') {
    errors.push('AI ID noto\'g\'ri');
  }
  
  if (!Array.isArray(chatData?.messages)) {
    errors.push('Messages array noto\'g\'ri');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// IMPROVED MESSAGE VALIDATION

const validateMessage = (message) => {
  if (!message) return false;
  
  return (
    message.id &&
    message.type &&
    ['user', 'ai'].includes(message.type) &&
    message.content &&
    typeof message.content === 'string' &&
    message.content.trim().length > 0
  );
};

// 4. AUTO-SAVE TIZIMI - har 10 soniyada saqlash
const setupAutoSave = () => {
  // Eski interval'ni tozalash
  if (autoSaveInterval.value) {
    clearInterval(autoSaveInterval.value);
  }
};

const formatMessage = (content) => {
  if (!content) return '';
  return content
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>');
};

const formatTime = (timestamp) => {
  if (!timestamp) return '';
  
  try {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    
    if (isNaN(date.getTime())) {
      return '';
    }
    
    // User ning local vaqt zonasida ko'rsatish
    return date.toLocaleTimeString('uz-UZ', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  } catch (error) {
    console.error('Format time error:', error);
    return '';
  }
};

    // HATO 8: Format Date - xavfsiz format
    const formatDate = (dateInput) => {
  try {
    if (!dateInput || dateInput === 'null' || dateInput === 'undefined') {
      return 'Noma\'lum sana';
    }
    
    let date;
    
    if (typeof dateInput === 'string') {
      // Backend format handle qilish
      let cleanDateString = dateInput.trim();
      
      if (cleanDateString.includes('.')) {
        cleanDateString = cleanDateString.split('.')[0];
      }
      
      // UTC sifatida parse qilish
      date = new Date(cleanDateString + ' UTC');
    } else if (dateInput instanceof Date) {
      date = dateInput;
    } else {
      return 'Noma\'lum sana';
    }
    
    if (isNaN(date.getTime())) {
      console.warn('Invalid date detected:', dateInput);
      return 'Noma\'lum sana';
    }
    
    // Hozirgi vaqt (user ning local vaqti)
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // Relative time formatlar
    if (diffMinutes < 1) {
      return 'Hozir';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} daqiqa oldin`;
    } else if (diffHours < 24) {
      return `${diffHours} soat oldin`;
    } else if (diffDays === 1) {
      return 'Kecha';
    } else if (diffDays < 7) {
      return `${diffDays} kun oldin`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} hafta oldin`;
    } else {
      // To'liq sana format (user ning vaqt zonasida)
      return date.toLocaleDateString('uz-UZ', {
        year: 'numeric',
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
  } catch (error) {
    console.error('Date format error:', error);
    return 'Noma\'lum sana';
  }
};

    const scrollToBottom = () => {
      nextTick(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
      });
    };

    const focusInput = () => {
      nextTick(() => {
        if (chatInput.value) {
          chatInput.value.focus();
        }
      });
    };

    // Notification methods
    const showNotification = (message, type = 'info') => {
      notification.message = message;
      notification.type = type;
      notification.show = true;
      
      setTimeout(() => {
        hideNotification();
      }, 3000);
    };

    const hideNotification = () => {
      notification.show = false;
    };

    // Auto-resize textarea
    const autoResizeTextarea = () => {
      if (chatInput.value) {
        chatInput.value.style.height = 'auto';
        chatInput.value.style.height = Math.min(chatInput.value.scrollHeight, 150) + 'px';
      }
    };

    // Watchers
    watch(currentMessage, () => {
      autoResizeTextarea();
    });

    watch(darkMode, () => {
      if (window.google?.accounts?.id) {
        // Google button'ni qayta render qilish
        setTimeout(() => {
          initializeGoogleAuth();
        }, 100);
      }
    });

    onMounted(() => {
  // Saqlangan foydalanuvchini yuklash
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    try {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser && typeof parsedUser === 'object') {
        user.value = parsedUser;
        loadUserData();
      }
    } catch (error) {
      console.error('Error parsing saved user:', error);
      localStorage.removeItem('user');
    }
  }

  changeLanguage();
  
  // Google Auth script'ini yuklash
  const loadGoogleAuth = () => {
    if (window.google?.accounts?.id) {
      setTimeout(initializeGoogleAuth, 100);
    } else {
      const existingScript = document.querySelector('script[src*="accounts.google.com"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => setTimeout(initializeGoogleAuth, 200);
        script.onerror = () => console.error('Google Auth script loading failed');
        document.head.appendChild(script);
      }
    }
  };
  
  loadGoogleAuth();

  // Auto-save interval
  const autoSaveInterval = setInterval(() => {
    if (selectedAI.value && messages.value && messages.value.length > 1) {
      try {
        saveCurrentChat();
      } catch (error) {
        console.log('Auto-save error (ignored):', error);
      }
    }
  }, 30000);
  
  // Cleanup function
  return () => {
    if (autoSaveInterval) {
      clearInterval(autoSaveInterval);
    }
  };
});

    return {
      // State
      user,
      darkMode,
      currentLang,
      selectedAI,
      messages,
      currentMessage,
      isTyping,
      messagesContainer,
      chatInput,
      loading,
      showingHistory,
      showingStats,
      chatHistory,
      currentChatId,
      aiUsageStats,
      userStats,
      totalUsers,
      totalMessages,
      notification,
      loadingManager,
      
      // Computed
      t,
      sortedAIUsage,
      
      
      // Data
      aiServices,
      
      // Methods
      getServiceCardClass,
      getAIThemeClass,
      getAIUsage,
      getAIById,
      getUsagePercentage,
      toggleTheme,
      changeLanguage,
      openAI,
      closeAI,
      sendMessage,
      saveCurrentChat,
      clearCurrentChat,
      showChatHistory,
      showStats,
      openHistoryChat,
      deleteChat,
      clearAllHistory,
      editMessage,
      deleteMessage,
      formatMessage,
      formatTime,
      formatDate,
      signInWithGoogle,
      signOut,
      showNotification,
      hideNotification,
      setupAutoSave,
      parseBackendChatData,
      optimizedSaveCurrentChat,
      recoverFromError,
      validateChatData,
      validateMessage,
      debugChatData,
      updateStats,
      handleKeyPress,
    };
  },
};
</script>

<style scoped>
/* CSS Variables */
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --card-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --card-shadow-hover: 0 20px 40px -10px rgba(102, 126, 234, 0.3);

  /* Light theme colors - STARTUP READY */
  --bg-primary: linear-gradient(135deg, #f0f4ff 0%, #e8f2ff 100%);
  --bg-secondary: linear-gradient(135deg, #fff5f5 0%, #fef7ff 100%);
  --bg-tertiary: linear-gradient(135deg, #f0fff4 0%, #ecfeff 100%);
  --text-primary: #1a202c;
  --text-secondary: #4a5568;
  --text-muted: #718096;
  --border-light: #e2e8f0;
  --border-medium: #cbd5e0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background: var(--bg-primary);
  transition: all 0.3s ease;
  min-height: 100vh;
}

#app.dark {
  --bg-primary: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  --bg-secondary: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  --bg-tertiary: linear-gradient(135deg, #4a5568 0%, #718096 100%);
  --text-primary: #f7fafc;
  --text-secondary: #e2e8f0;
  --text-muted: #a0aec0;
  --border-light: #4a5568;
  --border-medium: #718096;
  --card-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.3),
    0 4px 6px -2px rgba(0, 0, 0, 0.2);
}

/* MAIN PAGE BACKGROUND - Professional Startup Colors */
.main-page {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #f5576c 75%,
    #4facfe 100%
  );
  background-size: 300% 300%;
  animation: gradientFlow 8s ease infinite;
  min-height: 100vh;
}

.dark .main-page {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  background-size: 100% 100%;
  animation: none;
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Service Card Color Classes - 25 DIFFERENT COLORS */
.service-card-blue {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border-left: 5px solid #3b82f6;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
}

.dark .service-card-blue {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-cyan {
  background: linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%);
  border-left: 5px solid #06b6d4;
  box-shadow: 0 8px 32px rgba(6, 182, 212, 0.15);
}

.dark .service-card-cyan {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-pink {
  background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
  border-left: 5px solid #ec4899;
  box-shadow: 0 8px 32px rgba(236, 72, 153, 0.15);
}

.dark .service-card-pink {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-purple {
  background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
  border-left: 5px solid #8b5cf6;
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.15);
}

.dark .service-card-purple {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-yellow {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-left: 5px solid #f59e0b;
  box-shadow: 0 8px 32px rgba(245, 158, 11, 0.15);
}

.dark .service-card-yellow {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-indigo {
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
  border-left: 5px solid #6366f1;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);
}

.dark .service-card-indigo {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-red {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border-left: 5px solid #ef4444;
  box-shadow: 0 8px 32px rgba(239, 68, 68, 0.15);
}

.dark .service-card-red {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-green {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border-left: 5px solid #22c55e;
  box-shadow: 0 8px 32px rgba(34, 197, 94, 0.15);
}

.dark .service-card-green {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-orange {
  background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
  border-left: 5px solid #f97316;
  box-shadow: 0 8px 32px rgba(249, 115, 22, 0.15);
}

.dark .service-card-orange {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-gray {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  border-left: 5px solid #6b7280;
  box-shadow: 0 8px 32px rgba(107, 114, 128, 0.15);
}

.dark .service-card-gray {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-rose {
  background: linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%);
  border-left: 5px solid #f43f5e;
  box-shadow: 0 8px 32px rgba(244, 63, 94, 0.15);
}

.dark .service-card-rose {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-emerald {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  border-left: 5px solid #10b981;
  box-shadow: 0 8px 32px rgba(16, 185, 129, 0.15);
}

.dark .service-card-emerald {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-sky {
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
  border-left: 5px solid #0ea5e9;
  box-shadow: 0 8px 32px rgba(14, 165, 233, 0.15);
}

.dark .service-card-sky {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-amber {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-left: 5px solid #f59e0b;
  box-shadow: 0 8px 32px rgba(245, 158, 11, 0.15);
}

.dark .service-card-amber {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-violet {
  background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
  border-left: 5px solid #8b5cf6;
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.15);
}

.dark .service-card-violet {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-teal {
  background: linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%);
  border-left: 5px solid #14b8a6;
  box-shadow: 0 8px 32px rgba(20, 184, 166, 0.15);
}

.dark .service-card-teal {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-lime {
  background: linear-gradient(135deg, #ecfccb 0%, #d9f99d 100%);
  border-left: 5px solid #84cc16;
  box-shadow: 0 8px 32px rgba(132, 204, 22, 0.15);
}

.dark .service-card-lime {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-slate {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-left: 5px solid #64748b;
  box-shadow: 0 8px 32px rgba(100, 116, 139, 0.15);
}

.dark .service-card-slate {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

.service-card-fuchsia {
  background: linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%);
  border-left: 5px solid #d946ef;
  box-shadow: 0 8px 32px rgba(217, 70, 239, 0.15);
}

.dark .service-card-fuchsia {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  border-left: 5px solid #4a5568;
}

/* Chat Interface Theme Classes - BRIGHT AND CLEAR */
.theme-dark-universal {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%) !important;
}

/* BRIGHT SATURATED COLORS FOR EACH AI */
.theme-chat {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.theme-translator {
  background: linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%);
}

.theme-blockchain {
  background: linear-gradient(135deg, #fc00ff 0%, #00dbde 100%);
}

.theme-research {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.theme-energy {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.theme-programming {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.theme-medical {
  background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
}

.theme-education {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.theme-business {
  background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%);
}

.theme-legal {
  background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
}

.theme-psychology {
  background: linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%);
}

.theme-finance {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.theme-travel {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.theme-cooking {
  background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);
}

.theme-creative {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.theme-music {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.theme-sports {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.theme-weather {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.theme-news {
  background: linear-gradient(135deg, #30cfd0 0%, #91a7ff 100%);
}

.theme-math {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.theme-science {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
}

.theme-voice {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.theme-architecture {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.theme-ecology {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.theme-gaming {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Header */
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 2px solid var(--border-light);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: var(--card-shadow);
}

.dark .header {
  background: rgba(26, 32, 44, 0.95);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-icon {
  font-size: 2.25rem;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lang-select,
.theme-btn {
  padding: 0.75rem 1.25rem;
  border: 2px solid var(--border-light);
  border-radius: 12px;
  background: var(--bg-primary);
  color: var(--text-secondary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--card-shadow);
}

.lang-select:hover,
.theme-btn:hover {
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
  transform: translateY(-2px);
}

.theme-btn {
  font-size: 1.5rem;
  padding: 0.875rem;
}

/* Hero Section */
.hero-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  color: white;
  padding: 5rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.dark .hero-section {
  background: rgba(26, 32, 44, 0.8);
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 1.375rem;
  margin-bottom: 3rem;
  opacity: 0.95;
  line-height: 1.7;
  font-weight: 400;
}

.hero-features {
  display: flex;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
}

.feature-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .feature-item {
  background: rgba(26, 32, 44, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
}

.feature-number {
  display: block;
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.feature-text {
  font-size: 1rem;
  opacity: 0.9;
  font-weight: 500;
}

/* Services Section */
.services-section {
  padding: 5rem 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
}

.dark .services-section {
  background: rgba(26, 32, 44, 0.8);
}

.section-title {
  text-align: center;
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 4rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.dark .section-title {
  color: var(--text-primary);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
}

.service-card {
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: var(--card-shadow);
  cursor: pointer;
  transition: all 0.4s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.service-card:hover {
  transform: translateY(-12px);
  box-shadow: var(--card-shadow-hover);
  border-color: #667eea;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.service-icon {
  font-size: 3.5rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.service-status {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: var(--card-shadow);
}

.service-title {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 1.25rem;
  color: var(--text-primary);
}

.service-description {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1.05rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.response-time {
  color: #667eea;
  font-size: 0.95rem;
  font-weight: 700;
}

.arrow {
  color: #667eea;
  font-size: 1.75rem;
  font-weight: 800;
}

/* Info Section - BRIGHT COLORS */
.info-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.dark .info-section {
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
}

.info-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 24px;
  padding: 3rem;
  text-align: center;
  box-shadow: var(--card-shadow);
  transition: all 0.3s ease;
  border: 2px solid rgba(102, 126, 234, 0.1);
}

.dark .info-card {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  border-color: rgba(255, 255, 255, 0.1);
}

.info-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--card-shadow-hover);
}

.info-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
}

.info-title {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 1.25rem;
  color: var(--text-primary);
}

.info-desc {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 1.05rem;
}

/* Stats Section - BRIGHT COLORS */
.stats-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.dark .stats-section {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem 1.5rem;
  text-align: center;
  box-shadow: var(--card-shadow);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.dark .stat-card {
  background: rgba(26, 32, 44, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--card-shadow-hover);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  color: white;
  display: block;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  font-size: 0.95rem;
}

/* CTA Section */
.cta-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.dark .cta-section {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.cta-subtitle {
  font-size: 1.25rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  line-height: 1.6;
}

.cta-badges {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.dark .badge {
  background: rgba(26, 32, 44, 0.8);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Footer */
.footer {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  padding: 4rem 0 2rem;
}

.dark .footer {
  background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: white;
}

.footer-desc {
  color: #a0aec0;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  font-size: 1.25rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.social-link:hover {
  background: var(--primary-gradient);
  transform: translateY(-2px);
}

.footer-title {
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: #a0aec0;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

.footer-links a:hover {
  color: white;
  padding-left: 0.5rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #a0aec0;
}

.contact-icon {
  font-size: 1.25rem;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-links-bottom {
  display: flex;
  gap: 2rem;
}

.footer-links-bottom a {
  color: #a0aec0;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.footer-links-bottom a:hover {
  color: white;
}

/* Chat Interface - Full Screen */
.chat-interface {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

.chat-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 2px solid var(--border-light);
  box-shadow: var(--card-shadow);
}

.dark .chat-header {
  background: rgba(26, 32, 44, 0.95);
}

.chat-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0;
}

/* FIXED BACK BUTTON - NOW VISIBLE */
.back-button {
  padding: 0.875rem 1.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--card-shadow);
  backdrop-filter: blur(10px);
  font-size: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.back-button:hover {
  transform: translateY(-3px);
  box-shadow: var(--card-shadow-hover);
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  border-color: rgba(255, 255, 255, 0.4);
}

.ai-info {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.ai-avatar {
  font-size: 3.25rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--card-shadow);
  backdrop-filter: blur(10px);
}

.ai-name {
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
}

.ai-status {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  font-weight: 700;
}

.chat-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.chat-controls .lang-select,
.chat-controls .theme-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

/* Chat Body */
.chat-body {
  flex: 1;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  padding: 2.5rem 0;
}

.messages-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.message-wrapper {
  display: flex;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
  animation: fadeInUp 0.4s ease;
}

.message-wrapper.user {
  flex-direction: row-reverse;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-avatar {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  box-shadow: var(--card-shadow);
  border: 3px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.message-wrapper.user .message-avatar {
  background: rgba(255, 255, 255, 0.3);
}

.message-bubble {
  max-width: 75%;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: var(--card-shadow);
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  color: var(--text-primary);
}

.message-wrapper.user .message-bubble {
  background: rgba(255, 255, 255, 0.3);
  color: white;
  border-color: rgba(255, 255, 255, 0.5);
}

.message-content {
  line-height: 1.7;
  word-wrap: break-word;
  font-size: 1.05rem;
}

.message-time {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 0.75rem;
  text-align: right;
  font-weight: 500;
}

.message-wrapper.ai .message-time {
  text-align: left;
}

/* Message bubble arrows */
.message-wrapper.user .message-bubble::before {
  content: '';
  position: absolute;
  top: 25px;
  right: -12px;
  width: 0;
  height: 0;
  border-left: 12px solid rgba(255, 255, 255, 0.3);
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
}

.message-wrapper.ai .message-bubble::before {
  content: '';
  position: absolute;
  top: 25px;
  left: -12px;
  width: 0;
  height: 0;
  border-right: 12px solid rgba(255, 255, 255, 0.95);
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
}

.dark .message-wrapper.ai .message-bubble::before {
  border-right-color: rgba(26, 32, 44, 0.95);
}

.dark .message-wrapper.user .message-bubble::before {
  border-left-color: rgba(255, 255, 255, 0.1);
}

/* Typing Animation */
.typing-animation {
  display: flex;
  gap: 0.375rem;
  padding: 1.5rem 0;
}

.typing-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--text-muted);
  animation: typing 1.6s infinite ease-in-out;
}

.typing-dot:nth-child(1) {
  animation-delay: -0.32s;
}
.typing-dot:nth-child(2) {
  animation-delay: -0.16s;
}
.typing-dot:nth-child(3) {
  animation-delay: 0s;
}

@keyframes typing {
  0%,
  80%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* Chat Footer */
.chat-footer {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  border-top: 2px solid rgba(255, 255, 255, 0.3);
  padding: 2rem 0;
}

.input-wrapper {
  display: flex;
  gap: 1.25rem;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.chat-input {
  flex: 1;
  padding: 1.25rem 2rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-primary);
  font-size: 1.05rem;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: var(--card-shadow);
  backdrop-filter: blur(10px);
}

.chat-input:focus {
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
}

.chat-input::placeholder {
  color: var(--text-muted);
}

.send-button {
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: var(--card-shadow);
  backdrop-filter: blur(10px);
}

.send-button:hover:not(:disabled) {
  transform: scale(1.15);
  box-shadow: var(--card-shadow-hover);
  background: rgba(255, 255, 255, 0.5);
}

.send-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.loading {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Enhanced AI status indicator */
.ai-status::before {
  content: '●';
  color: #4ade80;
  margin-right: 0.5rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Enhanced scrollbar styling */
.chat-body::-webkit-scrollbar {
  width: 8px;
}

.chat-body::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.chat-body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.chat-body::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Dark mode adjustments for themed chat interfaces */
.dark .chat-interface .message-bubble {
  background: rgba(26, 32, 44, 0.95);
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .chat-interface .message-wrapper.user .message-bubble {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.dark .chat-interface .chat-input {
  background: rgba(26, 32, 44, 0.9);
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.2);
}

.dark .chat-interface .chat-input:focus {
  background: rgba(26, 32, 44, 0.95);
  border-color: rgba(255, 255, 255, 0.4);
}

/* Animated gradient backgrounds for themes */
.theme-chat,
.theme-translator,
.theme-blockchain,
.theme-research,
.theme-energy,
.theme-programming,
.theme-medical,
.theme-education,
.theme-business,
.theme-legal,
.theme-psychology,
.theme-finance,
.theme-travel,
.theme-cooking,
.theme-creative,
.theme-music,
.theme-sports,
.theme-weather,
.theme-news,
.theme-math,
.theme-science,
.theme-voice,
.theme-architecture,
.theme-ecology,
.theme-gaming {
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Floating particles effect */
.chat-interface::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="particles" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="white" opacity="0.1"><animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite"/></circle><circle cx="80" cy="40" r="1.5" fill="white" opacity="0.15"><animate attributeName="opacity" values="0.15;0.4;0.15" dur="4s" repeatCount="indefinite"/></circle><circle cx="40" cy="70" r="0.8" fill="white" opacity="0.08"><animate attributeName="opacity" values="0.08;0.25;0.08" dur="5s" repeatCount="indefinite"/></circle></pattern></defs><rect width="100" height="100" fill="url(%23particles)"/></svg>');
  opacity: 0.3;
  pointer-events: none;
  z-index: 1;
}

.chat-interface > * {
  position: relative;
  z-index: 2;
}

/* Enhanced glassmorphism effects */
.chat-interface .message-bubble,
.chat-interface .chat-input,
.chat-interface .send-button,
.chat-interface .back-button,
.chat-interface .ai-avatar {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Professional hover effects */
.chat-interface .message-bubble:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.chat-interface .send-button:hover:not(:disabled) {
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2);
}

.chat-interface .back-button:hover {
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-features {
    gap: 1.5rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .service-card {
    padding: 2rem;
  }

  .chat-nav {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .ai-info {
    order: 1;
    width: 100%;
    justify-content: center;
  }

  .message-bubble {
    max-width: 90%;
  }

  .input-wrapper {
    padding: 0 1rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .back-button {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .hero-features {
    flex-direction: column;
    gap: 1rem;
  }

  .service-icon {
    font-size: 3rem;
    padding: 1rem;
  }

  .service-title {
    font-size: 1.5rem;
  }

  .ai-avatar {
    font-size: 2.5rem;
    padding: 1rem;
  }

  .ai-name {
    font-size: 1.5rem;
  }

  .back-button {
    padding: 0.7rem 1.2rem;
    font-size: 0.85rem;
  }
}

/* RTL Support */
[dir='rtl'] .message-wrapper.user {
  flex-direction: row;
}

[dir='rtl'] .message-wrapper.ai {
  flex-direction: row-reverse;
}

[dir='rtl'] .message-wrapper.user .message-bubble::before {
  right: auto;
  left: -12px;
  border-left: none;
  border-right: 12px solid;
  border-right-color: inherit;
}

[dir='rtl'] .message-wrapper.ai .message-bubble::before {
  left: auto;
  right: -12px;
  border-right: none;
  border-left: 12px solid;
  border-left-color: inherit;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus styles for keyboard navigation */
.service-card:focus,
.back-button:focus,
.send-button:focus,
.chat-input:focus,
.lang-select:focus,
.theme-btn:focus {
  outline: 3px solid #667eea;
  outline-offset: 3px;
}

/* Enhanced button states */
.lang-select:active,
.theme-btn:active {
  transform: scale(0.98);
}

.service-card:active {
  transform: translateY(-8px) scale(0.98);
}

.back-button:active {
  transform: translateY(-1px) scale(0.98);
}

/* Smooth transitions for theme changes */
.chat-interface,
.chat-interface * {
  transition: all 0.3s ease;
}

/* Professional loading states */
.send-button.loading {
  pointer-events: none;
}

.send-button .loading {
  transform-origin: center;
}

/* Startup Ready Enhancements */
.main-page {
  position: relative;
  overflow: hidden;
}

.main-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
  opacity: 0.5;
  pointer-events: none;
}

.hero-section {
  position: relative;
  z-index: 1;
}

.services-section {
  position: relative;
  z-index: 1;
}

.info-section {
  position: relative;
  z-index: 1;
}

.stats-section {
  position: relative;
  z-index: 1;
}

.cta-section {
  position: relative;
  z-index: 1;
}

/* Professional animations */
.service-card {
  transform: translateY(0);
  will-change: transform;
}

.service-card:hover {
  will-change: transform;
}

.message-wrapper {
  will-change: transform, opacity;
}

/* Enhanced performance */
.chat-interface {
  will-change: transform;
}

.main-page {
  will-change: background-position;
}

/* Modern scrollbar for main content */
body::-webkit-scrollbar {
  width: 8px;
}

body::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

body::-webkit-scrollbar-thumb {
  background: rgba(102, 126, 234, 0.5);
  border-radius: 4px;
}

body::-webkit-scrollbar-thumb:hover {
  background: rgba(102, 126, 234, 0.8);
}

/* Final Professional Touches */
.logo {
  cursor: pointer;
  transition: all 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.service-card {
  border: 2px solid transparent;
  background-clip: padding-box;
}

.hero-section,
.services-section,
.info-section,
.stats-section,
.cta-section {
  position: relative;
  isolation: isolate;
}

/* Print styles */
@media print {
  .chat-interface {
    display: none;
  }

  .main-page {
    background: white !important;
  }

  .service-card {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .service-card {
    border: 3px solid currentColor;
  }

  .message-bubble {
    border: 2px solid currentColor;
  }
}

/* Startup professional final polish */
.hero-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.5),
    transparent
  );
}

.services-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(102, 126, 234, 0.3),
    transparent
  );
}

/* Additional theme brightness improvements */
.theme-chat {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 1;
}

.theme-translator {
  background: linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%);
  opacity: 1;
}

.theme-blockchain {
  background: linear-gradient(135deg, #fc00ff 0%, #00dbde 100%);
  opacity: 1;
}

.theme-medical {
  background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
  opacity: 1;
}

.theme-sports {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  opacity: 1;
}

.theme-weather {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  opacity: 1;
}

.theme-news {
  background: linear-gradient(135deg, #30cfd0 0%, #91a7ff 100%);
  opacity: 1;
}

/* Ensure all themes are bright and visible */
.chat-interface[class*='theme-'] {
  opacity: 1 !important;
}

.chat-interface[class*='theme-'] .chat-body {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
}

.dark .chat-interface[class*='theme-'] .chat-body {
  background: rgba(0, 0, 0, 0.3);
}

.main-page {
  min-height: 100vh;
  width: 100%;
  background: white;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  color: black;
  overflow-x: hidden;
}

:deep(html), :deep(body), :deep(#app) {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(to bottom right, #fef3f3, #ffe6e6); /* bu sening orqa fon rang dizayning */
  background-size: cover;
  background-repeat: no-repeat;
}

/* Bu sahifalarga beriladi */
.main-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: transparent; /* Orqa fon parentdan oladi */
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact; /* Standart nomi (modern brauzerlar uchun) */
}
</style>
