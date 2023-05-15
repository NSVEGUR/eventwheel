/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				dominant: 'var(--color-dominant-hex)',
				inverted: 'var(--color-inverted-hex)',
				accent: 'var(--color-accent-hex)',
				'light-accent': 'var(--color-accent-light-hex)',
				complementary: 'var(--color-complementary-hex)',
				muted: 'var(--color-muted-hex)',
				'muted-hover': 'var(--color-muted-hover-hex)',
				'muted-complementary':
					'var(--color-muted-complementary-hex)',
				error: 'var(--color-error-hex)',
				okay: 'var(--color-okay-hex)'
			},
			textColor: {
				skin: {
					base: 'var(--color-text-base-hex)',
					inverted: 'var(--color-text-inverted-hex)',
					muted: 'var(--color-text-muted-hex)',
					complementary:
						'var(--color-text-complementary-hex)',
					error: '#d74c4c',
					okay: '#2DB00C'
				}
			},
			borderColor: {
				base: 'var(--color-border-base-hex)',
				complementary:
					'var(--color-border-complementary-hex)'
			},
			backgroundImage: {
				'gradient-radial':
					'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			screens: {
				'-2xl': { max: '1535px' },
				'-xl': { max: '1279px' },
				'-lg': { max: '1023px' },
				'-md': { max: '767px' },
				'-sm': { max: '639px' },
				'@md': { min: '640px', max: '767px' },
				'@lg': { min: '768px', max: '1023px' },
				'@xl': { min: '1024px', max: '1279px' },
				'@2xl': { min: '1280px', max: '1535px' }
			},
			animation: {
				'gradient-text': 'gradient-text 5s ease infinite',
				scale: 'scale 250ms ease-in-out',
				fade: 'fade 700ms ease-in-out'
			}
		}
	},
	plugins: []
};
