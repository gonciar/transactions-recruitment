import { TransactionData, validateTransactionData } from './submitForm';

describe('submitForm', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // it()

  it('validates form data, good input', () => {
    const data: TransactionData = {
      amount: '1.11',
      account: 'PL10103620410255722000000000',
      beneficiary: 'Bob',
      address: '982 Benson Avenue, Coventry, Washington, 4101',
      description: 'Amet cillum deserunt excepteur in laborum.',
    };
    expect(validateTransactionData(data)).toEqual({});

    data.address = '';
    data.description = '';
    data.beneficiary = '';
    data.account = 'PL10';

    expect(validateTransactionData(data)).toEqual({});
  });

  it('validates form data, bad input', () => {
    const data: TransactionData = {
      amount: '-1.11',
      account: '',
      beneficiary: '',
      address: '',
      description: '',
    };

    expect(validateTransactionData(data)).toEqual({
      amount: '[amount] must be a positive number',
      account: '[account number] must contain numbers',
    });
  });

  it('validates form data, bad input', () => {
    const data: TransactionData = {
      amount: 'abc',
      beneficiary: '',
      account: 'PL1',
      address: '',
      description: '',
    };

    expect(validateTransactionData(data)).toEqual({
      amount: '[amount] must be a positive number',
      account: '[account number] must contain numbers',
    });
  });
});
