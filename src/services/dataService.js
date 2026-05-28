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
