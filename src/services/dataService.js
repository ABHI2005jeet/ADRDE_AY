import api from './api';

export const getMeetings = async () => {
  const { data } = await api.get('/meetings');
  return data;
};

export const createMeeting = async (meetingData) => {
  const { data } = await api.post('/meetings', meetingData);
  return data;
};

export const updateMeetingStatus = async (id, statusData) => {
  const { data } = await api.put(`/meetings/${id}/status`, statusData);
  return data;
};

export const getDocuments = async () => {
  const { data } = await api.get('/documents');
  return data;
};

export const uploadDocument = async (formData) => {
  const { data } = await api.post('/documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
};

export const getInventory = async () => {
  const { data } = await api.get('/inventory');
  return data;
};

export const addInventory = async (itemData) => {
  const { data } = await api.post('/inventory', itemData);
  return data;
};

export const getLetters = async () => {
  const { data } = await api.get('/letters');
  return data;
};

export const addLetter = async (letterData) => {
  const { data } = await api.post('/letters', letterData);
  return data;
};

export const getModuleEntries = async (moduleName) => {
  const { data } = await api.get(`/modules/${moduleName}`);
  return data;
};

export const addModuleEntry = async (moduleName, entryData) => {
  const { data } = await api.post(`/modules/${moduleName}`, entryData);
  return data;
};
