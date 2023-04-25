import {Platform} from 'react-native';
import {Theme} from './Theme.context';

import lightColors from './_lightColors.json';
import darkColors from './_darkColors.json';

const typography = {
  title: {
    '01': {
      fontFamily: 'Lexend-SemiBold',
      fontSize: 24,
    },
    '02': {
      fontFamily: 'Lexend-Bold',
      fontSize: 20,
    },
    '03': {
      fontFamily: 'Lexend-Bold',
      fontSize: 18,
    },
    '04': {
      fontFamily: 'Lexend-Bold',
      fontSize: 16,
    },
    '05': {
      fontFamily: 'Lexend-SemiBold',
      fontSize: 14,
    },
    '06': {
      fontFamily: 'Lexend-SemiBold',
      fontSize: 12,
    },
    appBar: {
      fontFamily: 'Lexend-Bold',
      fontSize: 14,
    },
    navbar: {
      fontFamily: 'Lexend-Medium',
      fontSize: 14,
    },
  },
  subtitles: {
    '01': {
      fontFamily: 'Lexend-Light',
      fontSize: 12,
    },
    '02': {
      fontFamily: 'Lexend-Medium',
      fontSize: 10,
    },
    '03': {
      fontFamily: 'Lexend-Regular',
      fontSize: 8,
    },
    appBar: {
      fontFamily: 'Lexend-Light',
      fontSize: 10,
    },
  },
  button: {},
  body: {
    '01': {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
    },
    '02': {
      fontFamily: 'Poppins-Regular',
      fontSize: 10,
    },
  },
  caption: {},
  selection: {
    active: {
      fontFamily: 'Lexend-Bold',
      fontSize: 12,
    },
    inactive: {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
    },
  },
};

export const defaultTheme: Theme = {
  colorScheme: 'light',
  elevations: {
    0: Platform.select({
      android: {
        elevation: 0,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
      },
      web: {
        boxShadow: 'none',
      },
    }),
    1: Platform.select({
      android: {
        elevation: 1,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
      },
      web: {
        boxShadow:
          '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
      },
    }),
    2: Platform.select({
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      web: {
        boxShadow:
          '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
      },
    }),
    3: Platform.select({
      android: {
        elevation: 3,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
      },
      web: {
        boxShadow:
          '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
      },
    }),
    4: Platform.select({
      android: {
        elevation: 4,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
      web: {
        boxShadow:
          '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
      },
    }),
    5: Platform.select({
      android: {
        elevation: 5,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      web: {
        boxShadow:
          '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
      },
    }),
    6: Platform.select({
      android: {
        elevation: 6,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
      },
      web: {
        boxShadow:
          '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
      },
    }),
    7: Platform.select({
      android: {
        elevation: 7,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
      },
      web: {
        boxShadow:
          '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
      },
    }),
    8: Platform.select({
      android: {
        elevation: 8,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      web: {
        boxShadow:
          '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
      },
    }),
    9: Platform.select({
      android: {
        elevation: 9,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
      },
      web: {
        boxShadow:
          '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
      },
    }),
    10: Platform.select({
      android: {
        elevation: 10,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
      },
      web: {
        boxShadow:
          '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
      },
    }),
    11: Platform.select({
      android: {
        elevation: 11,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
      },
      web: {
        boxShadow:
          '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
      },
    }),
    12: Platform.select({
      android: {
        elevation: 12,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
      },
      web: {
        boxShadow:
          '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
      },
    }),
    13: Platform.select({
      android: {
        elevation: 13,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,
      },
      web: {
        boxShadow:
          '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
      },
    }),
    14: Platform.select({
      android: {
        elevation: 14,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
      },
      web: {
        boxShadow:
          '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
      },
    }),
    15: Platform.select({
      android: {
        elevation: 15,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
      },
      web: {
        boxShadow:
          '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
      },
    }),
    16: Platform.select({
      android: {
        elevation: 16,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
      },
      web: {
        boxShadow:
          '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
      },
    }),
    17: Platform.select({
      android: {
        elevation: 17,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
      },
      web: {
        boxShadow:
          '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
      },
    }),
    18: Platform.select({
      android: {
        elevation: 18,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
      },
      web: {
        boxShadow:
          '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
      },
    }),
    19: Platform.select({
      android: {
        elevation: 19,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,
      },
      web: {
        boxShadow:
          '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
      },
    }),
    20: Platform.select({
      android: {
        elevation: 20,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
      },
      web: {
        boxShadow:
          '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
      },
    }),
    21: Platform.select({
      android: {
        elevation: 21,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
      },
      web: {
        boxShadow:
          '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
      },
    }),
    22: Platform.select({
      android: {
        elevation: 22,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
      },
      web: {
        boxShadow:
          '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
      },
    }),
    23: Platform.select({
      android: {
        elevation: 23,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 11,
        },
        shadowOpacity: 0.57,
        shadowRadius: 15.19,
      },
      web: {
        boxShadow:
          '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
      },
    }),
    24: Platform.select({
      android: {
        elevation: 24,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
      },
      web: {
        boxShadow:
          '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
      },
    }),
  },
  pallate: lightColors,
  typography,
};

export const darkTheme: Theme = {
  ...defaultTheme,
  colorScheme: 'dark',
  pallate: darkColors,
};
