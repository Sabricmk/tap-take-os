
import type { Product, Customer, StoreArea, ShoppingStep, CustomerHistory, RegionData, StoreLocationData, SalesData, CategorySales, CustomerSegment, NPSDataEntry, CSATDataEntry, CampaignData, ChannelPerformance, FinancialMetric, ProfitMarginData, RegionalMarketAnalysis, ABTestingResult, SeasonalityTrend, StoreComparison, MarketingLoyaltyData, MarketingPersonalizedOffersData, MarketingSocialMediaData, OmnichannelClickCollectData, OmnichannelEcommerceData, OmnichannelUnifiedJourneyData, OmnichannelMobileAppData, OmnichannelInventorySyncData, OmnichannelSocialCommerceData, FinancialCashflowData, FinancialPaymentMethodsData, FinancialReturnsData, ConversionMetricsData, AbbruchAnalyseData, AlgorithmusPerformanceData, LiveTrainingStatusData, PushPerformanceData, CustomerDemographicsData, RelationshipInsightData, CustomerSegmentsData } from './types';

export const products: Product[] = [
  { id: "1", name: "Vollmilch", price: 1.29, category: "Milchprodukte", image: "🥛", tapCount: 0, nfcEnabled: true },
  { id: "2", name: "Bio-Eier (6 Stk.)", price: 2.99, category: "Eier & Molkerei", image: "🥚", tapCount: 0, nfcEnabled: true },
  { id: "3", name: "Butter", price: 1.89, category: "Milchprodukte", image: "🧈", tapCount: 0, nfcEnabled: true },
  { id: "4", name: "Gouda Käse", price: 2.49, category: "Käse", image: "🧀", tapCount: 0, nfcEnabled: true },
  { id: "5", name: "Frischkäse", price: 1.19, category: "Milchprodukte", image: "🥣", tapCount: 0, nfcEnabled: true },
  { id: "6", name: "Joghurt Natur", price: 0.89, category: "Milchprodukte", image: "🍦", tapCount: 0, nfcEnabled: true },
  { id: "7", name: "Äpfel (1kg)", price: 2.29, category: "Obst", image: "🍎", tapCount: 0, nfcEnabled: true },
  { id: "8", name: "Bananen (1kg)", price: 1.79, category: "Obst", image: "🍌", tapCount: 0, nfcEnabled: true },
  { id: "9", name: "Orangen (1kg)", price: 2.09, category: "Obst", image: "🍊", tapCount: 0, nfcEnabled: true },
  { id: "10", name: "Tomaten (500g)", price: 1.99, category: "Gemüse", image: "🍅", tapCount: 0, nfcEnabled: true },
  { id: "11", name: "Gurke", price: 0.79, category: "Gemüse", image: "🥒", tapCount: 0, nfcEnabled: true },
  { id: "12", name: "Salatkopf", price: 1.09, category: "Gemüse", image: "🥬", tapCount: 0, nfcEnabled: true },
  { id: "13", name: "Spaghetti (500g)", price: 1.39, category: "Nudeln", image: "🍝", tapCount: 0, nfcEnabled: true },
  { id: "14", name: "Reis (1kg)", price: 2.19, category: "Grundnahrungsmittel", image: "🍚", tapCount: 0, nfcEnabled: true },
  { id: "15", name: "Toastbrot", price: 1.29, category: "Backwaren", image: "🍞", tapCount: 0, nfcEnabled: true },
  { id: "16", name: "Kaffee (500g)", price: 4.99, category: "Getränke", image: "☕", tapCount: 0, nfcEnabled: true },
  { id: "17", name: "Wasser (1.5L)", price: 0.59, category: "Getränke", image: "💧", tapCount: 0, nfcEnabled: true },
  { id: "18", name: "Cola (1L)", price: 1.19, category: "Getränke", image: "🥤", tapCount: 0, nfcEnabled: true },
  { id: "19", name: "Schokolade", price: 1.00, category: "Süßwaren", image: "🍫", tapCount: 0, nfcEnabled: true },
  { id: "20", name: "Chips", price: 1.49, category: "Snacks", image: "🥔", tapCount: 0, nfcEnabled: true },
  { id: "21", name: "Hackfleisch (500g)", price: 3.99, category: "Fleisch", image: "🥩", tapCount: 0, nfcEnabled: true },
  { id: "22", name: "Cornflakes", price: 2.79, category: "Frühstück", image: "🥣", tapCount: 0, nfcEnabled: true },
  { id: "23", name: "Müsli", price: 3.29, category: "Frühstück", image: "🌾", tapCount: 0, nfcEnabled: true },
  { id: "24", name: "Honig", price: 3.99, category: "Frühstück", image: "🍯", tapCount: 0, nfcEnabled: true },
  { id: "25", name: "Olivenöl", price: 5.49, category: "Öle", image: "🫒", tapCount: 0, nfcEnabled: true },
  { id: "26", name: "Parmesan", price: 3.79, category: "Käse", image: "🧀", tapCount: 0, nfcEnabled: true },
  { id: "27", name: "Basilikum (Topf)", price: 1.99, category: "Kräuter", image: "🌿", tapCount: 0, nfcEnabled: true },
  { id: "28", name: "Rotwein", price: 7.99, category: "Getränke", image: "🍷", tapCount: 0, nfcEnabled: true },
  { id: "29", name: "Bier (6er Träger)", price: 5.99, category: "Getränke", image: "🍺", tapCount: 0, nfcEnabled: true },
  { id: "30", name: "Kekse", price: 1.59, category: "Süßwaren", image: "🍪", tapCount: 0, nfcEnabled: true },
];
export const allProductsData = products;

