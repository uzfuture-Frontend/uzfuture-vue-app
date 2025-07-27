<template>
  <div id="app" :class="{ dark: darkMode }">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <nav class="navbar">
          <div class="nav-brand">
            <div class="logo">
              <span class="logo-icon">🤖</span>
              <span class="logo-text">AI Universe</span>
            </div>
          </div>
          <div class="nav-actions">
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
        </nav>
      </div>
    </header>

    <!-- Main Page -->
    <main v-if="!selectedAI" class="main-page">
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
              <div class="stat-number">10,000+</div>
              <div class="stat-label">{{ t.stats.users }}</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">500,000+</div>
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
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer v-if="!selectedAI" class="footer">
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
              <li>
                <a href="#">{{ t.footer.services.chat }}</a>
              </li>
              <li>
                <a href="#">{{ t.footer.services.translate }}</a>
              </li>
              <li>
                <a href="#">{{ t.footer.services.code }}</a>
              </li>
              <li>
                <a href="#">{{ t.footer.services.business }}</a>
              </li>
            </ul>
          </div>

          <div class="footer-section">
            <h4 class="footer-title">{{ t.footer.support.title }}</h4>
            <ul class="footer-links">
              <li>
                <a href="#">{{ t.footer.support.help }}</a>
              </li>
              <li>
                <a href="#">{{ t.footer.support.docs }}</a>
              </li>
              <li>
                <a href="#">{{ t.footer.support.api }}</a>
              </li>
              <li>
                <a href="#">{{ t.footer.support.status }}</a>
              </li>
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
                <span>+998 90 123 45 67</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">✉️</span>
                <span>info@aiuniverse.uz</span>
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
      v-if="selectedAI"
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
                <span v-if="message.type === 'user'">👤</span>
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
            <input
              v-model="currentMessage"
              @keypress.enter="sendMessage"
              :placeholder="t.chat.placeholder"
              class="chat-input"
              :disabled="isTyping"
            />
            <button
              @click="sendMessage"
              :disabled="!currentMessage.trim() || isTyping"
              class="send-button"
            >
              <span v-if="!isTyping">🚀</span>
              <span v-else class="loading">⏳</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, nextTick, onMounted } from 'vue';
import { ref, nextTick, onMounted } from 'vue';
import axios from 'axios';


