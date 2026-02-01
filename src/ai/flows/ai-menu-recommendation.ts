'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized menu recommendations based on user dietary preferences and order history.
 *
 * - getMenuRecommendations - A function that takes user preferences and order history as input and returns a list of recommended menu items.
 * - MenuRecommendationInput - The input type for the getMenuRecommendations function.
 * - MenuRecommendationOutput - The return type for the getMenuRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MenuRecommendationInputSchema = z.object({
  dietaryPreferences: z
    .string()
    .describe('The user dietary preferences, such as vegetarian, vegan, gluten-free, etc.'),
  pastOrderHistory: z
    .string()
    .describe('The user past order history, including items ordered and frequency.'),
});
export type MenuRecommendationInput = z.infer<typeof MenuRecommendationInputSchema>;

const MenuRecommendationOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of recommended menu items based on the user preferences and order history.'),
});
export type MenuRecommendationOutput = z.infer<typeof MenuRecommendationOutputSchema>;

export async function getMenuRecommendations(input: MenuRecommendationInput): Promise<MenuRecommendationOutput> {
  return menuRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'menuRecommendationPrompt',
  input: {schema: MenuRecommendationInputSchema},
  output: {schema: MenuRecommendationOutputSchema},
  prompt: `You are a restaurant menu recommendation expert.

  Based on the user's dietary preferences: {{{dietaryPreferences}}} and past order history: {{{pastOrderHistory}}},
  recommend a list of menu items that they might enjoy.  Explain why each item is recommended based on the
  preferences and history.
  `,
});

const menuRecommendationFlow = ai.defineFlow(
  {
    name: 'menuRecommendationFlow',
    inputSchema: MenuRecommendationInputSchema,
    outputSchema: MenuRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
