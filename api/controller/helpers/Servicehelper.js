const {
    genericGetAndCountAll,
    genericCreate,
    genericGetById,
    genericUpdate,
    genericDelete,
    genericBulkCreate,
  } = require('../../services/genricService');
  // rule base validation
  // helpers can call other helper
  // res , req won't come here
  // local utils
  
  const getService = async (options = {}) => {
    return genericGetAndCountAll('service', { ...options });
  };
  
  const createService = async (body, options = {}) => {
    return genericCreate('service', body, options);
  };
  
  const getServiceById = async (id) => {
    return genericGetById('service', id);
  };
  
  const updateService = async (body, options = {}) => {
    return genericUpdate('service', body, options);
  };
  
  const deleteService = async (id) => {
    return genericDelete('service', { where: { id } });
  };
  
  const createBulkService = async (body, options = {}) => {
    return genericBulkCreate('service', body, options);
  };
  
  module.exports = {
    getService,
    createService,
    getServiceById,
    updateService,
    deleteService,
    createBulkService,
  };
  