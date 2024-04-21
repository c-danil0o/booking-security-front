export interface CSR{
  requestId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  organisation?: string;
  countryCode?: string;
  alias?: string;
  signerAlias?: string;
  validTo?: Date;
  validFrom?: Date;
  publicKey?: string;
  type?: string;
  extensions?: object;
}