export const shoppingScenarios: ShoppingStep[][] = [
  // Scenario 1: Quick breakfast shop
  [
    { aisle: "Eingang", action: "Betritt den Laden", duration: 2 },
    { aisle: "Obst & Gemüse", action: "Nimmt Bananen", productId: "8", duration: 3 },
    { aisle: "Milchprodukte", action: "Holt Milch", productId: "1", duration: 3 },
    { aisle: "Frühstück", action: "Sucht Müsli", productId: "23", duration: 4 },
    { aisle: "Kasse", action: "Geht zur Kasse", duration: 3 },
  ],
  // Scenario 2: Italian dinner ingredients
  [
    { aisle: "Eingang", action: "Betritt den Laden", duration: 2 },
    { aisle: "Nudeln & Reis", action: "Nimmt Spaghetti", productId: "13", duration: 3 },
    { aisle: "Fleisch & Wurst", action: "Holt Hackfleisch", productId: "21", duration: 4 },
    { aisle: "Obst & Gemüse", action: "Nimmt Tomaten", productId: "10", duration: 3 },
    { aisle: "Käse", action: "Wählt Parmesan", productId: "26", duration: 3 },
    { aisle: "Kasse", action: "Geht zur Kasse", duration: 4 },
  ],
  // Scenario 3: Healthy weekly shopping
  [
    { aisle: "Eingang", action: "Betritt den Laden", duration: 2 },
    { aisle: "Obst & Gemüse", action: "Nimmt Äpfel, Salat", productId: "7", duration: 5 },
    { aisle: "Obst & Gemüse", action: "Sucht Gurke", productId: "11", duration: 3 },
    { aisle: "Milchprodukte", action: "Nimmt Joghurt, Bio-Eier", productId: "6", duration: 4 },
    { aisle: "Milchprodukte", action: "Holt Bio-Eier", productId: "2", duration: 3 },
    { aisle: "Backwaren", action: "Sucht Vollkorntoast", productId: "15", duration: 3 }, // Assuming Toastbrot is Vollkorn
    { aisle: "Getränke", action: "Nimmt Wasser", productId: "17", duration: 2 },
    { aisle: "Kasse", action: "Geht zur Kasse", duration: 4 },
  ],
   // Scenario 4: Party supplies
  [
    { aisle: "Eingang", action: "Betritt den Laden", duration: 1 },
    { aisle: "Snacks", action: "Nimmt Chips", productId: "20", duration: 3 },
    { aisle: "Getränke", action: "Holt Cola und Bier", productId: "18", duration: 4 },
    { aisle: "Getränke", action: "Holt Bier", productId: "29", duration: 3 },
    { aisle: "Süßwaren", action: "Sucht Schokolade", productId: "19", duration: 2 },
    { aisle: "Kasse", action: "Geht zur Kasse", duration: 3 },
  ],
  // Scenario 5: Basic restocking
  [
    { aisle: "Eingang", action: "Betritt den Laden", duration: 2 },
    { aisle: "Grundnahrungsmittel", action: "Nimmt Reis", productId: "14", duration: 3 },
    { aisle: "Öle & Gewürze", action: "Holt Olivenöl", productId: "25", duration: 4 },
    { aisle: "Getränke", action: "Sucht Kaffee", productId: "16", duration: 3 },
    { aisle: "Kasse", action: "Geht zur Kasse", duration: 3 },
  ]
];

