import axios from 'axios';

// Backend API base URL
const API_BASE_URL = 'https://ai-backend-fy7t.onrender.com'
const API_TIMEOUT = 30000;

console.log('🔧 API_BASE_URL:', API_BASE_URL);

// Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Accept': 'text/plain',
    'Content-Type': 'application/json',
  },
  responseType: 'text',
  withCredentials: true
});

// Text javobni parse qilish funksiyasi
const parseTextResponse = (responseText) => {
  if (!responseText || typeof responseText !== 'string') {
    return { status: 'error', data: '', message: 'Empty or invalid response' };
  }
  
  const parts = responseText.split('|');
  if (parts.length < 3) {
    return { status: 'error', data: responseText, message: 'Invalid response format' };
  }
  
  const [status, data, message] = parts;
  return { status, data, message };
};

// Development rejimida logging
if (import.meta.env.VITE_DEBUG_MODE === 'true') {
  apiClient.interceptors.request.use(request => {
    console.log('🚀 API Request:', {
      url: request.url,
      baseURL: request.baseURL,
      method: request.method,
      params: request.params,
      data: request.data,
      headers: request.headers,
      fullURL: `${request.baseURL}${request.url}`
    });
    return request;
  });

  apiClient.interceptors.response.use(
    response => {
      const parsed = parseTextResponse(response.data);
      console.log('✅ API Response:', parsed);
      return { ...response, data: parsed };
    },
    error => {
      console.error('❌ API Error:', error);
      
      // Network yoki CORS xatosi
      if (!error.response) {
        console.error('❌ Network/CORS Error - Backend ishlamayotgan bo\'lishi mumkin');
        return Promise.reject({
          ...error,
          response: {
            data: {
              status: 'error',
              data: 'network_error',
              message: 'Backend bilan bog\'lanib bo\'lmadi. Backend server ishlab turganini tekshiring.'
            }
          }
        });
      }
      
      const errorResponse = error.response?.data
        ? parseTextResponse(error.response.data)
        : { status: 'error', data: error.message, message: 'Unknown error' };
      
      return Promise.reject({ 
        ...error, 
        response: { 
          ...error.response, 
          data: errorResponse 
        } 
      });
    }
  );
} else {
  // Production rejimida ham response parse qilish kerak
  apiClient.interceptors.response.use(
    response => {
      const parsed = parseTextResponse(response.data);
      return { ...response, data: parsed };
    },
    error => {
      if (!error.response) {
        return Promise.reject({
          ...error,
          response: {
            data: {
              status: 'error',
              data: 'network_error',
              message: 'Backend bilan bog\'lanib bo\'lmadi'
            }
          }
        });
      }
      
      const errorResponse = error.response?.data
        ? parseTextResponse(error.response.data)
        : { status: 'error', data: error.message, message: 'Unknown error' };
      
      return Promise.reject({ 
        ...error, 
        response: { 
          ...error.response, 
          data: errorResponse 
        } 
      });
    }
  );
}