export default {
  name: 'AIUniverse',
  setup() {
    const darkMode = ref(false);
    const currentLang = ref('uz');
    const selectedAI = ref(null);
    const messages = ref([]);
    const currentMessage = ref('');
    const isTyping = ref(false);
    const messageId = ref(1);
    const messagesContainer = ref(null);

    const translations = reactive({
      uz: {
        hero: {
          title: '25 ta professional AI xizmati bir platformada',
          subtitle:
            "Sun'iy intellekt bilan hayotingizni osonlashtiring! Har bir AI o'z sohasida mutaxassis. Professional sifat va innovatsion yondashuvlar bilan sizning barcha ehtiyojlaringizni qondiradi.",
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
          speedDesc:
            '1 soniyadan kamroq vaqtda javob. Optimallashtirilgan algoritmlar va bulutli texnologiyalar.',
          security: 'Xavfsizlik',
          securityDesc:
            "256-bit shifrlash va ilg'or xavfsizlik protokollari. Ma'lumotlaringiz himoyalangan.",
          global: "Global qo'llab-quvvatlash",
          globalDesc:
            'Dunyoning barcha asosiy tillarida muloqot. Real vaqtda tarjima va tushunish.',
        },
        stats: {
          users: 'Faol foydalanuvchilar',
          messages: 'Qayta ishlangan xabarlar',
          uptime: 'Ishonchlilik',
          rating: 'Foydalanuvchi baholari',
        },
        cta: {
          title:
            "O'zbekistonda sun'iy intellekt texnologiyalarini rivojlantirish",
          subtitle:
            'Bizning maqsadimiz - AI orqali hayotni osonlashtirish va yangi imkoniyatlar yaratish',
        },
        footer: {
          description:
            "Professional AI xizmatlar platformasi. Sun'iy intellekt bilan kelajakni yaratamiz.",
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
            address: 'Toshkent, Yunusobod, IT Park',
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
        },
      },
      en: {
        hero: {
          title: '25 professional AI services in one platform',
          subtitle:
            'Simplify your life with artificial intelligence! Each AI is specialized in its field. Meets all your needs with professional quality and innovative approaches.',
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
          speedDesc:
            'Response in less than 1 second. Optimized algorithms and cloud technologies.',
          security: 'Security',
          securityDesc:
            '256-bit encryption and advanced security protocols. Your data is protected.',
          global: 'Global support',
          globalDesc:
            'Communication in all major languages of the world. Real-time translation and understanding.',
        },
        stats: {
          users: 'Active users',
          messages: 'Messages processed',
          uptime: 'Reliability',
          rating: 'User ratings',
        },
        cta: {
          title:
            'Developing artificial intelligence technologies in Uzbekistan',
          subtitle:
            'Our goal is to simplify life through AI and create new opportunities',
        },
        footer: {
          description:
            'Professional AI services platform. We create the future with artificial intelligence.',
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
            address: 'Tashkent, Yunusobod, IT Park',
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
        },
      },
      ru: {
        hero: {
          title: '25 профессиональных AI сервисов на одной платформе',
          subtitle:
            'Упростите свою жизнь с искусственным интеллектом! Каждый AI специализируется в своей области. Удовлетворяет все ваши потребности с профессиональным качеством и инновационными подходами.',
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
          speedDesc:
            'Ответ менее чем за 1 секунду. Оптимизированные алгоритмы и облачные технологии.',
          security: 'Безопасность',
          securityDesc:
            '256-битное шифрование и продвинутые протоколы безопасности. Ваши данные защищены.',
          global: 'Глобальная поддержка',
          globalDesc:
            'Общение на всех основных языках мира. Перевод и понимание в реальном времени.',
        },
        stats: {
          users: 'Активных пользователей',
          messages: 'Обработано сообщений',
          uptime: 'Надежность',
          rating: 'Оценки пользователей',
        },
        cta: {
          title: 'Развитие технологий искусственного интеллекта в Узбекистане',
          subtitle:
            'Наша цель - упростить жизнь через ИИ и создать новые возможности',
        },
        footer: {
          description:
            'Платформа профессиональных AI услуг. Создаем будущее с искусственным интеллектом.',
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
            address: 'Ташкент, Юнусабад, IT Park',
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
        },
      },
      ar: {
        hero: {
          title: '25 خدمة ذكاء اصطناعي مهنية في منصة واحدة',
          subtitle:
            'اجعل حياتك أسهل بالذكاء الاصطناعي! كل ذكاء اصطناعي متخصص في مجاله. يلبي جميع احتياجاتك بجودة مهنية ونهج مبتكر.',
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
          speedDesc:
            'استجابة في أقل من ثانية واحدة. خوارزميات محسنة وتقنيات سحابية.',
          security: 'الأمان',
          securityDesc: 'تشفير 256 بت وبروتوكولات أمان متقدمة. بياناتك محمية.',
          global: 'دعم عالمي',
          globalDesc:
            'التواصل بجميع اللغات الرئيسية في العالم. ترجمة وفهم في الوقت الفعلي.',
        },
        stats: {
          users: 'المستخدمون النشطون',
          messages: 'الرسائل المعالجة',
          uptime: 'الموثوقية',
          rating: 'تقييمات المستخدمين',
        },
        cta: {
          title: 'تطوير تقنيات الذكاء الاصطناعي في أوزبكستان',
          subtitle:
            'هدفنا هو تبسيط الحياة من خلال الذكاء الاصطناعي وخلق فرص جديدة',
        },
        footer: {
          description:
            'منصة خدمات الذكاء الاصطناعي المهنية. نصنع المستقبل بالذكاء الاصطناعي.',
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
            address: 'طشقند، يونس آباد، حديقة تكنولوجيا المعلومات',
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
        },
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
        emoji: '🧠',
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
          ar: 'طبيAI',
        },
        description: {
          uz: "Sog'liq maslahatchi va tibbiy ma'lumotlar. Profilaktika va yordam.",
          en: 'Health advisor and medical information. Prevention and assistance.',
          ru: 'Консультант поздоровью и медицинская информация. Профилактика и помощь.',
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

    const t = computed(() => translations[currentLang.value]);

    const getServiceCardClass = (aiId) => {
      const colorClasses = {
        1: 'service-card-blue',
        2: 'service-card-cyan',
        3: 'service-card-pink',
        4: 'service-card-purple',
        5: 'service-card-yellow',
        6: 'service-card-indigo',
        7: 'service-card-red',
        8: 'service-card-green',
        9: 'service-card-orange',
        10: 'service-card-gray',
        11: 'service-card-rose',
        12: 'service-card-emerald',
        13: 'service-card-sky',
        14: 'service-card-amber',
        15: 'service-card-violet',
        16: 'service-card-teal',
        17: 'service-card-lime',
        18: 'service-card-slate',
        19: 'service-card-fuchsia',
        20: 'service-card-blue',
        21: 'service-card-cyan',
        22: 'service-card-pink',
        23: 'service-card-purple',
        24: 'service-card-green',
        25: 'service-card-indigo',
      };
      return colorClasses[aiId] || 'service-card-blue';
    };

    const getAIThemeClass = (aiId) => {
      // Tun rejimida hammasi qora, kun rejimida har xil ranglar
      if (darkMode.value) {
        return 'theme-dark-universal';
      } else {
        const themes = {
          1: 'theme-chat',
          2: 'theme-translator',
          3: 'theme-blockchain',
          4: 'theme-research',
          5: 'theme-energy',
          6: 'theme-programming',
          7: 'theme-medical',
          8: 'theme-education',
          9: 'theme-business',
          10: 'theme-legal',
          11: 'theme-psychology',
          12: 'theme-finance',
          13: 'theme-travel',
          14: 'theme-cooking',
          15: 'theme-creative',
          16: 'theme-music',
          17: 'theme-sports',
          18: 'theme-weather',
          19: 'theme-news',
          20: 'theme-math',
          21: 'theme-science',
          22: 'theme-voice',
          23: 'theme-architecture',
          24: 'theme-ecology',
          25: 'theme-gaming',
        };
        return themes[aiId] || 'theme-default';
      }
    };

    const toggleTheme = () => {
      darkMode.value = !darkMode.value;
    };

    const changeLanguage = () => {
      document.documentElement.setAttribute(
        'dir',
        currentLang.value === 'ar' ? 'rtl' : 'ltr'
      );
    };

    const openAI = (ai) => {
      selectedAI.value = ai;
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
      });
    };

    const closeAI = () => {
      selectedAI.value = null;
      messages.value = [];
      currentMessage.value = '';
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

    const sendMessage = async () => {
      if (!currentMessage.value.trim() || isTyping.value) return;

      const userMessage = {
        id: messageId.value++,
        type: 'user',
        content: currentMessage.value,
        timestamp: new Date(),
      };

      messages.value.push(userMessage);
      const questionToProcess = currentMessage.value;
      currentMessage.value = '';
      isTyping.value = true;

      scrollToBottom();

      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/ai/${selectedAI.value.id}`,
          {
            prompt: questionToProcess,
            lang: currentLang.value,
          }
        );

        messages.value.push({
          id: messageId.value++,
          type: 'ai',
          content: response.data.response,
          timestamp: new Date(),
        });
      } catch (error) {
        console.error('API error:', error);
        messages.value.push({
          id: messageId.value++,
          type: 'ai',
          content: '❌ Xatolik yuz berdi. Qayta urinib ko‘ring.',
          timestamp: new Date(),
        });
      }

      isTyping.value = false;
      scrollToBottom();
    };

    const formatMessage = (content) => {
      return content
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };

    const formatTime = (timestamp) => {
      return timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    const scrollToBottom = () => {
      nextTick(() => {
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop =
            messagesContainer.value.scrollHeight;
        }
      });
    };

    onMounted(() => {
      changeLanguage();
    });

    return {
      darkMode,
      currentLang,
      selectedAI,
      messages,
      currentMessage,
      isTyping,
      messagesContainer,
      t,
      aiServices,
      getServiceCardClass,
      getAIThemeClass,
      toggleTheme,
      changeLanguage,
      openAI,
      closeAI,
      sendMessage,
      formatMessage,
      formatTime,
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