export const initialCustomers: Customer[] = [
  { id: "anna", name: "Anna", avatar: "👩‍💻", color: "emerald", cart: [], currentAisle: "Eingang", currentAction: "Betritt den Laden", progress: 0, currentStep: 0, scenario: shoppingScenarios[0 % shoppingScenarios.length], isActive: false },
  { id: "max", name: "Max", avatar: "👨‍🍳", color: "blue", cart: [], currentAisle: "Eingang", currentAction: "Betritt den Laden", progress: 0, currentStep: 0, scenario: shoppingScenarios[1 % shoppingScenarios.length], isActive: false },
  { id: "sophie", name: "Sophie", avatar: "🧘‍♀️", color: "purple", cart: [], currentAisle: "Eingang", currentAction: "Betritt den Laden", progress: 0, currentStep: 0, scenario: shoppingScenarios[2 % shoppingScenarios.length], isActive: false },
  { id: "thomas", name: "Thomas", avatar: "👨‍🎨", color: "orange", cart: [], currentAisle: "Eingang", currentAction: "Betritt den Laden", progress: 0, currentStep: 0, scenario: shoppingScenarios[3 % shoppingScenarios.length], isActive: false },
  { id: "julia", name: "Julia", avatar: "👩‍🚀", color: "pink", cart: [], currentAisle: "Eingang", currentAction: "Betritt den Laden", progress: 0, currentStep: 0, scenario: shoppingScenarios[4 % shoppingScenarios.length], isActive: false },
  { id: "david", name: "David", avatar: "👨‍💼", color: "cyan", cart: [], currentAisle: "Eingang", currentAction: "Betritt den Laden", progress: 0, currentStep: 0, scenario: shoppingScenarios[0 % shoppingScenarios.length], isActive: false },
  { id: "maria", name: "Maria", avatar: "👩‍🔬", color: "green", cart: [], currentAisle: "Eingang", currentAction: "Betritt den Laden", progress: 0, currentStep: 0, scenario: shoppingScenarios[1 % shoppingScenarios.length], isActive: false },
  { id: "anon1", name: "Kunde A", avatar: "👤", cart: [], currentAisle: "Eingang", currentAction: "Betritt den Laden", progress: 0, currentStep: 0, scenario: shoppingScenarios[Math.floor(Math.random() * shoppingScenarios.length)], isActive: false, isAnonymous: true },
  { id: "anon2", name: "Kunde B", avatar: "👤", cart: [], currentAisle: "Eingang", currentAction: "Betritt den Laden", progress: 0, currentStep: 0, scenario: shoppingScenarios[Math.floor(Math.random() * shoppingScenarios.length)], isActive: false, isAnonymous: true },
  { id: "anon3", name: "Kunde C", avatar: "🛒", cart: [], currentAisle: "Eingang", currentAction: "Betritt den Laden", progress: 0, currentStep: 0, scenario: shoppingScenarios[Math.floor(Math.random() * shoppingScenarios.length)], isActive: false, isAnonymous: true },
  { id: "anon4", name: "Kunde D", avatar: "🛒", cart: [], currentAisle: "Eingang", currentAction: "Betritt den Laden", progress: 0, currentStep: 0, scenario: shoppingScenarios[Math.floor(Math.random() * shoppingScenarios.length)], isActive: false, isAnonymous: true },
];
export const rawInitialCustomers = initialCustomers;