// AI Services API - TUZATILGAN!
export const aiAPI = {
  chatWithAI: async (aiType, message, userId, conversationId = null) => {
    try {
      console.log(`🤖 Chatting with ${aiType}:`, { message, userId, conversationId });
      
      if (!message?.trim()) {
        throw new Error('Xabar bo\'sh bo\'lmasligi kerak');
      }
      
      if (!userId) {
        throw new Error('Foydalanuvchi ID kerak');
      }
      
      const requestData = {
        message: message.trim(),
        user_id: userId
      };
      
      if (conversationId) {
        requestData.conversation_id = conversationId;
      }
      
      // MUHIM TUZATISH: To'g'ri endpoint ishlatish
      const response = await apiClient.post(`/chat/${aiType}`, requestData);
      
      if (response.data.status === 'success') {
        const responseData = response.data.data;
        const conversationIdFromResponse = response.data.message;
        
        return {
          success: true,
          data: {
            response: responseData,
            conversation_id: conversationIdFromResponse || conversationId
          },
          message: 'Success'
        };
      } else {
        throw new Error(response.data.message || 'Noma\'lum xato');
      }
    } catch (error) {
      console.error(`❌ Error chatting with ${aiType}:`, error);
      
      const errorMessage = error.response?.data?.message || error.message || 'Noma\'lum xato';
      
      return {
        success: false,
        error: errorMessage,
        status: error.response?.status || 500
      };
    }
  },

  // Barcha AI metodlari - AI type nomlarini to'g'rilash
  chat: (message, userId, conversationId) => aiAPI.chatWithAI('chat', message, userId, conversationId),
  tarjimon: (message, userId, conversationId) => aiAPI.chatWithAI('tarjimon', message, userId, conversationId),
  blockchain: (message, userId, conversationId) => aiAPI.chatWithAI('blockchain', message, userId, conversationId),
  tadqiqot: (message, userId, conversationId) => aiAPI.chatWithAI('tadqiqot', message, userId, conversationId),
  smartEnergy: (message, userId, conversationId) => aiAPI.chatWithAI('smart_energy', message, userId, conversationId),
  dasturlash: (message, userId, conversationId) => aiAPI.chatWithAI('dasturlash', message, userId, conversationId),
  tibbiy: (message, userId, conversationId) => aiAPI.chatWithAI('tibbiy', message, userId, conversationId),
  talim: (message, userId, conversationId) => aiAPI.chatWithAI('talim', message, userId, conversationId),
  biznes: (message, userId, conversationId) => aiAPI.chatWithAI('biznes', message, userId, conversationId),
  huquq: (message, userId, conversationId) => aiAPI.chatWithAI('huquq', message, userId, conversationId),
  psixologik: (message, userId, conversationId) => aiAPI.chatWithAI('psixologik', message, userId, conversationId),
  moliya: (message, userId, conversationId) => aiAPI.chatWithAI('moliya', message, userId, conversationId),
  sayohat: (message, userId, conversationId) => aiAPI.chatWithAI('sayohat', message, userId, conversationId),
  oshpazlik: (message, userId, conversationId) => aiAPI.chatWithAI('oshpazlik', message, userId, conversationId),
  ijod: (message, userId, conversationId) => aiAPI.chatWithAI('ijod', message, userId, conversationId),
  musiqa: (message, userId, conversationId) => aiAPI.chatWithAI('musiqa', message, userId, conversationId),
  sport: (message, userId, conversationId) => aiAPI.chatWithAI('sport', message, userId, conversationId),
  obhavo: (message, userId, conversationId) => aiAPI.chatWithAI('obhavo', message, userId, conversationId),
  yangiliklar: (message, userId, conversationId) => aiAPI.chatWithAI('yangiliklar', message, userId, conversationId),
  matematik: (message, userId, conversationId) => aiAPI.chatWithAI('matematik', message, userId, conversationId),
  fan: (message, userId, conversationId) => aiAPI.chatWithAI('fan', message, userId, conversationId),
  ovozli: (message, userId, conversationId) => aiAPI.chatWithAI('ovozli', message, userId, conversationId),
  arxitektura: (message, userId, conversationId) => aiAPI.chatWithAI('arxitektura', message, userId, conversationId),
  ekologiya: (message, userId, conversationId) => aiAPI.chatWithAI('ekologiya', message, userId, conversationId),
  oyun: (message, userId, conversationId) => aiAPI.chatWithAI('oyun', message, userId, conversationId),
};

