import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                navy: {
                    DEFAULT: '#1F3864',
                    50: '#E8ECF4',
                    100: '#D1D9E9',
                    200: '#A3B3D3',
                    300: '#758DBD',
                    400: '#4767A7',
                    500: '#1F3864',
                    600: '#1A2F54',
                    700: '#152643',
                    800: '#101D33',
                    900: '#0B1422',
                },
                teal: {
                    DEFAULT: '#2E9B8F',
                    50: '#E6F5F3',
                    100: '#CCEBE7',
                    200: '#99D7CF',
                    300: '#66C3B7',
                    400: '#33AFA3',
                    500: '#2E9B8F',
                    600: '#257C72',
                    700: '#1B5D55',
                    800: '#123E39',
                    900: '#091F1C',
                },
                outcome1: '#2F7FBF',
                outcome2: '#3AAE7C',
                outcome3: '#E28A3C',
                danger: {
                    DEFAULT: '#D9534F',
                    50: '#FBE9E9',
                    100: '#F7D3D3',
                    200: '#EFA7A7',
                    300: '#E67B7B',
                    400: '#DE5050',
                    500: '#D9534F',
                    600: '#B5433F',
                    700: '#91332F',
                    800: '#6D2422',
                    900: '#491614',
                },
                warning: {
                    DEFAULT: '#E8B93B',
                    50: '#FCF6E3',
                    100: '#FAEDC7',
                    200: '#F5DB8F',
                    300: '#EFCA57',
                    400: '#EAB820',
                    500: '#E8B93B',
                    600: '#BA942F',
                    700: '#8C6F23',
                    800: '#5E4A17',
                    900: '#30250B',
                },
                appbg: '#F4F6F9',
                card: '#FFFFFF',
                border: '#E3E8EF',
                muted: '#6B7787',
            },
            borderRadius: {
                card: '9px',
            },
            spacing: {
                sidebar: '240px',
            },
        },
    },

    plugins: [forms],
};