export const storeAreas: StoreArea[] = [
  { id: "1", name: "Eingang", x: 2, y: 2, width: 15, height: 10, color: "bg-slate-700/30", icon: "🚪", nfcTaps: 0 },
  { id: "14", name: "Kasse", x: 20, y: 2, width: 20, height: 10, color: "bg-gray-600/40", icon: "💳", nfcTaps: 0 },
  { id: "2", name: "Obst & Gemüse", x: 2, y: 15, width: 30, height: 30, color: "bg-green-700/30", icon: "🍓", nfcTaps: 0 },
  { id: "3", name: "Backwaren", x: 2, y: 48, width: 30, height: 20, color: "bg-yellow-700/30", icon: "🥐", nfcTaps: 0 },
  { id: "4", name: "Milchprodukte", x: 35, y: 15, width: 30, height: 25, color: "bg-blue-700/30", icon: "🥛", nfcTaps: 0 },
  { id: "5", name: "Käse", x: 35, y: 43, width: 30, height: 20, color: "bg-amber-700/30", icon: "🧀", nfcTaps: 0 },
  { id: "6", name: "Fleisch & Wurst", x: 2, y: 71, width: 30, height: 25, color: "bg-red-700/30", icon: "🥩", nfcTaps: 0 },
  { id: "7", name: "Nudeln & Reis", x: 35, y: 66, width: 30, height: 15, color: "bg-orange-700/30", icon: "🍝", nfcTaps: 0 },
  { id: "8", name: "Grundnahrungsmittel", x: 35, y: 84, width: 30, height: 12, color: "bg-stone-700/30", icon: "🍚", nfcTaps: 0 },
  { id: "9", name: "Frühstück", x: 68, y: 2, width: 30, height: 20, color: "bg-pink-700/30", icon: "🥣", nfcTaps: 0 },
  { id: "10", name: "Getränke", x: 68, y: 25, width: 30, height: 30, color: "bg-cyan-700/30", icon: "🥤", nfcTaps: 0 },
  { id: "11", name: "Süßwaren", x: 68, y: 58, width: 14, height: 20, color: "bg-purple-700/30", icon: "🍫", nfcTaps: 0 },
  { id: "12", name: "Snacks", x: 84, y: 58, width: 14, height: 20, color: "bg-lime-700/30", icon: "🍿", nfcTaps: 0 },
  { id: "13", name: "Öle & Gewürze", x: 68, y: 81, width: 30, height: 15, color: "bg-teal-700/30", icon: "🌶️", nfcTaps: 0 },
];
export const initialStoreAreasFromConstants = storeAreas;

