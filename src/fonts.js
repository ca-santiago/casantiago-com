import { Mulish, Poppins } from 'next/font/google'

export const mulish = Mulish({ subsets: ['latin'], weight: ['400', '600', '800'], variable: '--font-mulish' });
export const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '800'], variable: '--font-poppins' });

export const Fonts = {
    mulish,
    poppins
}