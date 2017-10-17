import * as utils from '../src/utils';

describe('utilities', () => {
  beforeAll(() => {
    // To deal with randomString()
    Math._random = Math.random;
    Math.random = jest.fn(() => 0.55);
  });

  afterAll(() => {
    Math.random = Math._random;
  });

  test('isPrimitive', () => {
    const cases = [
      {
        value: true,
        primitive: true
      },
      {
        value: false,
        primitive: true
      },
      {
        value: null,
        primitive: true
      },
      {
        value: undefined, // eslint-disable-line no-undefined
        primitive: true
      },
      {
        value: 'foo',
        primitive: true
      },
      {
        value: 0,
        primitive: true
      },
      {
        value: {},
        primitive: false
      },
      {
        value: [],
        primitive: false
      }
    ];

    cases.forEach(({ value, primitive }) => {
      expect(utils.isPrimitive(value)).toBe(primitive);
    });
  });

  test('deepMapIn', () => {
    const mapOver = {
      num: 4,
      str: ['foo'],
      arr: [
        4,
        'bar',
        {
          str: 'foo'
        }
      ],
      obj: {
        num: 6,
        str: 'bar'
      },
      bool: true
    };

    const reverseAndNegate = value => {
      if (typeof value === 'number') {
        return -value;
      }

      if (typeof value === 'string') {
        return value.split('').reverse().join('');
      }

      return value;
    };

    expect(utils.deepMapIn(mapOver, reverseAndNegate)).toMatchObject({
      num: -4,
      str: ['oof'],
      arr: [
        -4,
        'rab',
        {
          str: 'oof'
        }
      ],
      obj: {
        num: -6,
        str: 'rab'
      },
      bool: true
    });
  });

  test('toContentAndUploads;', () => {
    const entries = [
      {
        path: '/image',
        data: {
          src:
            'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        }
      },
      {
        path: '/article',
        data: {
          html: `
            <p>Hello World</p>
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
            `
        }
      }
    ];

    expect(
      entries.map(utils.toShortcodeAndUploads)
    ).toMatchSnapshot();
  });
});