export const customerHistory: CustomerHistory = {
  anna: { totalPurchases: 47, avgBasketValue: 23.45, favoriteCategories: [{ name: 'Milchprodukte', percentage: 32, trend: 'up' }, { name: 'Frühstück', percentage: 28, trend: 'stable' }, { name: 'Obst', percentage: 24, trend: 'up' }, { name: 'Backwaren', percentage: 16, trend: 'down' }], recentPurchases: [{ date: '2024-12-18', items: ["Vollmilch", "Cornflakes", "Bananen", "Brot"], total: 8.76 }, { date: '2024-12-15', items: ["Joghurt", "Äpfel", "Butter", "Eier"], total: 9.27 }, { date: '2024-12-12', items: ["Vollmilch", "Müsli", "Orangen", "Honig"], total: 11.43 }, { date: '2024-12-09', items: ["Cornflakes", "Bananen", "Vollmilch"], total: 6.77 }], patterns: ["Kauft regelmäßig Frühstücksprodukte (Mo-Fr 7-9 Uhr)", "Bevorzugt Bio-Milchprodukte (+15% Preisbereitschaft)", "Kombiniert oft Obst mit Milchprodukten", "Wocheneinkauf meist Samstags"] },
  max: { totalPurchases: 32, avgBasketValue: 31.20, favoriteCategories: [{ name: 'Nudeln', percentage: 35, trend: 'up' }, { name: 'Fleisch', percentage: 28, trend: 'stable' }, { name: 'Gemüse', percentage: 22, trend: 'up' }, { name: 'Öle', percentage: 15, trend: 'stable' }], recentPurchases: [{ date: '2024-12-17', items: ["Spaghetti", "Hackfleisch", "Tomaten", "Parmesan"], total: 13.67 }, { date: '2024-12-14', items: ["Penne", "Olivenöl", "Zwiebeln", "Basilikum"], total: 9.85 }, { date: '2024-12-10', items: ["Lasagne-Platten", "Hackfleisch", "Mozzarella"], total: 15.23 }, { date: '2024-12-07', items: ["Spaghetti", "Tomatensoße", "Parmesan"], total: 8.91 }], patterns: ["Pasta-Liebhaber - 78% der Einkäufe enthalten Nudeln", "Kocht gerne italienisch (Olivenöl, Parmesan, Basilikum)", "Kauft oft Fleisch für Hauptgerichte", "Abends einkaufen (17-19 Uhr)"] },
  sophie: { totalPurchases: 56, avgBasketValue: 18.90, favoriteCategories: [{ name: 'Obst', percentage: 38, trend: 'up' }, { name: 'Gemüse', percentage: 32, trend: 'up' }, { name: 'Getränke', percentage: 20, trend: 'stable' }, { name: 'Milchprodukte', percentage: 10, trend: 'down' }], recentPurchases: [{ date: '2024-12-19', items: ["Äpfel", "Karotten", "Orangensaft", "Joghurt"], total: 8.47 }, { date: '2024-12-16', items: ["Bananen", "Spinat", "Mandelmilch", "Beeren"], total: 12.34 }, { date: '2024-12-13', items: ["Orangen", "Brokkoli", "Wasser", "Quinoa"], total: 15.67 }, { date: '2024-12-11', items: ["Äpfel", "Gurken", "Tee", "Nüsse"], total: 9.23 }], patterns: ["Gesundheitsbewusste Ernährung - 70% Obst & Gemüse", "Bevorzugt Bio-Produkte und Superfoods", "Regelmäßige kleine Einkäufe (2-3x/Woche)", "Meidet verarbeitete Lebensmittel"] },
  thomas: { totalPurchases: 28, avgBasketValue: 42.15, favoriteCategories: [{ name: 'Getränke', percentage: 30, trend: 'stable' }, { name: 'Käse', percentage: 25, trend: 'up' }, { name: 'Wurst', percentage: 23, trend: 'stable' }, { name: 'Backwaren', percentage: 22, trend: 'down' }], recentPurchases: [{ date: '2024-12-18', items: ["Rotwein", "Camembert", "Salami", "Baguette"], total: 28.45 }, { date: '2024-12-14', items: ["Bier", "Gouda", "Schinken", "Oliven"], total: 19.67 }, { date: '2024-12-10', items: ["Prosecco", "Brie", "Chorizo", "Crackers"], total: 35.89 }, { date: '2024-12-06', items: ["Weißwein", "Parmesan", "Prosciutto"], total: 31.23 }], patterns: ["Genießer-Typ - Premium-Produkte bevorzugt", "Häufige Käse-Wein-Kombinationen", "Wochenend-Einkäufer für Geselligkeit", "Hohe Ausgaben pro Besuch"] },
  julia: { totalPurchases: 73, avgBasketValue: 12.30, favoriteCategories: [{ name: 'Getränke', percentage: 35, trend: 'up' }, { name: 'Süßwaren', percentage: 28, trend: 'stable' }, { name: 'Milchprodukte', percentage: 22, trend: 'down' }, { name: 'Backwaren', percentage: 15, trend: 'stable' }], recentPurchases: [{ date: '2024-12-19', items: ["Kaffee", "Schokolade", "Milch"], total: 9.47 }, { date: '2024-12-18', items: ["Energy Drink", "Kekse", "Joghurt"], total: 7.23 }, { date: '2024-12-17', items: ["Kaffee", "Donut", "Cappuccino"], total: 8.90 }, { date: '2024-12-16', items: ["Cola", "Chips", "Eis"], total: 6.45 }], patterns: ["Schnell-Käuferin - Express-Checkout bevorzugt", "Koffein-affin - täglich Kaffee oder Energy Drinks", "Impulskäufe an der Kasse (+40% vs. Durchschnitt)", "Häufige kleine Einkäufe (fast täglich)"] },
  david: { totalPurchases: 65, avgBasketValue: 55.70, favoriteCategories: [{ name: 'Fleisch', percentage: 30, trend: 'stable' }, { name: 'Gemüse', percentage: 25, trend: 'up' }, { name: 'Milchprodukte', percentage: 20, trend: 'stable' }, { name: 'Grundnahrungsmittel', percentage: 15, trend: 'up' }], recentPurchases: [{ date: '2024-12-20', items: ["Hähnchenbrust", "Kartoffeln", "Brokkoli", "Milch (2L)"], total: 22.50 }, { date: '2024-12-13', items: ["Rinderhack", "Nudeln", "Tomatensoße", "Käseblock", "Saft (Großpackung)"], total: 28.90 }, { date: '2024-12-06', items: ["Putenstreifen", "Reis", "Paprika", "Joghurt (Großpackung)"], total: 25.30 }], patterns: ["Kauft oft für Familienmahlzeiten ein", "Achtet auf Großpackungen und Angebote", "Kombiniert oft Fleisch mit Gemüse und Kohlenhydraten", "Wocheneinkauf meist Freitagnachmittag"] },
  maria: { totalPurchases: 42, avgBasketValue: 38.50, favoriteCategories: [{ name: 'Bio-Produkte', percentage: 40, trend: 'up' }, { name: 'Superfoods', percentage: 30, trend: 'up' }, { name: 'Spezialitäten', percentage: 20, trend: 'stable' }, { name: 'Tee', percentage: 10, trend: 'stable' }], recentPurchases: [{ date: '2024-12-21', items: ["Bio-Tofu", "Quinoa", "Avocado", "Spinat"], total: 18.75 }, { date: '2024-12-18', items: ["Mandelmilch", "Chia-Samen", "Beerenmischung", "Dunkle Schokolade (85%)"], total: 21.30 }, { date: '2024-12-15', items: ["Bio-Haferflocken", "Goji-Beeren", "Grünkohl", "Matcha-Pulver"], total: 25.90 }], patterns: ["Kauft ausschließlich Bio- und vegane Produkte", "Interessiert an neuen Superfoods und gesunden Alternativen", "Bevorzugt kleine, spezialisierte Läden/Abteilungen", "Liest Produktinformationen und Inhaltsstoffe genau"] },
};

