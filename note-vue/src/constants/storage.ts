export const CLIENT_ID = 'client_id';
export const REDIRECT_URI = 'redirect_uri';
export const OPENID_ROLES = 'openid roles';
export const SILENT_REFRESH_REDIRECT_URI = 'silent_refresh_redirect_uri';
export const LOGIN_URL = 'login_url';
export const ISSUER_URL = 'issuer_url';
export const APP_URL = 'app_url';
export const USER_UUID = 'user_uuid';
export const NEW_ID: string = 'new';
export const JE_CREATED: string = 'Journal Entry successfully created';
export const JE_ERROR: string = 'Journal Entry creation failed';
export const ACCOUNT_TYPES = [
  'ASSET',
  'LIABILITY',
  'INCOME',
  'EXPENSE',
  'EQUITY',
];
export const ENTRY_TYPE = ['CREDIT', 'DEBIT'];
export const SERVICES = 'services';
export const SELECTED_DOMAIN = 'selected-domain';
export const ACCOUNTING_SERVER = 'accounting-server';
export const MAIN_ACCOUNTING_SERVER = 'main-accounting-server';
export const EXISTS = 'Exists';
export const ACCOUNT_SETUP = 'Account Setup Completed';
export const PERIOD_CLOSING = ' Period Closing ';
export const UPDATED = ' updated ';
export const CREATED = ' created ';
export const CLOSE = 'Close';
export const ERROR = 'Error';
export const JOURNAL_ENTRY = 'Journal Entry';
export const CREDIT = 'Credit';
export const DEBIT = 'Debit';
export const DISPLAYED_COLUMNS = ['account', 'entryType', 'amount', 'button'];
export const ELEMENT_DATA = [
  {
    account: '',
    entryType: 'CREDIT',
    amount: 0,
  },
];
export const PURCHASE_INVOICE_MODEL = 'purchase_invoice';
export const SALES_INVOICE_MODEL = 'sales_invoice';
export const INVOICING_SERVER = 'invoicing-server';
export const INFRASTRUCTURE_CONSOLE = 'infrastructure-console';
export const ASSET = 'ASSET';
export const LIABILITY = 'LIABILITY';
export const INCOME = 'INCOME';
export const EXPENSE = 'EXPENSE';
export const EQUITY = 'EQUITY';
export const ACCOUNT_SETTINGS = 'account_settings';
export const ACCOUNT_LISTING_COLUMN = [
  'accountName',
  'accountNumber',
  'accountType',
  'isGroup',
];
export const CLOSING_OPTIONS = [
  'monthly',
  'quarterly',
  'half yearly',
  'yearly',
];
export const JOURNAL_ENTRY_LISTING = ['transactionId', 'transactionDate'];
export const INVOICE_LISTING = ['invoiceNumber', 'date', 'invoiceName'];
export const SELECTED_INVOICE_SERVER = 'selected-invoice-server';
export const SERVER_DOWN = 'SERVER_DOWN';
export const LOGIN_SUCCESSFUL = 'login successful';