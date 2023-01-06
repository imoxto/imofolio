import defaultTheme from 'windicss/defaultTheme';

export const colors: Record<string, Record<number, string>> = {
	...defaultTheme.colors,
	gray: {
		50: '#f9fafb',
		100: '#eaeaeb',
		200: '#cacbcd',
		300: '#a7a9ac',
		400: '#696c71',
		500: '#282d34',
		600: '#24292f',
		700: '#181b20',
		800: '#121518',
		900: '#0c0e10',
	},
	primary: {
		50: '#ff80ff',
		100: '#ff60ff',
		200: '#ff40ff',
		300: '#ff20ff',
		400: '#ff00ff',
		500: '#f000f0',
		600: '#e000e0',
		700: '#d000d0',
		800: '#c000c0',
		900: '#b000b0',
	},
};