// Dummy data for Business Intelligence section
export const regionalPerformanceData: RegionData[] = [
  { region: "Nord", revenue: 1250000, locations: 15, trend: 5.2 },
  { region: "Süd", revenue: 980000, locations: 12, trend: -1.5 },
  { region: "Ost", revenue: 750000, locations: 10, trend: 8.1 },
  { region: "West", revenue: 1150000, locations: 14, trend: 3.4 },
];

export const topPerformerStoresData: StoreLocationData[] = [
  { name: "Berlin Mitte", region: "Ost", revenue: 150000, trend: 12.5 },
  { name: "Hamburg Zentrum", region: "Nord", revenue: 145000, trend: 9.8 },
  { name: "München Altstadt", region: "Süd", revenue: 130000, trend: 7.2 },
];

export const bottomPerformerStoresData: StoreLocationData[] = [
  { name: "Cottbus City", region: "Ost", revenue: 45000, trend: -5.1 },
  { name: "Kiel Hafen", region: "Nord", revenue: 52000, trend: -2.3 },
  { name: "Passau Donau", region: "Süd", revenue: 48000, trend: 0.5 },
];

export const salesByStoreAreaData: CategorySales[] = [
    { category: 'Obst & Gemüse', sales: 12500, color: 'hsl(var(--chart-1))' },
    { category: 'Milchprodukte', sales: 9800, color: 'hsl(var(--chart-2))'  },
    { category: 'Backwaren', sales: 7500, color: 'hsl(var(--chart-3))'  },
    { category: 'Getränke', sales: 11500, color: 'hsl(var(--chart-4))'  },
    { category: 'Fleisch & Wurst', sales: 8200, color: 'hsl(var(--chart-5))'  },
];

export const topSellingProductsData: Product[] = products.slice(0,5).map((p,i) => ({...p, tapCount: Math.floor(Math.random()*50)+10*i}));


export const revenueOverviewData = {
  today: 52340, todayTrend: 7.5,
  thisWeek: 285600, weekTrend: 3.2,
  monthlyTarget: 1200000, monthlyProgress: 78,
};

export const profitMarginByCategoryData: ProfitMarginData[] = [
  { category: "Frischetheke", margin: 22.5, color: "hsl(120, 60%, 60%)" },
  { category: "Trockensortiment", margin: 18.2, color: "hsl(45, 70%, 60%)" },
  { category: "Getränke", margin: 15.8, color: "hsl(200, 70%, 60%)" },
  { category: "Non-Food", margin: 28.1, color: "hsl(280, 60%, 70%)" },
];

export const regionalMarketAnalysisData: RegionalMarketAnalysis = {
  marketShare: 23.5, marketShareTrend: 1.2,
  competitionLevel: 'Hoch', competitors: 5,
  topTrend: "Bio-Convenience", topTrendGrowth: 15,
};

export const abTestingResultsData: ABTestingResult[] = [
  { name: "Neue Regalplatzierung (Kaffee)", area: "Getränke", metric: "Umsatz", impact: 8.2 },
  { name: "Rabattaktion (Käse)", area: "Käse", metric: "Absatz", impact: 15.3 },
  { name: "Bundle-Angebot (Pasta & Sauce)", area: "Nudeln", metric: "Warenkorbwert", impact: 5.1 },
];

