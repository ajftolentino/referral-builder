/* eslint-disable no-unused-vars */
export enum ERROR_MESSAGES {
  REFERRAL_CREATION_FAILED = 'Failed to create a new referral.',
  REFERRAL_DELETION_FAILED = 'Failed to delete referral.',
  REFERRAL_RETRIEVAL_FAILED = 'Failed to retrieve referral.',
  REFERRAL_UPDATE_FAILED = 'Failed to update referral.',
  CARD_RETRIEVAL_FAILED = 'Failed to retrieve card.',
  EMPTY_SEARCH_RESULTS = 'No results found for your search.',
  INVALID_BUSINESS_ADDRESS = 'Some details of your business address are missing. Please review and provide all required information before trying again.',
  INVALID_EMAIL_ADDRESS = 'The email address you provided is invalid.',
  INVALID_REQUEST = 'Invalid request.',
  UNKNOWN_ERROR = 'Encountered an unknown error',
}

export enum RESPONSE_CODES {
  FAILED = 0,
  SUCCESS = 200,
}