// Google Auth API
export const authAPI = {
  googleAuth: async (email, name, picture = '') => {
    try {
      console.log('🔐 Google Auth:', { email, name });
      
      if (!email || !name) {
        throw new Error('Email va ism majburiy');
      }
      
      const requestData = {
        email: email,
        name: name,
        picture: picture
      };
      
      const response = await apiClient.post('/auth/google', requestData);
      
      if (response.data.status === 'success') {
        return {
          success: true,
          data: { 
            userId: response.data.data, 
            message: response.data.message 
          },
          status: 200
        };
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('❌ Google auth error:', error);
      
      const errorMessage = error.response?.data?.message || error.message || 'Autentifikatsiya xatosi';
      
      return {
        success: false,
        error: errorMessage,
        status: error.response?.status || 500
      };
    }
  }
};

// Conversations API
export const conversationsAPI = {
  getConversations: async (userId) => {
    try {
      console.log('📋 Getting conversations for user:', userId);
      
      if (!userId) {
        throw new Error('Foydalanuvchi ID kerak');
      }
      
      const response = await apiClient.get('/conversations', {
        params: { user_id: userId }
      });
      
      if (response.data.status === 'success' && response.data.data !== 'no_conversations') {
        const conversations = response.data.data.split('\n')
          .filter(line => line.trim())
          .map(line => {
            const [id, aiType, title, createdAt, updatedAt] = line.split('|');
            return {
              id,
              aiType,
              title,
              createdAt: new Date(createdAt),
              updatedAt: new Date(updatedAt)
            };
          });
        return {
          success: true,
          data: conversations,
          message: response.data.message
        };
      } else {
        return {
          success: true,
          data: [],
          message: response.data.message
        };
      }
    } catch (error) {
      console.error('❌ Get conversations error:', error);
      
      const errorMessage = error.response?.data?.message || error.message || 'Suhbatlarni olishda xato';
      
      return {
        success: false,
        error: errorMessage,
        status: error.response?.status || 500
      };
    }
  },

  getMessages: async (conversationId, userId) => {
    try {
      console.log('💬 Getting messages:', { conversationId, userId });
      
      if (!conversationId || !userId) {
        throw new Error('Suhbat ID va foydalanuvchi ID kerak');
      }
      
      const response = await apiClient.get(`/conversations/${conversationId}/messages`, {
        params: { user_id: userId }
      });
      
      if (response.data.status === 'success' && response.data.data !== 'no_messages') {
        const messages = response.data.data.split('\n')
          .filter(line => line.trim())
          .map(line => {
            const [id, content, aiResponse, timestamp] = line.split('|');
            return {
              id,
              userMessage: content,
              aiResponse,
              timestamp: new Date(timestamp)
            };
          });
        return {
          success: true,
          data: messages,
          message: response.data.message
        };
      } else {
        return {
          success: true,
          data: [],
          message: response.data.message
        };
      }
    } catch (error) {
      console.error('❌ Get messages error:', error);
      
      const errorMessage = error.response?.data?.message || error.message || 'Xabarlarni olishda xato';
      
      return {
        success: false,
        error: errorMessage,
        status: error.response?.status || 500
      };
    }
  },

  updateConversation: async (conversationId, title, userId) => {
    try {
      console.log('✏️ Updating conversation:', { conversationId, title, userId });
      
      if (!conversationId || !userId) {
        throw new Error('Suhbat ID va foydalanuvchi ID kerak');
      }
      
      const requestData = {
        title: title,
        user_id: userId
      };
      
      const response = await apiClient.put(`/conversations/${conversationId}`, requestData);
      
      if (response.data.status === 'success') {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message
        };
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('❌ Update conversation error:', error);
      
      const errorMessage = error.response?.data?.message || error.message || 'Suhbatni yangilashda xato';
      
      return {
        success: false,
        error: errorMessage,
        status: error.response?.status || 500
      };
    }
  },

  deleteConversation: async (conversationId, userId) => {
    try {
      console.log('🗑️ Deleting conversation:', { conversationId, userId });
      
      if (!conversationId || !userId) {
        throw new Error('Suhbat ID va foydalanuvchi ID kerak');
      }
      
      const response = await apiClient.delete(`/conversations/${conversationId}`, {
        params: { user_id: userId }
      });
      
      if (response.data.status === 'success') {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message
        };
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('❌ Delete conversation error:', error);
      
      const errorMessage = error.response?.data?.message || error.message || 'Suhbatni o\'chirishda xato';
      
      return {
        success: false,
        error: errorMessage,
        status: error.response?.status || 500
      };
    }
  }
};

// Statistics API
export const statsAPI = {
  getUserStats: async (userId) => {
    try {
      console.log('📊 Getting user stats:', userId);
      
      if (!userId) {
        throw new Error('Foydalanuvchi ID kerak');
      }
      
      const response = await apiClient.get('/stats', {
        params: { user_id: userId }
      });
      
      if (response.data.status === 'success' && response.data.data !== 'no_stats') {
        const lines = response.data.data.split('\n');
        const totalMessages = parseInt(lines[0]?.split(': ')[1] || '0');
        const totalConversations = parseInt(lines[1]?.split(': ')[1] || '0');
        const mostUsedAI = lines[2]?.split(': ')[1] || 'None';
        
        const aiStats = lines.slice(3)
          .filter(line => line.includes('|'))
          .map(line => {
            const [aiType, usageCount, lastUsed] = line.split('|');
            return {
              aiType,
              usageCount: parseInt(usageCount),
              lastUsed: new Date(lastUsed)
            };
          });

        return {
          success: true,
          data: {
            totalMessages,
            totalConversations,
            mostUsedAI,
            aiStats
          },
          message: response.data.message
        };
      } else {
        return {
          success: true,
          data: {
            totalMessages: 0,
            totalConversations: 0,
            mostUsedAI: 'None',
            aiStats: []
          },
          message: response.data.message
        };
      }
    } catch (error) {
      console.error('❌ Get stats error:', error);
      
      const errorMessage = error.response?.data?.message || error.message || 'Statistikalarni olishda xato';
      
      return {
        success: false,
        error: errorMessage,
        status: error.response?.status || 500
      };
    }
  },

  getStatsChart: async (userId) => {
    try {
      console.log('📈 Getting stats chart:', userId);
      
      if (!userId) {
        throw new Error('Foydalanuvchi ID kerak');
      }
      
      const response = await apiClient.get('/stats/chart', {
        params: { user_id: userId }
      });
      
      if (response.data.status === 'success' && response.data.data !== 'no_stats') {
        const lines = response.data.data.split('\n');
        const labels = lines[0]?.split(': ')[1]?.split(',') || [];
        const data = lines[1]?.split(': ')[1]?.split(',').map(Number) || [];

        return {
          success: true,
          data: {
            labels,
            data
          },
          message: response.data.message
        };
      } else {
        return {
          success: true,
          data: {
            labels: [],
            data: []
          },
          message: response.data.message
        };
      }
    } catch (error) {
      console.error('❌ Get stats chart error:', error);
      
      const errorMessage = error.response?.data?.message || error.message || 'Grafik ma\'lumotlarini olishda xato';
      
      return {
        success: false,
        error: errorMessage,
        status: error.response?.status || 500
      };
    }
  }
};

// Health check
export const healthAPI = {
  check: async () => {
    try {
      console.log('🏥 Health check...');
      
      const response = await apiClient.get('/health');
      
      if (response.data.status === 'success') {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message
        };
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('❌ Health check error:', error);
      
      const errorMessage = error.response?.data?.message || error.message || 'Server holatini tekshirishda xato';
      
      return {
        success: false,
        error: errorMessage,
        status: error.response?.status || 500
      };
    }
  }
};

// AI Type mapping helper - AI ID dan type nomiga o'tish uchun
export const AI_TYPE_MAPPING = {
  1: 'chat',
  2: 'tarjimon', 
  3: 'blockchain',
  4: 'tadqiqot',
  5: 'smart_energy',
  6: 'dasturlash',
  7: 'tibbiy',
  8: 'talim',
  9: 'biznes',
  10: 'huquq',
  11: 'psixologik',
  12: 'moliya',
  13: 'sayohat',
  14: 'oshpazlik',
  15: 'ijod',
  16: 'musiqa',
  17: 'sport',
  18: 'obhavo',
  19: 'yangiliklar',
  20: 'matematik',
  21: 'fan',
  22: 'ovozli',
  23: 'arxitektura',
  24: 'ekologiya',
  25: 'oyun'
};

// Helper function to get AI method by ID - TUZATILGAN!
export const getAIMethod = (aiId) => {
  const mapping = {
    1: aiAPI.chat,
    2: aiAPI.tarjimon,
    3: aiAPI.blockchain,
    4: aiAPI.tadqiqot,
    5: aiAPI.smartEnergy,
    6: aiAPI.dasturlash,
    7: aiAPI.tibbiy,
    8: aiAPI.talim,
    9: aiAPI.biznes,
    10: aiAPI.huquq,
    11: aiAPI.psixologik,
    12: aiAPI.moliya,
    13: aiAPI.sayohat,
    14: aiAPI.oshpazlik,
    15: aiAPI.ijod,
    16: aiAPI.musiqa,
    17: aiAPI.sport,
    18: aiAPI.obhavo,
    19: aiAPI.yangiliklar,
    20: aiAPI.matematik,
    21: aiAPI.fan,
    22: aiAPI.ovozli,
    23: aiAPI.arxitektura,
    24: aiAPI.ekologiya,
    25: aiAPI.oyun
  };
  return mapping[aiId] || aiAPI.chat;
};

// Test API connection
export const testConnection = async () => {
  try {
    console.log('🔌 Testing API connection...');
    const result = await healthAPI.check();
    console.log('✅ Connection test result:', result);
    return result;
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return {
      success: false,
      error: 'Backend bilan bog\'lanib bo\'lmadi',
      status: 500
    };
  }
};

// Default export
export default {
  aiAPI,
  authAPI,
  conversationsAPI,
  statsAPI,
  healthAPI,
  AI_TYPE_MAPPING,
  getAIMethod,
  testConnection
};