export const seasonalityTrendsData: SeasonalityTrend = {
  currentSeason: "Winter", topCategory: "Heißgetränke", topCategoryTrend: 25,
  seasonalProducts: ["Glühwein", "Lebkuchen"], seasonalProductTrend: 40,
  nextSeasonForecast: 12, // Umsatzsteigerung
};

export const storeComparisonData: StoreComparison = {
  avgRevenuePerSqFt: 450, avgCustomersPerDay: 850, avgBasketValue: 35.60,
  conversionRate: 65, employeeSatisfactionRate: 88, inventoryTurnoverRate: 12.5,
};

export const marketingLoyaltyData: MarketingLoyaltyData = {
  activeMembers: 12580, pointsRedeemedThisWeek: 85600,
  tierDistribution: { bronze: 45, silver: 35, gold: 20 },
};

export const marketingPersonalizedOffersData: MarketingPersonalizedOffersData = {
  offersSentToday: 1250, openRate: 35.2, conversionRate: 8.9, topCategory: "Milchprodukte",
};

export const marketingSocialMediaData: MarketingSocialMediaData = {
  avgRating: 4.3, totalReviews: 2340, mentionsToday: 150,
  sentimentPositivePercent: 78, activeInfluencers: 5, influencerReachThisWeek: 250000,
};

export const omnichannelClickCollectData: OmnichannelClickCollectData = {
  ordersToday: 120, readyForPickup: 45, avgProcessingTimeMinutes: 25,
  onTimePickupRate: 92, satisfactionRate: 4.5,
};

export const omnichannelEcommerceData: OmnichannelEcommerceData = {
  onlineOrdersToday: 350, onlineRevenueToday: 12500, onlineRevenueTrend: 15.2,
  liveCustomersVisibleInStore: 25, crossChannelConversionRate: 5.8,
};

export const omnichannelUnifiedJourneyData: OmnichannelUnifiedJourneyData = {
  customersWithUnifiedProfile: 8500, personalizationActiveRate: 75, syncedCarts: 1200,
};

export const omnichannelMobileAppData: OmnichannelMobileAppData = {
  activeUsers: 5600, inStoreNavigationUsers: 1200,
  inAppPurchasesRevenue: 4500, inAppPurchasesPercentOfOnline: 36,
};

export const omnichannelInventorySyncData: OmnichannelInventorySyncData = {
  syncStatusPercent: 99.8, availabilityUpdatesToday: 15000, outOfStockAlertsToOnline: 25,
};

export const omnichannelSocialCommerceData: OmnichannelSocialCommerceData = {
  instagramSalesRevenue: 1200, instagramSalesCount: 45,
  tiktokSalesRevenue: 850, tiktokSalesGrowthPercent: 200,
  liveShoppingRevenue: 2500,
};

export const financialCashflowData: FinancialCashflowData = {
  revenueToday: 64840, revenueTrend: 7.5, expensesToday: 22500,
  expensesCategory: "Wareneinsatz & Personal", netCashflow: 42340, profitMargin: 18.5,
};

export const financialPaymentMethodsData: FinancialPaymentMethodsData = {
  creditCardPercent: 40, contactlessMobilePercent: 35, cashPercent: 15, debitCardPercent: 10,
};

export const financialReturnsData: FinancialReturnsData = {
  returnsThisWeekCount: 85, returnsPercentOfSales: 1.2, mostCommonReason: "Falsche Größe/Variante",
};

export const conversionMetricsData: ConversionMetricsData = {
  warenkorbZuKaufProzent: 94.2,
  warenkorbZuKaufAbsolut: "1250 / 1327",
  warenkorbZuKaufErfolgreich: 1250,
  empfehlungZuKaufProzent: 23.5,
  empfehlungZuKaufAbsolut: "78 / 332",
  empfehlungZuKaufAngenommen: 78,
  crossSellingRateProzent: 15.8,
  crossSellingAbsolut: "209 erfolgreiche Cross-Sells",
  crossSellingZusatzverkaeufe: 209,
  upSellingRateProzent: 8.1,
  upSellingAbsolut: "101 erfolgreiche Up-Sells",
  upSellingUpgrades: 101,
};

export const abbruchAnalyseData: AbbruchAnalyseData = {
  haeufigsterAbbruchpunktText: "Zahlungsprozess",
  haeufigsterAbbruchpunktProzent: 45,
  avgArtikelVorAbbruch: 3.2,
  wiederkehrRateProzent: 65,
};

