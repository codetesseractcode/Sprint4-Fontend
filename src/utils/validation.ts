import { VALIDATION_MESSAGES } from '../constants';

// Validation utilities - Single Responsibility: Data validation
export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface AddInventoryFormData {
  sku: string;
  productId: string;
  categoryId: string;
  location: string;
  quantity: string | number;
}

export interface InventoryActionFormData {
  action: string;
  sku: string;
  quantity: string | number;
  orderId?: string;
}

export class ValidationService {
  
  // Validate SKU
  static validateSKU(sku: string): ValidationResult {
    if (!sku || sku.trim() === '') {
      return { isValid: false, message: VALIDATION_MESSAGES.SKU_REQUIRED };
    }
    return { isValid: true };
  }

  // Validate quantity
  static validateQuantity(quantity: string | number): ValidationResult {
    if (!quantity) {
      return { isValid: false, message: VALIDATION_MESSAGES.QUANTITY_REQUIRED };
    }
    
    const numQuantity = Number(quantity);
    if (isNaN(numQuantity) || numQuantity <= 0) {
      return { isValid: false, message: VALIDATION_MESSAGES.QUANTITY_POSITIVE };
    }
    
    return { isValid: true };
  }

  // Validate add inventory form
  static validateAddInventoryForm(formData: AddInventoryFormData): FormValidationResult {
    const errors: Record<string, string> = {};

    const skuValidation = this.validateSKU(formData.sku);
    if (!skuValidation.isValid) {
      errors.sku = skuValidation.message!;
    }

    if (!formData.productId) {
      errors.productId = 'Product ID is required';
    }

    if (!formData.categoryId) {
      errors.categoryId = 'Category ID is required';
    }

    if (!formData.location || formData.location.trim() === '') {
      errors.location = 'Location is required';
    }

    const quantityValidation = this.validateQuantity(formData.quantity);
    if (!quantityValidation.isValid) {
      errors.quantity = quantityValidation.message!;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Validate inventory action form
  static validateInventoryActionForm(formData: InventoryActionFormData): FormValidationResult {
    const errors: Record<string, string> = {};

    const skuValidation = this.validateSKU(formData.sku);
    if (!skuValidation.isValid) {
      errors.sku = skuValidation.message!;
    }

    const quantityValidation = this.validateQuantity(formData.quantity);
    if (!quantityValidation.isValid) {
      errors.quantity = quantityValidation.message!;
    }

    // Order ID is required for allocate and reserve actions
    if ((formData.action === 'allocate' || formData.action === 'reserve') && 
        (!formData.orderId || formData.orderId.trim() === '')) {
      errors.orderId = 'Order ID is required for this action';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

// Utility functions for common validations
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const sanitizeInput = (input: string | any): string | any => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};
