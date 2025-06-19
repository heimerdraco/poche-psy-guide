
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Palette Arboria - tons chaleureux et naturels
				sage: {
					50: 'hsl(var(--sage-50))',
					100: 'hsl(var(--sage-100))',
					200: 'hsl(var(--sage-200))',
					300: 'hsl(var(--sage-300))',
					400: 'hsl(var(--sage-400))',
					500: 'hsl(var(--sage-500))',
					600: 'hsl(var(--sage-600))',
					700: 'hsl(var(--sage-700))',
					800: 'hsl(var(--sage-800))',
					900: 'hsl(var(--sage-900))',
				},
				forest: {
					50: 'hsl(var(--forest-50))',
					100: 'hsl(var(--forest-100))',
					200: 'hsl(var(--forest-200))',
					300: 'hsl(var(--forest-300))',
					400: 'hsl(var(--forest-400))',
					500: 'hsl(var(--forest-500))',
					600: 'hsl(var(--forest-600))',
					700: 'hsl(var(--forest-700))',
					800: 'hsl(var(--forest-800))',
					900: 'hsl(var(--forest-900))',
				},
				cream: {
					50: 'hsl(var(--cream-50))',
					100: 'hsl(var(--cream-100))',
					200: 'hsl(var(--cream-200))',
					300: 'hsl(var(--cream-300))',
					400: 'hsl(var(--cream-400))',
					500: 'hsl(var(--cream-500))',
					600: 'hsl(var(--cream-600))',
					700: 'hsl(var(--cream-700))',
					800: 'hsl(var(--cream-800))',
					900: 'hsl(var(--cream-900))',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				'comfortaa': ['Comfortaa', 'cursive'],
				'nunito': ['Nunito', 'sans-serif'],
				'dancing': ['Dancing Script', 'cursive'],
				'playfair': ['Playfair Display', 'serif'],
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px) rotate(0deg)'
					},
					'33%': {
						transform: 'translateY(-10px) rotate(1deg)'
					},
					'66%': {
						transform: 'translateY(-5px) rotate(-1deg)'
					}
				},
				'float-slow': {
					'0%, 100%': {
						transform: 'translateY(0px) translateX(0px)'
					},
					'25%': {
						transform: 'translateY(-15px) translateX(5px)'
					},
					'50%': {
						transform: 'translateY(-25px) translateX(-5px)'
					},
					'75%': {
						transform: 'translateY(-10px) translateX(3px)'
					}
				},
				'pulse-gentle': {
					'0%, 100%': {
						transform: 'scale(1)',
						opacity: '0.8'
					},
					'50%': {
						transform: 'scale(1.05)',
						opacity: '1'
					}
				},
				'bounce-gentle': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				},
				'twinkle': {
					'0%, 100%': {
						opacity: '0.3',
						transform: 'scale(0.8)'
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1.2)'
					}
				},
				'fade-in-out': {
					'0%, 100%': {
						opacity: '0.1'
					},
					'50%': {
						opacity: '0.3'
					}
				},
				'slide-in-gentle': {
					from: {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'breathe': {
					'0%, 100%': {
						transform: 'scale(1)',
						opacity: '0.6'
					},
					'50%': {
						transform: 'scale(1.1)',
						opacity: '0.9'
					}
				},
				'wave': {
					'0%, 100%': {
						transform: 'translateX(0) translateY(0)'
					},
					'25%': {
						transform: 'translateX(5px) translateY(-3px)'
					},
					'50%': {
						transform: 'translateX(-3px) translateY(5px)'
					},
					'75%': {
						transform: 'translateX(3px) translateY(-2px)'
					}
				},
				'grow': {
					from: {
						transform: 'scale(0) rotate(-180deg)',
						opacity: '0'
					},
					to: {
						transform: 'scale(1) rotate(0deg)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'float-slow': 'float-slow 8s ease-in-out infinite',
				'pulse-gentle': 'pulse-gentle 3s ease-in-out infinite',
				'bounce-gentle': 'bounce-gentle 0.6s ease-in-out',
				'twinkle': 'twinkle 2s ease-in-out infinite',
				'fade-in-out': 'fade-in-out 6s ease-in-out infinite',
				'slide-in-gentle': 'slide-in-gentle 0.6s ease-out',
				'breathe': 'breathe 4s ease-in-out infinite',
				'wave': 'wave 3s ease-in-out infinite',
				'grow': 'grow 0.8s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
