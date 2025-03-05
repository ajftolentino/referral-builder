export type Address = {
  building?: string;
  city?: string;
  country?: string;
  stateOrProvince?: string;
  street?: string;
  zipCode?: string;
};

export type Referral = {
  id: string | null;
  address?: Address;
  email: string;
  givenName: string;
  phone: string;
  surname: string;
};
