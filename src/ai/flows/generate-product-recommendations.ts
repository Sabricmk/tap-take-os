
'use server';

/**
 * @fileOverview A product recommendation AI agent.
 *
 * - generateProductRecommendations - A function that generates product recommendations.
 * - GenerateProductRecommendationsInput - The input type for the generateProductRecommendations function.
 * - GenerateProductRecommendationsOutput - The return type for the generateProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductSchema = z.object({
  id: z.string().describe('The product ID.'),
  name: z.string().describe('The name of the product.'),
  price: z.number().describe('The price of the product.'),
  category: z.string().describe('The category of the product.'),
  image: z.string().optional().describe('The image of the product.'),
  tapCount: z.number().optional().describe('Tap count of the product'),
});

const CartItemSchema = ProductSchema.extend({
  quantity: z.number().describe('The quantity of the item in the cart.'),
  timestamp: z.string().describe('The ISO timestamp when the item was added to the cart.'),
  addMethod: z.string().optional().describe('The method by which the item was added to the cart. Can be \'tap\' or undefined.'),
  isRecommendation: z.boolean().optional().describe('Whether the item was added as a recommendation or not')
});

const GenerateProductRecommendationsInputSchema = z.object({
  cart: z.array(CartItemSchema).describe('The current items in the customer\'s cart.'),
  shoppingBehavior: z.string().describe('A description of the customer\'s current shopping behavior, e.g., \'Customer is browsing the pasta aisle.\''),
  customerProfileInfo: z.string().optional().describe('Information about the customer\'s past purchases and preferences.'),
});
export type GenerateProductRecommendationsInput = z.infer<
  typeof GenerateProductRecommendationsInputSchema
>;

const AIRecommendationSchema = z.object({
  product: ProductSchema.describe('The recommended product.'),
  reason: z.string().describe('The reason for the recommendation.'),
  confidence: z.number().describe('The confidence level of the recommendation (0-100).'),
});

const GenerateProductRecommendationsOutputSchema = z.array(
  AIRecommendationSchema
);
export type GenerateProductRecommendationsOutput = z.infer<
  typeof GenerateProductRecommendationsOutputSchema
>;

export async function generateProductRecommendations(
  input: GenerateProductRecommendationsInput
): Promise<GenerateProductRecommendationsOutput> {
  return generateProductRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductRecommendationsPrompt',
  input: {schema: GenerateProductRecommendationsInputSchema},
  output: {schema: GenerateProductRecommendationsOutputSchema},
  prompt: `You are a personal shopping assistant in a grocery store.

  Given the current items in the customer's cart, and their shopping history, recommend three additional products that the customer might want to add to their cart.

  Each recommendation should include a reason for the recommendation and a confidence level (0-100).

  Current cart: {{#each cart}}{{{this.name}}} (Qty: {{{this.quantity}}}){{#unless @last}}, {{/unless}}{{/each}}

  Shopping behavior: {{{shoppingBehavior}}}

  {{#if customerProfileInfo}}
  Customer profile: {{{customerProfileInfo}}}
  {{/if}}
  `,
});

const generateProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateProductRecommendationsFlow',
    inputSchema: GenerateProductRecommendationsInputSchema,
    outputSchema: GenerateProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