export const algorithmusPerformanceData: AlgorithmusPerformanceData = {
  empfehlungsgenauigkeitProzent: 88.9,
  clickThroughRateProzent: 12.5,
  conversionRateProzent: 25.1,
};

export const liveTrainingStatusData: LiveTrainingStatusData = {
  modellUpdatesHeute: 15,
  neueAssoziationen: 253,
  erfolgsrateEmpfehlungenProzent: 78.2,
};

export const pushPerformanceData: PushPerformanceData = {
  pushNachrichtenHeute: 520,
  pushNachrichtenGrund: "Personalisierte Angebote",
  reaktionsRateProzent: 18.5,
  reaktionsRateAbsolut: "96 Reaktionen",
  conversionZuKaufProzent: 35.4, // % der Reagierenden, die kaufen
  conversionZuKaufAbsolut: "34 Käufe aus Push",
  zusatzumsatzGeneriert: 850.75,
  avgUmsatzProPushConversion: 25.02,
};

// Mock data for Customer Insights Tab
export const customerDemographicsData: CustomerDemographicsData = {
  ageDistribution: [
    { range: "18-24", percentage: 15, color: "hsl(var(--chart-1))" },
    { range: "25-34", percentage: 30, color: "hsl(var(--chart-2))" },
    { range: "35-44", percentage: 25, color: "hsl(var(--chart-3))" },
    { range: "45-54", percentage: 20, color: "hsl(var(--chart-4))" },
    { range: "55+", percentage: 10, color: "hsl(var(--chart-5))" },
  ],
  genderDistribution: {
    malePercent: 48,
    femalePercent: 50,
    otherPercent: 2,
  },
  avgCustomerLifetimeValue: 285.50,
  newVsReturningCustomers: { new: 25, returning: 75},
};

const nonAnonymousCustomerCount = initialCustomers.filter(c => !c.isAnonymous).length;
export const relationshipInsightData: RelationshipInsightData = {
  estimatedCouplesCount: Math.floor(nonAnonymousCustomerCount * 0.28),
  commonPairPurchases: [
    { item1: "Rotwein", item2: "Käse", frequency: "Hoch" },
    { item1: "Spaghetti", item2: "Tomaten", frequency: "Hoch" },
    { item1: "Chips", item2: "Cola", frequency: "Mittel" },
  ],
  estimatedFamilyCount: Math.floor(nonAnonymousCustomerCount * 0.15),
  typicalFamilyProducts: ["Großpackung Müsli", "Milch (1L)", "Äpfel (Netz)"],
};

export const customerSegmentsData: CustomerSegmentsData[] = [
    {
        name: "Preisbewusste Stammkunden",
        description: "Kaufen regelmäßig Basisprodukte und achten stark auf Angebote.",
        percentage: 35,
        keyCharacteristics: ["Hohe Kauffrequenz", "Niedriger bis mittlerer Warenkorbwert", "Reagieren auf Rabatte"],
        color: "hsl(var(--chart-1))"
    },
    {
        name: "Qualitätsorientierte Genießer",
        description: "Bevorzugen hochwertige Produkte, Bio und Delikatessen.",
        percentage: 25,
        keyCharacteristics: ["Hoher Warenkorbwert", "Interesse an Neuheiten", "Weniger preissensibel"],
        color: "hsl(var(--chart-2))"
    },
    {
        name: "Effiziente Wocheneinkäufer",
        description: "Planen ihre Einkäufe und kaufen oft für die ganze Woche ein.",
        percentage: 20,
        keyCharacteristics: ["Große Warenkörbe", "Kaufen oft am Wochenende", "Loyal zu bestimmten Marken"],
        color: "hsl(var(--chart-3))"
    },
    {
        name: "Junge Trendsetter",
        description: "Interessiert an neuen Produkten, Snacks und Getränken.",
        percentage: 15,
        keyCharacteristics: ["Kleine, häufige Einkäufe", "Hohe Affinität zu Social Media Trends", "Probieren gerne Neues aus"],
        color: "hsl(var(--chart-4))"
    },
     {
        name: "Gelegenheitskäufer",
        description: "Kaufen unregelmäßig und meist nur wenige spezifische Artikel.",
        percentage: 5,
        keyCharacteristics: ["Niedrige Kauffrequenz", "Sehr kleiner Warenkorbwert", "Schwer zu binden"],
        color: "hsl(var(--chart-5))"
    },
];
